import { to_number } from "svelte/internal"
import { getSetupCommands, picoGpioPins } from "../gpio.js"
import { LineBreakTransformer } from "../utils.js"

let sNotConnected = "Disconnected"
let sRequestedPort = "Port Requested"
let sError = "Error!"
let sConnected = "Connected"

let isInterfacing = false

let port
let textDecoder, readableStreamClosed, reader
let textEncoder, writableStreamClosed, writer

navigator.serial.getPorts().then(p => p.length > 0 ? port = p[0] : port = null)

export async function connectToSerial() {
  try {
    navigator.serial.getPorts().then(p => p.length > 0 ? port = p[0] : port = null)
    if (port == null) {
      port = await navigator.serial.requestPort()
    }

    await port.open({
      baudRate: to_number(localStorage.getItem("baudRate")),
      stopBits: to_number(localStorage.getItem("stopBits")),
      parity: localStorage.getItem("parity"),
      flowControl: localStorage.getItem("flowControl")
    })

    console.log(`port open! ${JSON.stringify(port.getInfo())}`)
    isInterfacing = true

    setupStreams()
      .finally(() => console.debug("Disconnected?"))
      .catch((e) => console.warn(e))
  } catch (e) {
    console.warn(e)
  }
}

async function setupStreams() {
  textDecoder = new TextDecoderStream()
  readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
  reader = textDecoder
    .readable
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader()

  while (isInterfacing) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }

    processMessage(value)
  }

  reader.releaseLock()
}

export async function setupDevice() {
  let commands = getSetupCommands()
  console.log(`setupCommands: ${commands}`)
  for (const m of getSetupCommands())
    await writeToPico(m)
}

export async function writeToPico(line) {
  if (port.writable == null) {
    console.warn("Trying to write, but not connected")
    return
  }
  writer = port.writable.getWriter()
  let bytes = new TextEncoder().encode(`${line}\r\n`)
  await writer.write(bytes)
  writer.releaseLock()

  // writer writes and releases instantly, forcing a sleep here :|
  // not doing so lead to issues where Pico didn't properly process inputs
  // practically, this shouldn't be an issue. How often would multiple commands need to be executed basically instantly?
  await new Promise(r => setTimeout(r, 5))

  console.log(`released writer lock, wrote ${bytes}`)
}

export async function disconnectSerial() {
  isInterfacing = false

  reader?.cancel()

  await readableStreamClosed?.catch(() => 1 + 1)
  await writableStreamClosed

  await port?.close()
    .then(() => console.debug("closed port!"))
    .catch((e) => console.warn(`trying to close port - ${e} \n ${reader} ${writer}`))
}

function processMessage(message) {
  function updatePortValue() {
    let rPortUpdated = new RegExp(/^(\d\d)\|(\d)$/g)
    let result = [...message.matchAll(rPortUpdated)]

    if (result && result[0] == null) return false

    let portNumber = to_number(result[0][1])
    let value = to_number(result[0][2])
    console.log(`message parsed, setting ${portNumber} to ${value}`)
    picoGpioPins[portNumber].updateValue(value)
    return true
  }

  updatePortValue() || console.log(`unrecognised message ${message}`)
}

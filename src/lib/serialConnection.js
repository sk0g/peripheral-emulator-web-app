import { to_number } from "svelte/internal"
import { getSetupCommands, picoGpioPins } from "../gpio.js"
import { LineBreakTransformer } from "../utils.js"
import { usbConnectionStatus } from "../stores.js"

let sNotConnected = "Disconnected"
let sRequestedPort = "Port Requested"
let sError = "Error!"
let sConnected = "Connected"

let isInterfacing = false

let port
let textDecoder, readableStreamClosed, reader
let textEncoder, writableStreamClosed, writer

navigator.serial.getPorts().then(p => p.length > 0 ? port = p[0] : port = null)

function updateConnectionStatus(toValue) {
  usbConnectionStatus.update(v => v = toValue)
  console.log(`set to ${toValue}`)
}

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
    updateConnectionStatus(true)
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
  writer = port.writable.getWriter()

  while (isInterfacing) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }

    processMessage(value)
  }

  writer?.releaseLock()
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
  // writer = port.writable.getWriter()
  let bytes = new TextEncoder().encode(`${line}\r`)
  await writer.write(bytes)
  // writer.releaseLock()

  // writer writes and releases instantly, forcing a sleep here :|
  // not doing so lead to issues where Pico didn't properly process inputs
  // practically, this shouldn't be an issue. How often would multiple commands need to be executed basically instantly?
  await new Promise(r => setTimeout(r, 1))

  console.info(`message written ${line} | ${bytes}`)

  if (line.includes("n(14)") || line.includes("f(14)")) console.trace()
}

export async function disconnectSerial() {
  isInterfacing = false

  reader?.cancel()

  await readableStreamClosed?.catch(() => 1 + 1)
  await writableStreamClosed

  writer?.releaseLock()

  await port?.close()
    .then(() => console.debug("closed port!"))
    .catch((e) => console.warn(`trying to close port - ${e} \n ${reader} ${writer}`))

  updateConnectionStatus(false)
}

function processMessage(message) {
  // sometimes a new line does not get added to update messages,
  // and is printed into the REPL prompt line itself
  message = message.replace(">>> ", "")
  console.info(message)

  function updatePortValue() {
    let rPortUpdated = new RegExp(/^(\d\d)\|(\d)$/g)
    let result = [...message.matchAll(rPortUpdated)]

    if (result && result[0] == null) return false

    let portNumber = to_number(result[0][1])
    let value = to_number(result[0][2])
    console.info(`message parsed, updating ${portNumber} to ${value}`)
    picoGpioPins[portNumber].setValue(value)
    return true
  }

  function updatePwmValue() {
    let rg = new RegExp(/^(\d\d)\^(\d\.\d\d\d)$/g)
    let result = [...message.matchAll(rg)]
    console.info(result)

    if (result && result[0] == null) return false

    let portNumber = to_number(result[0][1])
    let pulseDuration = to_number(result[0][2])
    console.info(`message parsed, updating ${portNumber} duration to ${pulseDuration}`)
    picoGpioPins[portNumber].setValue(pulseDuration)
    return true
  }

  updatePortValue() || updatePwmValue() || console.debug(`unrecognised message ${message}`)
}

import { to_number } from "svelte/internal"
import { picoGpioPins } from "../gpio.js"
import { LineBreakTransformer } from "../utils.js"

let sNotConnected = "Disconnected"
let sRequestedPort = "Port Requested"
let sError = "Error!"
let sConnected = "Connected"

let port, textDecoder, readableStreamClosed, reader

export async function connectToSerial() {
  try {
    let ports = await navigator.serial.getPorts()
    if (ports.length >= 1) {
      port = ports[0]
    }

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

    setupStreams().finally(() => console.log("Done watching input"))
    //
    // while (true) {
    //   let { value, done } = await reader.read()
    //
    //   if (done) {
    //     reader.releaseLock()
    //     break
    //   }
    //
    //   console.log(`Pico output: ${value}`)
    //   processMessage(value.trim())
    // }
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

  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      reader.releaseLock()
      break
    }

    processMessage(value)
  }

  const textEncoder = new TextEncoderStream()
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable)

  reader?.cancel()
  await readableStreamClosed.catch(() => { /* Ignore the error */
  })

  port.writer.close()
  await writableStreamClosed

  await port.close()
}


export async function disconnectSerial() {
  port?.readable.cancel().catch((e) => {
    console.debug(`trying to close reader - ${e}`)
  })
  port?.writable.close().catch((e) => {
    console.debug(`trying to close writer - ${e}`)
  })
  port?.close()
    .then(() => {
      console.log("closed port!")
    })
    .catch((e) => {
      console.debug(`trying to close port - ${e}`)
    })
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

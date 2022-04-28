import { to_number } from "svelte/internal"
import { picoGpioPins } from "../gpio.js"

let sNotConnected = "Disconnected"
let sRequestedPort = "Port Requested"
let sError = "Error!"
let sConnected = "Connected"

export async function connectToSerial() {
  try {
    let port = await navigator.serial.requestPort()
    await port.open({
      baudRate: to_number(localStorage.getItem("baudRate")),
      stopBits: to_number(localStorage.getItem("stopBits")),
      parity: localStorage.getItem("parity"),
      flowControl: localStorage.getItem("flowControl")
    })

    console.log("port open!")

    let textDecoder = new TextDecoderStream()
    let readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
    let reader = textDecoder.readable.getReader()

    while (true) {
      let { value, done } = await reader.read()

      if (done) {
        reader.releaseLock()
        break
      }

      console.log(`Pico output: ${value}`)
      processMessage(value.trim())
    }
  } catch (e) {
    console.log(e)
  }
}

function processMessage(message) {
  let rPortUpdated = new RegExp(/^(\d\d)\|(\d)$/g)

  let result = [...message.matchAll(rPortUpdated)]
  if (result && result[0] != null) {
    let portNumber = to_number(result[0][1])
    let value = to_number(result[0][2])

    console.log(`message parsed, setting ${portNumber} to ${value}`)
    picoGpioPins[portNumber].updateValue(value)
  } else {
    console.log(`unrecognised message ${message}`)
  }
}

import { pinStores } from "./gpioStores.js"
import { writeToPico } from "./lib/serialConnection.js"
import { number } from "tailwindcss/lib/util/dataTypes.js"


class Pin {
  constructor(gpioNumber, isInput, canInput = true, value = 0, usable = true) {
    if (!canInput && isInput) {
      this.logGeneral("init: being set to isInput")
      return
    }

    if (!usable && (isInput != null || value != null)) {
      this.logGeneral("init: is not usable")
      return
    }

    this.gpioNumber = gpioNumber
    this.isInput = isInput
    this.canInput = canInput
    this.usable = usable
    this.value = value
  }

  updateValue(newValue) {
    this.logGeneral(`new value: ${newValue}`)
    this.setValue(newValue)
    
    if (!this.isInput)
      writeToPico(this.getValueMessage())
  }

  setValue(newValue) {
    pinStores[this.gpioNumber].update(v => v = newValue)
    this.value = newValue
  }

  async pulseFor(duration) {
    writeToPico(`p(${this.gpioNumber},${Number(duration.toPrecision(3))})`)
  }

  // helpers and utilities
  getSetupMessage() {
    if (!this.usable) return

    return `p${this.isInput ? "i" : "o"}(${this.gpioNumber})`
  }

  getValueMessage() {
    const onOrOff = this.value > 0.5 ? "n" : "f"
    return `${onOrOff}(${this.gpioNumber})`
  }

  getPaddedPinNumber() {
    return String(this.gpioNumber).padStart(2, "0")
  }

  // logging and debug
  logGeneral(message) {
    console.log(`GPIO ${this.getPaddedPinNumber()} | ${message}`)
  }

  logWarning(message) {
    console.warn(`GPIO ${this.getPaddedPinNumber()} | ${message}`)
  }
}

export let picoGpioPins = [
  // 0 and 1 are used for UART communication, do not mess with them
  new Pin(0, null, null, null, false),
  new Pin(1, null, null, null, false),
  new Pin(2, true),
  new Pin(3, true),
  new Pin(4, true),
  new Pin(5, true),
  new Pin(6, true),
  new Pin(7, true),
  new Pin(8, true),
  new Pin(9, true),
  new Pin(10, true),
  new Pin(11, true),
  new Pin(12, true),
  new Pin(13, true),
  new Pin(14, false),
  new Pin(15, false),
  new Pin(16, false),
  new Pin(17, false),
  new Pin(18, false),
  new Pin(19, false),
  new Pin(20, false),
  new Pin(21, false),
  new Pin(22, false),
  // 23, 24, 25 do not have associated pins at all
  new Pin(23, null, null, null, false),
  new Pin(24, null, null, null, false),
  // 25 is a special case, it's (virtual) output only and goes to the LED
  new Pin(25, false, false),
  new Pin(26, false),
  new Pin(27, false),
  new Pin(28, false)
]

export function getSetupCommands() {
  let result = []

  for (let p of picoGpioPins.filter(p => p.usable)) {
    let message = p.getSetupMessage()
    if (message) result.push(message)
  }

  return result
}
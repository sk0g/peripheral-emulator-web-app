import { pinStores } from "./gpioStores.js"


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

    this.locked = false
  }

  setValue(newValue) {
    if (!this.isInput) {
      this.logWarning("setup: should not be set by app")
      return
    }

    this.updateValue(newValue)
  }

  updateValue(newValue) {
    // while (this.locked) {
    //   1 + 4 << 2
    // }
    //
    // this.locked = true

    console.log(pinStores[this.gpioNumber], newValue)
    pinStores[this.gpioNumber].update(v => v = newValue)
    this.value = newValue

    // this.locked = false
  }

  // helpers and utilities
  getSetupMessage() {
    if (!this.usable) return

    return `S${this.isInput ? "I" : "O"}${this.getPaddedPinNumber()}`
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
  new Pin(14, true),
  new Pin(15, false),
  new Pin(16, false),
  new Pin(17, false),
  new Pin(18, false),
  new Pin(19, false),
  new Pin(20, false),
  new Pin(21, false),
  new Pin(22, false),
  new Pin(23, false),
  new Pin(24, false),
  // 25 is a special case, it's (virtual) output only and goes to the LED
  new Pin(25, false, false),
  new Pin(26, false),
  new Pin(27, false),
  new Pin(28, false)
]

export function sendSetupCommands() {
  for (let p of picoGpioPins) {
    if (!p.usable) {
      p.logGeneral(`pin setup: unusable pin ${p.gpioNumber}`)
      continue
    }

    p.logGeneral(`pin setup: command ${p.getSetupMessage()}`)
  }
}

// TODO: implement
//  will need a `canInput` check
//  should re-work any attached streams, watchers
function setPinIsInput(gpioNumber) {
  const p = pins[gpioNumber]
  if (!p.usable || !p.canInput) {
    p.logWarning(`pin setup: trying to set up ${gpioNumber} as input, config is ${p}`)
  }
}

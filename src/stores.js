import { writable } from "svelte/store"

function createWritable(localStorageKey, defaultValue) {
  let stored = localStorage.getItem(localStorageKey)
  let result = writable(stored || defaultValue)
  result.subscribe((v) => localStorage.setItem(localStorageKey, `${v}`))

  return result
}

// local-storage backed stores
export const selectedComponent = createWritable("selectedComponent", "SevenSegmentDisplay")

export const ultrasonicDistance = createWritable("ultrasonicDistance", "10")

export const isDebug = createWritable("isDebug", "true")
export const serialConfBaudRate = createWritable("baudRate", "115200")
export const serialConfStopBits = createWritable("stopBits", "1")
export const serialConfParity = createWritable("parity", "none")
export const serialConfFlowControl = createWritable("flowControl", "none")

export const statusSerialConnection = createWritable("statusSerialConnection", "waiting")

export const ultrasonicInputPin = createWritable("ultrasonicInputPin", "2")
export const ultrasonicOutputPin = createWritable("ultrasonicOutputPin", "25")

// ephemeral stores
export const usbConnectionStatus = writable(false)
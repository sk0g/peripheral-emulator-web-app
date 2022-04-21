import { writable } from "svelte/store";

function createWritable(localStorageKey, defaultValue) {
  let stored = localStorage.getItem(localStorageKey);
  let result = writable(stored || defaultValue);
  result.subscribe(v => localStorage.setItem(localStorageKey, `${v}`));

  return result;
}

export const isDebug = createWritable(
  "isDebug", "true");

export const baudRate = createWritable(
  "baudRate", "115200");

export const selectedComponent = createWritable(
  "selectedComponent", "SevenSegmentDisplay"
);

export const ultrasonicDistance = createWritable(
  'ultrasonicDistance', '10'
)
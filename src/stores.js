import { derived, writable } from "svelte/store"

export const GPIO_1 = writable(0)
export const GPIO_2 = writable(0)
export const GPIO_3 = writable(0)
export const GPIO_4 = writable(0)
export const GPIO_5 = writable(0)
export const GPIO_6 = writable(0)
export const GPIO_7 = writable(0)
export const GPIO_8 = writable(0)
export const GPIO_9 = writable(0)
export const GPIO_10 = writable(0)
export const GPIO_11 = writable(0)
export const GPIO_12 = writable(0)
export const GPIO_13 = writable(0)
export const GPIO_14 = writable(0)
export const GPIO_15 = writable(0)
export const GPIO_16 = writable(0)
export const GPIO_17 = writable(0)
export const GPIO_18 = writable(0)
export const GPIO_19 = writable(0)
export const GPIO_20 = writable(0)
export const GPIO_21 = writable(0)
export const GPIO_22 = writable(0)
export const GPIO_23 = writable(0)
export const GPIO_24 = writable(0)
export const GPIO_25 = writable(0)
export const GPIO_26 = writable(0)

export const GPIO = derived(
    [GPIO_1,
        GPIO_2,
        GPIO_3,
        GPIO_4,
        GPIO_5,
        GPIO_6,
        GPIO_7,
        GPIO_8,
        GPIO_9,
        GPIO_10,
        GPIO_11,
        GPIO_12,
        GPIO_13,
        GPIO_14,
        GPIO_15,
        GPIO_16,
        GPIO_17,
        GPIO_18,
        GPIO_19,
        GPIO_20,
        GPIO_21,
        GPIO_22,
        GPIO_23,
        GPIO_24,
        GPIO_25,
        GPIO_26,
    ],
    ([
        $GPIO_1,
        $GPIO_2,
        $GPIO_3,
        $GPIO_4,
        $GPIO_5,
        $GPIO_6,
        $GPIO_7,
        $GPIO_8,
        $GPIO_9,
        $GPIO_10,
        $GPIO_11,
        $GPIO_12,
        $GPIO_13,
        $GPIO_14,
        $GPIO_15,
        $GPIO_16,
        $GPIO_17,
        $GPIO_18,
        $GPIO_19,
        $GPIO_20,
        $GPIO_21,
        $GPIO_22,
        $GPIO_23,
        $GPIO_24,
        $GPIO_25,
        $GPIO_26]) =>
        [$GPIO_1,
            $GPIO_2,
            $GPIO_3,
            $GPIO_4,
            $GPIO_5,
            $GPIO_6,
            $GPIO_7,
            $GPIO_8,
            $GPIO_9,
            $GPIO_10,
            $GPIO_11,
            $GPIO_12,
            $GPIO_13,
            $GPIO_14,
            $GPIO_15,
            $GPIO_16,
            $GPIO_17,
            $GPIO_18,
            $GPIO_19,
            $GPIO_20,
            $GPIO_21,
            $GPIO_22,
            $GPIO_23,
            $GPIO_24,
            $GPIO_25,
            $GPIO_26]
)
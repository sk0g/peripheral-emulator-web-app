The web app compliment to https://github.com/sk0g/peripheral-emulator-bridge, allowing configuration of Serial connection, and emulation of a hanful of peripherals. See screenshots below.

Uses Web Serial APIs, so broken on Firefox when I was working on this.

Written using Svelte, JavaScript, and lots of spaghetti. Definitely not much of a frontend developer, but Svelte was amazing for productivity!

---
Ultrasonic sensor, where GPIO 6 is the expected trigger input pin, and GPIO 21 is the output pulse pin.

![image](https://user-images.githubusercontent.com/19531391/215300627-c91d50c6-6818-41f9-8d27-a77efac95059.png)

The figure 5 formed on the emulated seven-segment display, by the input pins on the left -- with their states visible on the fly!

![image](https://user-images.githubusercontent.com/19531391/215300604-c1c23d48-413b-4b5d-b01a-80cd94962674.png)


![image](https://user-images.githubusercontent.com/19531391/215300574-a2c4941b-e7e3-4460-afea-6905844a195b.png)

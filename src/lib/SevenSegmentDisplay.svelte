<script>
  // @ts-expect-error
  import {GPIO} from "@/stores";

  let pinsEnabled = {
    a: false,
    b: false,
    c: false,
    d: false,
    f: false,
    g: false,
  };

  GPIO.subscribe((vals) => {
    pinsEnabled.a = vals[0] == 1;
    pinsEnabled.b = vals[1] == 1;
    pinsEnabled.c = vals[2] == 1;
    pinsEnabled.d = vals[3] == 1;
    pinsEnabled.e = vals[4] == 1;
    pinsEnabled.f = vals[5] == 1;
    pinsEnabled.g = vals[6] == 1;
  });
</script>

<div class="grid gap-1">
  <div
      style:background-color={pinsEnabled.a ? "cyan" : "gray"}
      class="segment sA"
  />
  <div
      style:background-color={pinsEnabled.b ? "cyan" : "gray"}
      class="segment sB"
  />
  <div
      style:background-color={pinsEnabled.c ? "cyan" : "gray"}
      class="segment sC"
  />
  <div
      style:background-color={pinsEnabled.d ? "cyan" : "gray"}
      class="segment sD"
  />
  <div
      style:background-color={pinsEnabled.e ? "cyan" : "gray"}
      class="segment sE"
  />
  <div
      style:background-color={pinsEnabled.f ? "cyan" : "gray"}
      class="segment sF"
  />
  <div
      style:background-color={pinsEnabled.g ? "cyan" : "gray"}
      class="segment sG"
  />
</div>

<style>
  .grid {
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(40, 1fr);

    height: 28rem;
    width: 14rem;

    margin: auto;
  }

  .segment {
    border-radius: 9999px;
    min-width: 5px;
    min-height: 5px;
  }

  .sA {
    grid-row: 1 / 1;
    grid-column: 2/ 20;
  }

  .sB {
    grid-column: 20/ 20;
    grid-row: 2 /20;
  }

  .sC {
    grid-row: 21/ 40;
    grid-column: 20/ 20;
  }

  .sD {
    grid-row: 40/ 40;
    grid-column: 2 /20;
  }

  .sE {
    grid-row: 21/ 40;
    grid-column: 1 /1;
  }

  .sF {
    grid-row: 2 /20;
    grid-column: 1 /1;
  }

  .sG {
    grid-row: 20/ 20;
    grid-column: 2 /20;
  }
</style>

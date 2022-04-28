<script>
  import { GPIO } from "../gpioStores.js"
</script>

<div class="grid gap-1">
  <div
    class="segment sA"
    style:background-color={$GPIO[2] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sB"
    style:background-color={$GPIO[3] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sC"
    style:background-color={$GPIO[4] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sD"
    style:background-color={$GPIO[5] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sE"
    style:background-color={$GPIO[6] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sF"
    style:background-color={$GPIO[7] >= 0.9 ? "cyan" : "gray"}></div>
  <div
    class="segment sG"
    style:background-color={$GPIO[8] >= 0.9 ? "cyan" : "gray"}></div>
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

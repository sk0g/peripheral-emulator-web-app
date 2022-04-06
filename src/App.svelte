<script>
  import Header from "./lib/Header.svelte";
</script>

<main>
  <div class="container mx-auto">
    <Header></Header>
    <div class="flex flex-row py-4">
      <div class="grid-cols-1 basis-1/4 px-2">
        <div class="gpio">GPIO #1</div>
        <div class="gpio">GPIO #2</div>
        <div class="gpio">GPIO #3</div>
        <div class="gpio">GPIO #4</div>
        <div class="gpio">GPIO #5</div>
        <div class="gpio">GPIO #6</div>
        <div class="gpio">GPIO #7</div>
        <div class="gpio">GPIO #8</div>
        <div class="gpio">GPIO #9</div>
        <div class="gpio">GPIO #10</div>
        <div class="gpio">GPIO #11</div>
        <div class="gpio">GPIO #12</div>
        <div class="gpio">GPIO #13</div>
        <div class="gpio">GPIO #14</div>
        <div class="gpio">GPIO #15</div>
        <div class="gpio">GPIO #16</div>
        <div class="gpio">GPIO #17</div>
        <div class="gpio">GPIO #18</div>
        <div class="gpio">GPIO #19</div>
        <div class="gpio">GPIO #20</div>
        <div class="gpio">GPIO #21</div>
        <div class="gpio">GPIO #22</div>
        <div class="gpio">GPIO #23</div>
        <div class="gpio">GPIO #24</div>
        <div class="gpio">GPIO #25</div>
        <div class="gpio">GPIO #26</div>
      </div>
      <div class="basis-3/4">asd</div>
    </div>
  </div>
</main>

<style>
  .gpio {
    border-style: double;
    border-radius: 9999px;
    border-width: 5px;
    text-align: center;
    background-color: hsl(250, 50%, 80%);
  }
</style>

<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button class="bg-red-200 py-3 px-6 rounded" on:click={increment}>
  Clicks: {count}
</button>

<style>
  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>

<script lang="ts">
  import { wallet } from '$lib/contracts'
  export let disconnect: () => void
</script>

<input type="checkbox" id="wallet-modal" class="modal-toggle" />
<label for="wallet-modal" class="modal cursor-pointer">
  <label class="modal-box rounded-2xl" for="">
    <h2 class="font-bold text-xl pb-2">Your wallet</h2>
    {#if $wallet}
      <h3 class="font-bold mt-2">Address</h3>
      <div class="overflow-x-scroll">
        <div>{$wallet.address}</div>
      </div>
      <h3 class="font-bold mt-2">Private key</h3>
      <div class="overflow-x-scroll">
        <div>{$wallet.privateKey}</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label
        for="wallet-modal"
        class="btn btn-primary mt-4 normal-case w-32"
        on:click={disconnect}
      >
        Logout
      </label>
    {/if}
  </label>
</label>

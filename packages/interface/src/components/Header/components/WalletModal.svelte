<script lang="ts">
  import { Copiable } from '$components'
  import { wallet } from '$lib/contracts'
  export let disconnect: () => void
</script>

<input type="checkbox" id="wallet-modal" class="modal-toggle" />
<label for="wallet-modal" class="modal cursor-pointer">
  <label class="modal-box card" for="">
    <h2 class="font-bold text-2xl">Your wallet</h2>

    {#if $wallet}
      <h3 class="mt-6 font-semibold">Address:</h3>
      <Copiable text={$wallet.address} />
      <h3 class="mt-4 font-semibold">Private key:</h3>
      <Copiable text={$wallet.privateKey} />

      <div class="flex justify-end">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label
          for="wallet-modal"
          class="btn btn-primary mt-4 normal-case w-32"
          on:click={disconnect}
        >
          Logout
        </label>
      </div>
    {/if}
  </label>
</label>

<script lang="ts">
  export let importModal
  export let privateKey = ''
  export let importWallet: () => void
  export let importErrorMessage = ''
</script>

<input
  bind:this={importModal}
  type="checkbox"
  id="import-modal"
  class="modal-toggle"
/>
<label for="import-modal" class="modal cursor-pointer">
  <label class="modal-box card max-w-md" for="">
    <div class="form-control w-full max-w-xs mt-2">
      <label for="private-key" class="label">
        <span class="">Private key:</span>
      </label>
      <input
        id="private-key"
        placeholder="Input your private key"
        bind:value={privateKey}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="flex justify-end">
      <button class="btn btn-primary mt-4 normal-case" on:click={importWallet}>
        Import wallet
      </button>
    </div>
    <p class="text-error mt-2">{importErrorMessage}</p>
  </label>
</label>

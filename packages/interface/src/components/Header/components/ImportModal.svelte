<script lang="ts">
  import { provider, wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'
  import { ethers } from 'ethers'

  export let privateKey = ''
  export let importErrorMessage = ''
  let importModal: HTMLInputElement

  function importWallet() {
    importErrorMessage = ''
    try {
      const _wallet = new ethers.Wallet(privateKey, provider)
      wallet.set(_wallet)
      localStorage.privateKey = _wallet.privateKey
      importModal.checked = false
    } catch (e) {
      importErrorMessage = 'Invalid private key'
    }
  }
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
        <span class="">{$t('Private key')}:</span>
      </label>
      <input
        id="private-key"
        placeholder={$t('Input your private key')}
        bind:value={privateKey}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    {#if importErrorMessage}
      <p class="text-error mt-2">{importErrorMessage}</p>
    {/if}
    <div class="flex justify-end">
      <button class="btn btn-primary mt-4 normal-case" on:click={importWallet}>
        {$t('Import wallet')}
      </button>
    </div>
  </label>
</label>

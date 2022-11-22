<script lang="ts">
  import { Hash } from '$components'
  import { wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'

  let mask = true

  function disconnect() {
    wallet.set(undefined)
    localStorage.removeItem('privateKey')
  }
</script>

<input type="checkbox" id="wallet-modal" class="modal-toggle" />
<label for="wallet-modal" class="modal cursor-pointer">
  <label class="modal-box card" for="">
    <h2 class="font-bold text-2xl">{$t('Your wallet')}</h2>

    {#if $wallet}
      <h3 class="mt-6 font-semibold">{$t('Address')}:</h3>
      <Hash text={$wallet.address} />
      <h3 class="mt-4 font-semibold">{$t('Private key')}:</h3>
      <Hash text={$wallet.privateKey} {mask} link={false} />
      <button class="badge badge-ghost" on:click={() => (mask = !mask)}>
        {mask ? $t('Show') : $t('Hide')}
      </button>

      <div class="flex justify-end">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label
          for="wallet-modal"
          class="btn btn-primary mt-4 normal-case w-32"
          on:click={disconnect}
        >
          {$t('Logout')}
        </label>
      </div>
    {/if}
  </label>
</label>

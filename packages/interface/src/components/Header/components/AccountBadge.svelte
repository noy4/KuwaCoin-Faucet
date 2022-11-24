<script lang="ts">
  import { Jazzicon } from '$components'
  import { kuwaCoin, wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'
  import { useBalance } from '$lib/store'
  import { shortenAddress } from '$lib/utils'
  import { formatEther } from '@ethersproject/units'
  import { onMount } from 'svelte'

  export let createWallet: () => void

  $: ({ data: balance, fetch: fetchBalance } = useBalance({ immediate: false }))

  const onTransfer = (...args: any[]) => {
    console.log('Transfer:', {
      from: args[0].slice(2, 5),
      to: args[1].slice(2, 5),
      amount: formatEther(args[2]),
      txHash: args[3].transactionHash.slice(2, 5),
    })
    fetchBalance()
  }

  $: if ($wallet) fetchBalance()

  onMount(() => {
    $kuwaCoin.on('Transfer', onTransfer)
  })
</script>

{#if $wallet}
  <div class="bg-base-200 p-0.5 rounded-xl">
    <div class="mx-2">
      {#if $balance}
        {formatEther($balance)}
      {:else}
        -
      {/if}
      <span class="text-xs">KWC</span>
    </div>
    <label
      for="wallet-modal"
      class="btn btn-ghost btn-sm normal-case bg-base-100 rounded-xl gap-2"
    >
      <div>{shortenAddress($wallet.address)}</div>
      <Jazzicon address={$wallet?.address} />
    </label>
  </div>
{:else}
  <div class="dropdown dropdown-hover">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div
      tabindex="0"
      class="btn btn-outline btn-sm btn-primary normal-case gap-1"
    >
      <span class="i-tabler-wallet text-xl" />
      {$t('Create / Import Wallet')}
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box min-w-52"
    >
      <li>
        <button on:click={createWallet}>
          {$t('Create new wallet')}
        </button>
      </li>
      <li>
        <label for="import-modal">
          {$t('Import wallet')}
        </label>
      </li>
    </ul>
  </div>
{/if}

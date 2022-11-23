<script lang="ts">
  import { Card, Hash, Jazzicon } from '$components'
  import {
    PUBLIC_KUWA_COIN_ADDRESS,
    PUBLIC_MASTER_KUWA_ADDRESS,
  } from '$env/static/public'
  import { kuwaCoin, masterKuwa, wallet } from '$lib/contracts'
  import { dayjs } from '$lib/dayjs'
  import type { TransferEvent } from '$lib/typechain-types/contracts/KuwaCoin'
  import { shortenAddress } from '$lib/utils'
  import { formatEther } from '@ethersproject/units'

  let isTransfersLoading = false
  let transfers: TransferEvent[] = []

  async function getTransfers() {
    if (!$kuwaCoin) return
    isTransfersLoading = true
    try {
      transfers = await $kuwaCoin.queryFilter($kuwaCoin.filters.Transfer())
    } finally {
      isTransfersLoading = false
    }
  }

  $: if ($kuwaCoin) {
    getTransfers()
  }
</script>

<section class="flex flex-col items-center px-4">
  <h1 class="mt-8 text-4xl font-bold">Kuwa Coin</h1>

  <Card class="p-8 mt-4">
    <table>
      <tr>
        <td>Chain</td>
        <td class="text-right">Sepolia</td>
      </tr>
      <tr>
        <td>Address</td>
        <td class="text-right">
          <Hash
            text={PUBLIC_KUWA_COIN_ADDRESS}
            label={shortenAddress(PUBLIC_KUWA_COIN_ADDRESS)}
          />
        </td>
      </tr>
      <tr>
        <td>Total Supply</td>
        <td class="text-right">
          {#await $kuwaCoin?.totalSupply()}
            loading...
          {:then value}
            {value ? (+formatEther(value)).toLocaleString() : '-'}
          {/await}
        </td>
      </tr>
      <tr><td class="text-lg font-semibold pt-4">Master Kuwa</td></tr>
      <tr>
        <td>Address</td>
        <td class="text-right">
          <Hash
            text={PUBLIC_MASTER_KUWA_ADDRESS}
            label={shortenAddress(PUBLIC_MASTER_KUWA_ADDRESS)}
          />
        </td>
      </tr>
      <tr>
        <td>KWC Balance</td>
        <td class="text-right">
          {#await $kuwaCoin?.balanceOf(PUBLIC_MASTER_KUWA_ADDRESS)}
            loading...
          {:then value}
            {value ? (+formatEther(value)).toLocaleString() : '-'}
          {/await}
        </td>
      </tr>
      <tr>
        <td>Given Count</td>
        <td class="text-right">
          {#await masterKuwa.givenCount()}
            loading...
          {:then value}
            {value || '-'}
          {/await}
        </td>
      </tr>
    </table>
  </Card>

  <h2 class="text-3xl font-bold mt-12">Transfers</h2>

  <div class="overflow-x-auto max-w-xl w-full mx-auto not-prose mt-4 z-0">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th>Age</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {#if isTransfersLoading && transfers.length === 0}
          <tr>loading...</tr>
        {:else}
          {#each [...transfers].reverse() as item}
            <tr>
              <td>
                {#await item.getBlock()}
                  loading...
                {:then block}
                  {dayjs(block.timestamp * 1000).fromNow(true)}
                {/await}
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <Jazzicon address={item.args.from} />
                  <Hash
                    text={item.args.from}
                    label={shortenAddress(item.args.from)}
                    copiable={false}
                  />
                  {#if item.args.from === $wallet?.address}
                    <div class="badge badge-sm badge-outline">You</div>
                  {:else if item.args.from === PUBLIC_MASTER_KUWA_ADDRESS}
                    <div class="badge badge-sm badge-ghost">Master</div>
                  {/if}
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <Jazzicon address={item.args.to} />
                  <Hash
                    text={item.args.to}
                    label={shortenAddress(item.args.to)}
                    copiable={false}
                  />
                  {#if item.args.to === $wallet?.address}
                    <div class="badge badge-sm badge-outline">You</div>
                  {:else if item.args.to === PUBLIC_MASTER_KUWA_ADDRESS}
                    <div class="badge badge-sm badge-ghost">Master</div>
                  {/if}
                </div>
              </td>
              <td>{formatEther(item.args.value)}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="h-16" />
</section>

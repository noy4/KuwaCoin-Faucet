<script lang="ts">
  import { kuwaCoin } from '$lib/contracts'
  import { dayjs } from '$lib/dayjs'
  import type { TransferEvent } from '$lib/typechain-types/contracts/KuwaCoin'

  import { formatEther } from '@ethersproject/units'
  import { onMount } from 'svelte'
  import { AddressCell } from './components'

  let isTransfersLoading = false
  let transfers: TransferEvent[] = []

  async function getTransfers() {
    isTransfersLoading = true
    try {
      transfers = await $kuwaCoin.queryFilter($kuwaCoin.filters.Transfer())
    } finally {
      isTransfersLoading = false
    }
  }

  onMount(() => {
    getTransfers()
  })
</script>

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
            <AddressCell address={item.args.from} />
            <AddressCell address={item.args.to} />
            <td>{formatEther(item.args.value)}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

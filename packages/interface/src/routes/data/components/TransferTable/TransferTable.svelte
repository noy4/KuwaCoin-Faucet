<script lang="ts">
  import { dayjs } from '$lib/dayjs'
  import { useTransfers } from '$lib/store'

  import { formatEther } from '@ethersproject/units'
  import { AddressCell } from './components'

  $: ({ isLoading: isTransfersLoading, data: transfers } = useTransfers())
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
      {#if isTransfersLoading && $transfers.length === 0}
        <tr>loading...</tr>
      {:else}
        {#each [...$transfers].reverse() as item}
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

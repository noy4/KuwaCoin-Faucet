<script lang="ts">
  import { useTotalSupply } from '$lib/store'
  import { formatEther } from '@ethersproject/units'

  $: ({ isLoading, data: totalSupply } = useTotalSupply())
</script>

<tr>
  <td>Total Supply</td>
  <td class="text-right">
    {#if $totalSupply}
      {(+formatEther($totalSupply)).toLocaleString()}
    {:else if isLoading}
      loading...
    {:else}
      -
    {/if}
  </td>
</tr>

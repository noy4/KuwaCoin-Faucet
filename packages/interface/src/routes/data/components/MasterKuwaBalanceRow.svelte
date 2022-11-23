<script lang="ts">
  import { useMasterKuwaBalance } from '$lib/store'
  import { formatEther } from '@ethersproject/units'

  $: ({ isLoading, data } = useMasterKuwaBalance())
</script>

<tr>
  <td>KWC Balance</td>
  <td class="text-right">
    {#if $data}
      {(+formatEther($data)).toLocaleString()}
    {:else if isLoading}
      loading...
    {:else}
      -
    {/if}
  </td>
</tr>

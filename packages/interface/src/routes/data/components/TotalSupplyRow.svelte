<script lang="ts">
  import { kuwaCoin } from '$lib/contracts'
  import { formatEther } from '@ethersproject/units'
</script>

<tr>
  <td>Total Supply</td>
  <td class="text-right">
    {#await $kuwaCoin.totalSupply()}
      loading...
    {:then value}
      {value ? (+formatEther(value)).toLocaleString() : '-'}
    {/await}
  </td>
</tr>

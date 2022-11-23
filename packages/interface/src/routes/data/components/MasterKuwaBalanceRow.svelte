<script lang="ts">
  import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
  import { kuwaCoin } from '$lib/contracts'
  import { formatEther } from '@ethersproject/units'
</script>

<tr>
  <td>KWC Balance</td>
  <td class="text-right">
    {#await $kuwaCoin.balanceOf(PUBLIC_MASTER_KUWA_ADDRESS)}
      loading...
    {:then value}
      {value ? (+formatEther(value)).toLocaleString() : '-'}
    {/await}
  </td>
</tr>

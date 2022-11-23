<script lang="ts">
  import { masterKuwa } from '$lib/contracts'
</script>

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

<script lang="ts">
  import { useGivenCount } from '$lib/store'

  $: ({ isLoading, data } = useGivenCount())
</script>

<tr>
  <td>Given Count</td>
  <td class="text-right">
    {#if $data}
      {$data}
    {:else if isLoading}
      loading...
    {:else}
      -
    {/if}
  </td>
</tr>

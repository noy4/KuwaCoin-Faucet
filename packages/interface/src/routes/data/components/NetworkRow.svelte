<script lang="ts">
  import { PUBLIC_PROVIDER_URL } from '$env/static/public'
</script>

<tr>
  <td>Network</td>
  <td class="text-right">
    {PUBLIC_PROVIDER_URL ? 'Sepolia' : 'Localhost'}
  </td>
</tr>

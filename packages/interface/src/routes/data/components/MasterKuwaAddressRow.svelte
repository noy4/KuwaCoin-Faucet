<script lang="ts">
  import { Hash } from '$components'
  import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
  import { shortenAddress } from '$lib/utils'
</script>

<tr>
  <td>Address</td>
  <td class="text-right">
    <Hash
      text={PUBLIC_MASTER_KUWA_ADDRESS}
      label={shortenAddress(PUBLIC_MASTER_KUWA_ADDRESS)}
    />
  </td>
</tr>

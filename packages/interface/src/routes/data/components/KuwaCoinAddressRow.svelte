<script lang="ts">
  import { Hash } from '$components'
  import { PUBLIC_KUWA_COIN_ADDRESS } from '$env/static/public'
  import { shortenAddress } from '$lib/utils'
</script>

<tr>
  <td>Address</td>
  <td class="text-right">
    <Hash
      text={PUBLIC_KUWA_COIN_ADDRESS}
      label={shortenAddress(PUBLIC_KUWA_COIN_ADDRESS)}
    />
  </td>
</tr>

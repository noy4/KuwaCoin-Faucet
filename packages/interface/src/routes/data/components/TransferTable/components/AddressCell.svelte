<script lang="ts">
  import { Hash, Jazzicon } from '$components'
  import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
  import { wallet } from '$lib/contracts'
  import { shortenAddress } from '$lib/utils'

  export let address: string
</script>

<td>
  <div class="flex items-center gap-2">
    <Jazzicon {address} />
    <Hash text={address} label={shortenAddress(address)} copiable={false} />
    {#if address === $wallet?.address}
      <div class="badge badge-sm badge-outline">You</div>
    {:else if address === PUBLIC_MASTER_KUWA_ADDRESS}
      <div class="badge badge-sm badge-ghost">Master</div>
    {/if}
  </div>
</td>

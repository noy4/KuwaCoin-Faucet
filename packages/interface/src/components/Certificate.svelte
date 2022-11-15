<script lang="ts">
  import { Jazzicon } from '$components'
  import { wallet } from '$lib/contracts'
  import { shortenAddress } from '$lib/utils'
  import type { BigNumber } from 'ethers'
  import { formatEther } from 'ethers/lib/utils'

  export let totalTransferedAmount: BigNumber
</script>

<input type="checkbox" id="certificate" class="modal-toggle" />
<label for="certificate" class="modal cursor-pointer">
  <label class="modal-box p-0 max-w-md" for="">
    <div class="flex flex-col gap-2 items-center m-4 p-2 border border-dashed">
      <Jazzicon address={$wallet?.address} size={100} />
      <p class="text-2xl">CERTIFICATE</p>
      <div class="flex items-center gap-2 badge badge-ghost">
        <Jazzicon address={$wallet?.address} />
        {shortenAddress($wallet?.address)}
      </div>

      <p>You've sent</p>
      <div>
        <span class="text-5xl font-semibold">
          {formatEther(totalTransferedAmount)}
        </span>
        <span class="font-bold">KWC</span>
      </div>
      <p>to Master Kuwa</p>

      <p class="text-center font-serif italic mt-2">
        Show this screen to Master Kuwa, and he might pay you dinner.
      </p>
      <div class="i-tabler-award text-7xl" />
    </div>
  </label>
</label>

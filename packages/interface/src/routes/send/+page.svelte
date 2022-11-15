<script lang="ts">
  import { Card, Jazzicon } from '$components'
  import { FAUCET_ADDRESS, kuwaCoin, wallet } from '$lib/contracts'
  import { notifications } from '$lib/notifications'
  import type { TransferEvent } from '$lib/typechain-types/contracts/KuwaCoin'
  import { shortenAddress } from '$lib/utils'
  import { BigNumber } from 'ethers'
  import { formatEther, parseEther } from 'ethers/lib/utils'

  let transfers: TransferEvent[] = []
  let amount = ''
  let toAddress = FAUCET_ADDRESS
  let isSending = false
  let errorMessage = ''

  async function getTransfers() {
    if (!$wallet || !$kuwaCoin) return
    transfers = await $kuwaCoin.queryFilter(
      $kuwaCoin.filters.Transfer($wallet.address, FAUCET_ADDRESS)
    )
  }

  async function send() {
    if (!$wallet || !$kuwaCoin) return
    errorMessage = ''
    isSending = true
    try {
      const tx = await $kuwaCoin.transfer(toAddress, parseEther(amount))
      await tx.wait()
      notifications.success('送金が完了しました')
    } catch (error) {
      errorMessage = 'Something went wrong'
      console.error(error)
      notifications.error(JSON.stringify(error))
    }
    isSending = false
  }

  $: if ($kuwaCoin) {
    $kuwaCoin.on('Transfer', getTransfers)
    getTransfers()
  }

  $: if (!$wallet) transfers = []

  $: totalTransferedAmount = transfers.reduce(
    (prev, current) => prev.add(current.args.value),
    BigNumber.from(0)
  )
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

<section class="flex flex-col items-center px-4">
  {#if transfers.length}
    <div class="i-tabler-award text-6xl mt-8" />
    <p class="mt-2 text-center">You've sent some KWC to Master Kuwa.</p>
    <label for="certificate" class="btn btn-xs btn-primary normal-case mt-1">
      Show Cirtificate
    </label>
  {:else}
    <div class="i-tabler-award-off text-6xl mt-8" />
    <p class="mt-2 text-center">You haven't sent KWC to Master Kuwa yet.</p>
  {/if}

  <Card class="mt-8 p-8">
    <form on:submit|preventDefault={send}>
      <div class="form-control w-full max-w-xs">
        <label for="amount" class="label">
          <span class="">Amount:</span>
        </label>
        <input
          id="amount"
          placeholder="0"
          required
          bind:value={amount}
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="to-address" class="label">
          <span class="">To:</span>
          {#if toAddress === FAUCET_ADDRESS}
            <span class="badge badge-sm">Master Kuwa</span>
          {/if}
        </label>
        <input
          id="to-address"
          placeholder="Input address"
          bind:value={toAddress}
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <p class="text-error pt-4">{errorMessage}</p>
      <div class="card-actions justify-end mt-4">
        <button
          type="submit"
          class="btn btn-primary bg-primary normal-case w-32"
          class:loading={isSending}
        >
          Send
        </button>
      </div>
    </form>
  </Card>

  <div class="mt-8 max-w-sm px-2 text-sm">
    <p>
      ※送金の手数料として「イーサリアム」という別のコインが必要。これを省くことはどー足掻いても無理やった。すまんね、初心者のみんな。
    </p>
    <p class="mt-4">
      ※その壁を乗り越えて Master Kuwa に KuwaCoin を送る場合、
      <a
        href="https://faucet.sepolia.dev/"
        class="link link-primary"
        target="_blank"
        rel="noreferrer"
      >
        https://faucet.sepolia.dev/
      </a>
      でイーサリアムがもらえる。頑張れ。
    </p>
  </div>

  <div class="h-16" />
</section>

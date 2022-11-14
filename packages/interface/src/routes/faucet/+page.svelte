<script lang="ts">
  import { Jazzicon } from '$components'
  import Card from '$components/Card.svelte'
  import { faucet, FAUCET_ADDRESS, kuwaCoin, wallet } from '$lib/contracts'
  import { dayjs } from '$lib/dayjs'
  import type { TransferEvent } from '$lib/typechain-types/contracts/KuwaCoin'
  import { shortenAddress } from '$lib/utils'
  import type { BigNumber } from 'ethers'
  import { formatEther } from 'ethers/lib/utils'
  // @ts-ignore

  let balance: BigNumber | undefined
  let isBalanceLoading = false
  let toAddress = ''
  let isRequesting = false
  let requestTokensErrorMessage = ''
  let isTransfersLoading = false
  let transfers: TransferEvent[] = []

  async function requestKuwaCoin() {
    if (!$wallet) return
    isRequesting = true
    requestTokensErrorMessage = ''

    try {
      const tx = await faucet.requestTokens($wallet.address)
      await tx.wait()
    } catch (error) {
      console.error(error.error.reason)
      requestTokensErrorMessage = 'Something went wrong'
    } finally {
      isRequesting = false
    }
  }

  $: toAddress = $wallet?.address || ''

  async function getBalance() {
    if (!$kuwaCoin || !$wallet) {
      balance = undefined
      return
    }
    isBalanceLoading = true
    balance = await $kuwaCoin.balanceOf($wallet.address)
    isBalanceLoading = false
  }

  async function getTransfers() {
    if (!$kuwaCoin) return
    isTransfersLoading = true
    transfers = await $kuwaCoin.queryFilter(
      $kuwaCoin.filters.Transfer(FAUCET_ADDRESS)
    )
    isTransfersLoading = false
  }

  function onTransfer(...args: any[]) {
    if (!$wallet || !$kuwaCoin) return
    console.log('Transfer:', {
      from: args[0].slice(2, 5),
      to: args[1].slice(2, 5),
      amount: formatEther(args[2]),
      txHash: args[3].transactionHash.slice(2, 5),
    })
    getBalance()
    getTransfers()
  }

  $: if ($kuwaCoin) {
    console.log('$kuwaCoin updated')
    $kuwaCoin.on('Transfer', onTransfer)
    getBalance()
    getTransfers()
  }

  $: if (!$wallet) balance = undefined
</script>

<section class="flex flex-col items-center px-4">
  <h3 class="text-xl font-bold mt-8">You have</h3>
  <div class="mt-2">
    <span class="text-5xl font-semibold">
      {#if isBalanceLoading && !balance}
        -
      {:else}
        {balance ? formatEther(balance).toLocaleString() : '-'}
      {/if}
    </span>
    <span class="font-bold">KWC</span>
  </div>

  <Card class="mt-8">
    <div class="card-body gap-3">
      <div class="form-control w-full max-w-xs">
        <label for="to-address" class="label">
          <span class="">Your wallet address</span>
        </label>
        <input
          id="to-address"
          placeholder="Input your wallet address"
          bind:value={toAddress}
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <p class="text-error">{requestTokensErrorMessage}</p>
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary normal-case"
          class:loading={isRequesting}
          on:click={requestKuwaCoin}
        >
          Give me KWC
        </button>
      </div>
    </div>
  </Card>

  <h2 class="text-3xl font-bold mt-12">Logs</h2>

  <div class="overflow-x-auto max-w-md w-full mx-auto not-prose mt-4 z-0">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th>Age</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {#if isTransfersLoading && transfers.length === 0}
          <tr>loading...</tr>
        {:else}
          {#each [...transfers].reverse() as item}
            <tr>
              <td>
                {#await item.getBlock()}
                  loading...
                {:then block}
                  {dayjs(block.timestamp * 1000).fromNow(true)}
                {/await}
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <Jazzicon address={item.args.to} />
                  {shortenAddress(item.args.to)}
                  {#if item.args.to === $wallet?.address}
                    <div class="badge badge-sm badge-ghost">You</div>
                  {/if}
                </div>
              </td>
              <td>{formatEther(item.args.value)}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="h-16" />
</section>

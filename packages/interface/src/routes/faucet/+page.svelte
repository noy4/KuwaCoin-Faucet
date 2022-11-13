<script lang="ts">
  import Card from '$components/Card.svelte'
  import { faucet, kuwaCoin, wallet } from '$lib/contracts'
  import { formatEther } from 'ethers/lib/utils'
  import { signerAddress } from 'svelte-ethers-store'

  let toAddress = ''
  let isRequesting = false
  let requestTokensErrorMessage = ''

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

  $: balance = $kuwaCoin?.balanceOf($signerAddress)
  $: toAddress = $signerAddress

  const updateBalance = (...args) => {
    if (!$wallet || !$kuwaCoin) return
    console.log('Transfer:', {
      from: args[0].slice(2, 5),
      to: args[1].slice(2, 5),
      amount: formatEther(args[2]),
      txHash: args[3].transactionHash.slice(2, 5),
    })
    balance = $kuwaCoin.balanceOf($wallet.address)
  }
  $: if ($kuwaCoin) {
    $kuwaCoin.on('Transfer', updateBalance)
  }
</script>

<section class="flex flex-col items-center px-4">
  <h3 class="text-xl font-bold mt-8">You have</h3>
  <div class="mt-2">
    <span class="text-5xl font-semibold">
      {#await balance then value}
        {value ? formatEther(value).toLocaleString() : '-'}
      {/await}
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
</section>

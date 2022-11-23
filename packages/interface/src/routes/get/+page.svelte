<script lang="ts">
  import { Card } from '$components'
  import { faucet, kuwaCoin, wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'
  import { notifications } from '$lib/notifications'
  import type { BigNumber } from 'ethers'
  import { formatEther, parseEther } from '@ethersproject/units'

  let balance: BigNumber | undefined
  let isBalanceLoading = false
  let toAddress = ''
  let isRequesting = false
  let requestTokensErrorMessage = ''

  async function requestKuwaCoin() {
    isRequesting = true
    requestTokensErrorMessage = ''

    try {
      const tx = await faucet.requestTokens(toAddress, {
        value: parseEther('0.001'),
      })
      await tx.wait()
      notifications.success('KuwaCoin を獲得しました')
    } catch (error: any) {
      const _error = error.error?.reason || error
      console.error(_error)
      notifications.error(_error)
      requestTokensErrorMessage = 'Something went wrong'
    } finally {
      isRequesting = false
    }
  }

  async function getBalance() {
    if (!$kuwaCoin || !$wallet) {
      balance = undefined
      return
    }
    isBalanceLoading = true
    balance = await $kuwaCoin.balanceOf($wallet.address)
    isBalanceLoading = false
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
  }

  $: {
    toAddress = $wallet?.address || ''
    requestTokensErrorMessage = ''
  }

  $: if ($kuwaCoin) {
    $kuwaCoin.on('Transfer', onTransfer)
    getBalance()
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

  <Card class="mt-8 p-8">
    <div class="form-control w-full max-w-xs">
      <label for="to-address" class="label">
        <span class="">{$t('Your wallet address:')}</span>
      </label>
      <input
        id="to-address"
        placeholder={$t('Input your wallet address')}
        bind:value={toAddress}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    {#if requestTokensErrorMessage}
      <p class="text-error pt-4">{requestTokensErrorMessage}</p>
    {/if}
    <div class="card-actions justify-end mt-4">
      <button
        class="btn btn-primary normal-case"
        class:loading={isRequesting}
        on:click={requestKuwaCoin}
      >
        {$t('Give me KWC')}
      </button>
    </div>
  </Card>

  <div class="h-16" />
</section>
<script lang="ts">
  import { Card } from '$components'
  import { kuwaCoin, masterKuwa, wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'
  import { notifications } from '$lib/notifications'
  import { useBalance } from '$lib/store'
  import { formatEther, parseEther } from '@ethersproject/units'
  import { onMount } from 'svelte'

  let toAddress = ''
  let isRequesting = false
  let requestTokensErrorMessage = ''

  async function requestKuwaCoin() {
    isRequesting = true
    requestTokensErrorMessage = ''

    try {
      const tx = await masterKuwa.requestTokens(toAddress, {
        value: parseEther('0.001'),
      })
      await tx.wait()
      notifications.success($t("You've got Kuwa Coin"))
    } catch (error: any) {
      const _error = error.error?.reason || error
      console.error(_error)
      notifications.error(_error)
      requestTokensErrorMessage = $t('Something went wrong')
    } finally {
      isRequesting = false
    }
  }

  const {
    isLoading: isBalanceLoading,
    data: balance,
    fetch: fetchBalance,
  } = useBalance({ immediate: false })

  function onTransfer(...args: any[]) {
    console.log('Transfer:', {
      from: args[0].slice(2, 5),
      to: args[1].slice(2, 5),
      amount: formatEther(args[2]),
      txHash: args[3].transactionHash.slice(2, 5),
    })
    fetchBalance()
  }

  $: if ($wallet) fetchBalance()
  $: if (!$wallet) balance.set(undefined)

  $: {
    toAddress = $wallet?.address || ''
    requestTokensErrorMessage = ''
  }

  onMount(() => {
    $kuwaCoin.on('Transfer', onTransfer)
  })
</script>

<section class="flex flex-col items-center px-4">
  <h3 class="text-xl font-bold mt-8">You have</h3>
  <div class="mt-2">
    <span class="text-5xl font-semibold">
      {#if $isBalanceLoading && !$balance}
        -
      {:else}
        {$balance ? formatEther($balance).toLocaleString() : '-'}
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

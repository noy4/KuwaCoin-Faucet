<script lang="ts">
  import { Card, Certificate, Input } from '$components'
  import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
  import { kuwaCoin, wallet } from '$lib/contracts'
  import { t } from '$lib/i18n'
  import { notifications } from '$lib/notifications'
  import type { TransferEvent } from '$lib/typechain-types/contracts/KuwaCoin'
  import { BigNumber } from 'ethers'
  import { parseEther } from 'ethers/lib/utils'

  let transfers: TransferEvent[] = []
  let amount = ''
  let toAddress = PUBLIC_MASTER_KUWA_ADDRESS
  let isSending = false
  let errorMessage = ''

  async function getTransfers() {
    if (!$wallet || !$kuwaCoin) return
    transfers = await $kuwaCoin.queryFilter(
      $kuwaCoin.filters.Transfer($wallet.address, PUBLIC_MASTER_KUWA_ADDRESS)
    )
  }

  async function send() {
    errorMessage = ''
    if (!$wallet || !$kuwaCoin) {
      errorMessage = 'Connect wallet first'
      return
    }
    isSending = true
    try {
      const tx = await $kuwaCoin.transfer(toAddress, parseEther(amount))
      await tx.wait()
      notifications.success('送金が完了しました')
    } catch (error: any) {
      errorMessage = 'Something went wrong'
      const _error = error.error?.reason || error.error?.data?.message || error
      console.error(JSON.stringify(error, null, 2))
      notifications.error(_error)
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

<Certificate {totalTransferedAmount} />

<section class="flex flex-col items-center px-4">
  {#if transfers.length}
    <div class="i-tabler-award text-6xl mt-8" />
    <p class="mt-2 text-center">{$t("You've sent some KWC to Master Kuwa.")}</p>
    <label for="certificate" class="btn btn-xs btn-primary normal-case mt-1">
      {$t('Show Cirtificate')}
    </label>
  {:else}
    <div class="i-tabler-award-off text-6xl mt-8" />
    <p class="mt-2 text-center">
      {$t("You haven't sent KWC to Master Kuwa yet.")}
    </p>
  {/if}

  <Card class="mt-8 p-8">
    <form on:submit|preventDefault={send}>
      <Input
        id="amount"
        label="Amount:"
        placeholder="0"
        required
        bind:value={amount}
      />
      <Input
        id="to-address"
        placeholder="Input address"
        required
        bind:value={toAddress}
      >
        To:
        {#if toAddress === PUBLIC_MASTER_KUWA_ADDRESS}
          <span class="badge badge-sm">Master Kuwa</span>
        {/if}
      </Input>

      {#if errorMessage}
        <p class="text-error pt-4">{errorMessage}</p>
      {/if}
      <div class="card-actions justify-end mt-4">
        <button
          type="submit"
          class="btn btn-primary bg-primary normal-case w-32"
          class:loading={isSending}
        >
          {$t('Send')}
        </button>
      </div>
    </form>
  </Card>

  <div class="h-16" />
</section>

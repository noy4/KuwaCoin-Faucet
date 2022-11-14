<script lang="ts">
  import { Card } from '$components'
  import { FAUCET_ADDRESS, kuwaCoin } from '$lib/contracts'
  import { parseEther } from 'ethers/lib/utils'

  let amount = ''
  let toAddress = FAUCET_ADDRESS
  let isSending = false
  let errorMessage = ''

  async function send() {
    if (!$kuwaCoin) return
    errorMessage = ''
    isSending = true
    try {
      await $kuwaCoin.transfer(toAddress, parseEther(amount))
    } catch (error) {
      errorMessage = 'Something went wrong'
    }
    isSending = false
  }
</script>

<section class="flex flex-col items-center px-4">
  <Card class="mt-8 p-8">
    <div class="form-control w-full max-w-xs">
      <label for="amount" class="label">
        <span class="">Amount:</span>
      </label>
      <input
        id="amount"
        placeholder="Input amount"
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
    <p class="text-error">{errorMessage}</p>
    <div class="card-actions justify-end mt-4">
      <button
        class="btn btn-primary normal-case w-32"
        class:loading={isSending}
        on:click={send}
      >
        Send
      </button>
    </div>
  </Card>

  <div class="mt-8 max-w-sm px-2">
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

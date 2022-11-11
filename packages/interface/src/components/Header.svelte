<script lang="ts">
  import { theme } from '$lib/theme'
  import { shortenAddress } from '$lib/utils'
  import { signerAddress, defaultEvmStores } from 'svelte-ethers-store'
  import Link from './Link.svelte'
  import { ethers, type Wallet } from 'ethers'
  // @ts-ignore
  import { Jazzicon } from 'svelte-ethers-store/components'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

  let className = 'bg-base-100 shadow'
  export { className as class }

  let privateKey = ''
  let importErrorMessage = ''
  let importModal: HTMLInputElement

  const wallet = writable<Wallet | undefined>()

  async function createWallet() {
    const _wallet = ethers.Wallet.createRandom()
    localStorage.privateKey = _wallet.privateKey
    const provider = new ethers.providers.JsonRpcProvider()
    const signer = new ethers.Wallet(_wallet.privateKey, provider)
    wallet.set(signer)
    defaultEvmStores.setProvider(signer.provider, signer.address)
  }

  function disconnect() {
    defaultEvmStores.disconnect()
    wallet.set(undefined)
    localStorage.removeItem('privateKey')
  }

  function importWallet() {
    importErrorMessage = ''
    const provider = new ethers.providers.JsonRpcProvider()
    try {
      const signer = new ethers.Wallet(privateKey, provider)
      wallet.set(signer)
      localStorage.privateKey = signer.privateKey
      defaultEvmStores.setProvider(signer.provider, signer.address)
      importModal.checked = false
    } catch (e) {
      importErrorMessage = 'Invalid private key'
    }
  }

  async function connectOnMount() {
    if (!localStorage.privateKey) return
    const provider = new ethers.providers.JsonRpcProvider()
    const signer = new ethers.Wallet(localStorage.privateKey, provider)
    wallet.set(signer)
    defaultEvmStores.setProvider(signer.provider, signer.address)
  }

  onMount(() => {
    connectOnMount()
  })
</script>

<input type="checkbox" id="wallet-modal" class="modal-toggle" />
<label for="wallet-modal" class="modal cursor-pointer">
  <label class="modal-box rounded-2xl" for="">
    <h2 class="font-bold text-xl pb-2">Your wallet</h2>
    {#if $wallet}
      <h3 class="font-bold mt-2">Address</h3>
      <div class="overflow-x-scroll">
        <div>{$signerAddress}</div>
      </div>
      <h3 class="font-bold mt-2">Private key</h3>
      <div class="overflow-x-scroll">
        <div>{$wallet?.privateKey}</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label
        for="wallet-modal"
        class="btn btn-primary mt-4 normal-case w-32"
        on:click={disconnect}
      >
        Logout</label
      >
    {/if}
  </label>
</label>

<input
  bind:this={importModal}
  type="checkbox"
  id="import-modal"
  class="modal-toggle"
/>
<label for="import-modal" class="modal cursor-pointer">
  <label class="modal-box rounded-2xl max-w-md" for="">
    <div class="form-control w-full max-w-xs mt-2">
      <label for="private-key" class="label">
        <span class="">Private key</span>
      </label>
      <input
        id="private-key"
        placeholder="Input your private key"
        bind:value={privateKey}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <button class="btn btn-primary mt-4 normal-case" on:click={importWallet}>
      Import wallet
    </button>
    <p class="text-error mt-2">{importErrorMessage}</p>
  </label>
</label>

<header class="navbar gap-2 {className}">
  <div class="flex-1">
    <button class="btn btn-ghost text-xl normal-case">
      <Link to="/">桑</Link>
    </button>
  </div>

  {#if $signerAddress}
    <div class="bg-base-200 p-0.5 rounded-xl">
      <!-- {#await balance then value}
        <div class="mx-2">{Number((+formatEther(value)).toFixed(4))} ETH</div>
      {/await} -->
      <label
        for="wallet-modal"
        class="btn btn-ghost btn-sm normal-case bg-base-100 rounded-xl gap-2"
      >
        <div>{shortenAddress($signerAddress)}</div>
        <Jazzicon size="18" address={$signerAddress} />
      </label>
    </div>
  {:else}
    <div class="dropdown dropdown-hover">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div tabindex="0" class="btn btn-outline btn-sm btn-primary normal-case">
        Create / Import Wallet
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button on:click={createWallet}>Create new wallet</button>
        </li>
        <li>
          <label for="import-modal">Import wallet</label>
        </li>
      </ul>
    </div>
  {/if}

  <div class="dropdown dropdown-end">
    <!-- svelte-ignore a11y-label-has-associated-control a11y-no-noninteractive-tabindex -->
    <label tabindex="0" class="btn btn-ghost text-3xl px-2">
      <div class="i-tabler-menu-2" />
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><Link to="/data">Data</Link></li>
      <li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class:hidden={$theme === 'dark'} on:click={theme.setDark}>
          <span class="i-tabler-sun text-xl" />
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class:hidden={$theme === 'light'} on:click={theme.setLight}>
          <span class="i-tabler-moon text-xl" />
        </div>
      </li>
    </ul>
  </div>
</header>

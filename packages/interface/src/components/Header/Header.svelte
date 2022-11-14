<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { wallet } from '$lib/contracts'
  import { theme } from '$lib/theme'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'
  import { defaultEvmStores } from 'svelte-ethers-store'
  import Link from '../Link.svelte'
  import { AccountBadge, ImportModal, WalletModal } from './components'

  let privateKey = ''
  let importErrorMessage = ''
  let importModal: HTMLInputElement

  async function createWallet() {
    const provider = new ethers.providers.JsonRpcProvider()
    const _wallet = ethers.Wallet.createRandom().connect(provider)
    localStorage.privateKey = _wallet.privateKey
    wallet.set(_wallet)
    defaultEvmStores.setProvider(_wallet.provider, _wallet.address)
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
      const _wallet = new ethers.Wallet(privateKey, provider)
      wallet.set(_wallet)
      localStorage.privateKey = _wallet.privateKey
      defaultEvmStores.setProvider(_wallet.provider, _wallet.address)
      importModal.checked = false
    } catch (e) {
      importErrorMessage = 'Invalid private key'
    }
  }

  async function connectOnMount() {
    if (!localStorage.privateKey) return
    const provider = new ethers.providers.JsonRpcProvider()
    const _wallet = new ethers.Wallet(localStorage.privateKey, provider)
    wallet.set(_wallet)
    defaultEvmStores.setProvider(_wallet.provider, _wallet.address)
  }

  $: isHome = $page.url.pathname === (base || '/')

  onMount(() => {
    connectOnMount()
  })
</script>

<WalletModal {disconnect} />

<ImportModal
  bind:importModal
  bind:privateKey
  {importWallet}
  {importErrorMessage}
/>

<header
  class="navbar gap-2 {isHome ? 'bg-transparent' : 'bg-base-100'}"
  class:absolute={isHome}
  class:shadow={!isHome}
>
  <div class="flex-1">
    <button
      class="btn btn-ghost text-xl normal-case"
      class:light-text-neutral-content={isHome}
    >
      <Link to="/">桑</Link>
    </button>
  </div>

  <AccountBadge {createWallet} />

  <div class="dropdown dropdown-end">
    <!-- svelte-ignore a11y-label-has-associated-control a11y-no-noninteractive-tabindex -->
    <label
      tabindex="0"
      class="btn btn-ghost text-3xl px-2"
      class:light-text-neutral-content={isHome}
    >
      <div class="i-tabler-menu-2" />
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><Link to="/data">Data</Link></li>
      <li><Link to="/developer">Developer</Link></li>
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

<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { provider, wallet } from '$lib/contracts'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'
  import Link from '../Link.svelte'
  import { AccountBadge, ImportModal, WalletModal } from './components'
  import Dropdown from './components/Dropdown.svelte'

  let privateKey = ''
  let importErrorMessage = ''
  let importModal: HTMLInputElement

  async function createWallet() {
    const _wallet = ethers.Wallet.createRandom().connect(provider)
    localStorage.privateKey = _wallet.privateKey
    wallet.set(_wallet)
  }

  function disconnect() {
    wallet.set(undefined)
    localStorage.removeItem('privateKey')
  }

  function importWallet() {
    importErrorMessage = ''
    try {
      const _wallet = new ethers.Wallet(privateKey, provider)
      wallet.set(_wallet)
      localStorage.privateKey = _wallet.privateKey
      importModal.checked = false
    } catch (e) {
      importErrorMessage = 'Invalid private key'
    }
  }

  async function connectOnMount() {
    if (!localStorage.privateKey) return
    const _wallet = new ethers.Wallet(localStorage.privateKey, provider)
    wallet.set(_wallet)
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
  <Dropdown />
</header>

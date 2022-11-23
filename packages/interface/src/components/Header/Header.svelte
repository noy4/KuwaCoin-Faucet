<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { Logo } from '$components'
  import { provider, wallet } from '$lib/contracts'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'
  import Link from '../Link.svelte'
  import {
    AccountBadge,
    Dropdown,
    ImportModal,
    WalletModal,
  } from './components'

  async function createWallet() {
    const _wallet = ethers.Wallet.createRandom().connect(provider)
    localStorage.privateKey = _wallet.privateKey
    wallet.set(_wallet)
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

<WalletModal />
<ImportModal />

<header
  class="navbar gap-1 {isHome ? 'bØg-transparent' : 'bg-base-100'}"
  class:absolute={isHome}
  class:shadow={!isHome}
>
  <div class="flex-1">
    <button
      class="btn btn-ghost text-xl normal-case px-2"
      class:light-text-neutral-content={isHome}
    >
      <Link to="/">
        <Logo />
      </Link>
    </button>
  </div>

  <AccountBadge {createWallet} />
  <Dropdown />
</header>

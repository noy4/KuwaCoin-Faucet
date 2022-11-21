<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { provider, wallet } from '$lib/contracts'
  import { i18n } from '$lib/i18n'
  import { theme } from '$lib/theme'
  import { ethers } from 'ethers'
  import { onMount } from 'svelte'
  import Link from '../Link.svelte'
  import { AccountBadge, ImportModal, WalletModal } from './components'

  let privateKey = ''
  let importErrorMessage = ''
  let importModal: HTMLInputElement
  type MenuType = 'top' | 'lang'
  let menuType: MenuType = 'top'

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

  const languages = [
    { key: 'en', label: 'English' },
    { key: 'ja', label: '日本語' },
  ]

  let menuElement: HTMLElement

  function switchMenu(type: MenuType) {
    menuType = type
    menuElement.focus()
  }

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
      bind:this={menuElement}
    >
      <div class="i-tabler-menu-2" />
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      {#if menuType === 'top'}
        <li><Link to="/data">Data</Link></li>
        <li><Link to="/developer">Developer</Link></li>
        <li>
          <button
            on:click={() => {
              switchMenu('lang')
            }}
          >
            <div class="i-tabler-world text-xl" />
            <div>Language</div>
            <span class="i-tabler-chevron-right text-xl ml-auto" />
          </button>
        </li>
        <li>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class:hidden={$theme === 'dark'} on:click={theme.setDark}>
            <snpan class="i-tabler-sun text-xl" />
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class:hidden={$theme === 'light'} on:click={theme.setLight}>
            <span class="i-tabler-moon text-xl" />
          </div>
        </li>
      {:else}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="p-2">
          <div class="flex justify-between opacity-70">
            <button
              class="i-tabler-chevron-left w-6 h-6"
              on:click={() => switchMenu('top')}
            />
            Language
            <span class="w-6 h-6" />
          </div>
        </div>
        {#each languages as lang}
          <li>
            <button
              on:click={() => {
                $i18n.changeLanguage(lang.key)
              }}
            >
              {lang.label}
              {#if lang.key === $i18n.language}
                <span class="i-tabler-check text-primary ml-auto" />
              {/if}
            </button>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</header>

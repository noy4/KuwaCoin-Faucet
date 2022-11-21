<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { Link } from '$components'
  import { i18n, languages, t } from '$lib/i18n'
  import { theme } from '$lib/theme'

  type MenuType = 'top' | 'lang'
  let menuType: MenuType = 'top'
  let menuElement: HTMLElement

  function switchMenu(type: MenuType) {
    menuType = type
    menuElement.focus()
  }

  $: isHome = $page.url.pathname === (base || '/')
</script>

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
      <li><Link to="/data">{$t('Data')}</Link></li>
      <li><Link to="/developer">{$t('Developer')}</Link></li>
      <li>
        <button
          on:click={() => {
            switchMenu('lang')
          }}
        >
          <div class="i-tabler-world text-xl" />
          <div>{$t('Language')}</div>
          <span class="i-tabler-chevron-right text-xl ml-auto" />
        </button>
      </li>
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
    {:else}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div class="p-2">
        <div class="flex justify-between opacity-70">
          <button
            class="i-tabler-chevron-left w-6 h-6"
            on:click={() => switchMenu('top')}
          />
          {$t('Language')}
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

<script>
  import { theme } from '$lib/theme'
  import Link from './Link.svelte'
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="wallet-modal" class="modal-toggle" />
<label for="wallet-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use
      Wikipedia for free!
    </p>
  </label>
</label>

<header class="navbar shadow bg-base-100">
  <div class="flex-1">
    <button class="btn btn-ghost text-xl normal-case">
      <Link to="/">Kuwa Coin</Link>
    </button>
  </div>

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

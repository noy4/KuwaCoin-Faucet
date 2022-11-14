<script lang="ts">
  import { wallet } from '$lib/contracts'
  // @ts-ignore
  import jazzicon from '@metamask/jazzicon'

  export let address = $wallet?.address || ''
  export let size = 18
  let className = ''
  export { className as class }

  let target: HTMLElement

  $: if (address && size && target) {
    const seed = parseInt(address.toLowerCase().slice(2, 10), 16)
    const el = jazzicon(size, seed)
    if (className) el.setAttribute('class', className)
    target.parentNode?.replaceChild(el, target)
    target = el
  }
</script>

<div bind:this={target} />

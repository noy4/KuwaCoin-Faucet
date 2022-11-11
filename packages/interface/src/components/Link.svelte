<script lang="ts">
  import { base } from '$app/paths'
  export let to = ''
</script>

<a href="{base}{to}" {...$$restProps}>
  <slot />
</a>

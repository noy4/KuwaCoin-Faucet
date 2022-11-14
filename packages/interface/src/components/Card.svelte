<script lang="ts">
  let className = ''
  export { className as class }
</script>

<div class="card w-full max-w-sm bg-base-100 shadow-xl {className}">
  <slot />
</div>

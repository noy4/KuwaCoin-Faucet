<script lang="ts">
  export let id = ''
  export let label = ''
  export let placeholder = ''
  export let required = false
  export let value = ''
</script>

<div class="form-control w-full max-w-xs">
  <label for={id} class="label">
    {label}
    <slot />
  </label>

  <input
    {id}
    {placeholder}
    {required}
    bind:value
    class="input input-bordered w-full max-w-xs"
  />
</div>

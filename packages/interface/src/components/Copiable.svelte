<script lang="ts">
  export let text: string
  export let label = ''

  let wasCopied = false

  function copy() {
    navigator.clipboard.writeText(text)
    wasCopied = true
    setTimeout(() => {
      wasCopied = false
    }, 1000)
  }
</script>

<div>
  <span class="break-all">{label || text}</span>
  <div class="tooltip" data-tip={wasCopied ? 'Copied!' : 'Copy'}>
    <button
      class="i-tabler-{wasCopied ? 'circle-check' : 'copy'} text-xl"
      on:click={copy}
    />
  </div>
</div>

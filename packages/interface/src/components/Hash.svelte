<script lang="ts">
  export let text: string
  export let label = text
  export let link = true
  export let mask = false
  export let copiable = true

  let wasCopied = false
  let explorerUrl = `https://sepolia.etherscan.io/address/${text}`
  let maskedLabel = [...Array(label.length)].map(() => '*').join('')

  function copy() {
    navigator.clipboard.writeText(text)
    wasCopied = true
    setTimeout(() => {
      wasCopied = false
    }, 1000)
  }
</script>

<div>
  {#if mask}
    <span class="break-all">
      {maskedLabel}
    </span>
  {:else if link}
    <a
      class="break-all text-blue-600 hover:text-blue-800"
      href={explorerUrl}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  {:else}
    <span class="break-all">
      {label}
    </span>
  {/if}

  {#if copiable}
    <div class="tooltip" data-tip={wasCopied ? 'Copied!' : 'Copy'}>
      <button
        class="i-tabler-{wasCopied ? 'circle-check' : 'copy'} text-xl"
        on:click={copy}
      />
    </div>
  {/if}
</div>

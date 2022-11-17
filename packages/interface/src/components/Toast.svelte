<script>
  import { notifications } from '$lib/notifications'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
</script>

<div class="fixed top-0 right-0 mt-16 z-10 max-w-sm flex flex-col items-end">
  {#each $notifications as { id, status, message } (id)}
    <div
      class="m-2 p-4 bg-{status} shadow-lg mb-2 rounded-xl"
      animate:flip={{ duration: 500 }}
      in:fly={{ x: 30 }}
      out:fly={{ x: 30 }}
    >
      <div class="flex items-center gap-2">
        <div
          class="text-2xl w-5"
          class:i-tabler-circle-check={status === 'success'}
          class:i-tabler-alert-circle={status === 'error'}
        />
        <div class="w-full break-words">
          {message}
        </div>
      </div>
    </div>
  {/each}
</div>

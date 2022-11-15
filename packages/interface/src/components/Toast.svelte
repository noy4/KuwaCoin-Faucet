<script>
  import { notifications } from '$lib/notifications'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
</script>

<div class="fixed top-0 right-0 mt-16 p-2 z-10">
  {#each $notifications as notification (notification.id)}
    <div
      class="alert alert-success shadow-lg mb-2"
      animate:flip={{ duration: 500 }}
      in:fly={{ x: 30 }}
      out:fly={{ x: 30 }}
    >
      <div>
        <span class="i-tabler-circle-check text-2xl" />
        <span>{notification.message}</span>
      </div>
    </div>
  {/each}
</div>

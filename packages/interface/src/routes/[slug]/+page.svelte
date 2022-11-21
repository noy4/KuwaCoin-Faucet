<script lang="ts">
  import { i18n } from '$lib/i18n'
  import type { PageData } from './$types'
  import './markdown.scss'

  export let data: PageData

  $: content = data.contents[$i18n.language] || data.contents['en']
</script>

<section class="px-4">
  <div class="bg-base-100 max-w-2xl w-full mx-auto mt-8 p-8 rounded markdown">
    {@html content}
  </div>
  <div class="h-16" />
</section>

<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let triggeredBy: string;
</script>

<Popover class="rounded-lg bg-white px-14 py-8" {triggeredBy}>
    
</Popover>

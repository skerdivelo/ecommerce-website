<script>
  import { footerSections } from "$lib/data/footer-links";
  import WhiteLogo from "$lib/icons/WhiteLogo.svelte";
</script>

<div
  class="bg-fw-darkblue text-white flex flex-col padding-x pt-12 pb-16 gap-8 lg:gap-16 xl:gap-28 sm:flex-row"
>
  <div class="flex flex-col justify-between">
    <WhiteLogo />
    <span class="text-fw-darkgrey hidden sm:block">
      © Copyright FullStackWiz. All rights reserved
    </span>
  </div>
  {#each footerSections as section}
    <div class="flex flex-col gap-5">
      <span class="font-semibold text-lg"> Products </span>
      <div class="flex flex-col gap-3">
        {#each section.links as link}
          <button class="cursor-pointer w-min whitespace-nowrap">
            {link.name}
          </button>
        {/each}
      </div>
    </div>
  {/each}
  <span class="text-fw-darkgrey block sm:hidden">
    © Copyright FullStackWiz. All rights reserved
  </span>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { HeaderLink } from "../../types/Header";
  import ShoppingBagIcon from "$lib/icons/ShoppingBagIcon.svelte";

  export let isMenuOpened = false;
  export let headerLinks: HeaderLink[];
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  onMount(() => {
    if (!headerLinks?.some((link) => link.name === "Cart")) {
      headerLinks = [
        ...headerLinks,
        { name: "Cart", link: "/cart", icon: ShoppingBagIcon },
      ];
    }
  });
</script>

<div
  class={`fixed top-0 bottom-0 left-0 right-0 z-50 invisible ${
    isMenuOpened && "!visible"
  }`}
>
  <button
    on:click={close}
    class={`w-full h-full bg-black/50 flex justify-end transition opacity-0 ${
      isMenuOpened && "!opacity-100"
    }`}
  />
  <div
    class={`flex flex-col text-fw-blue text-lg font-medium absolute w-3/4 xsm:w-1/2 sm:w-1/3 h-full
     top-0 right-0 bg-white whitespace-nowrap transition origin-right scale-x-0 pt-5 ${
       isMenuOpened && "!scale-x-100"
     }`}
  >
    {#each headerLinks as link}
      <div class="px-5 w-full py-3">
        <a
          href={link.link}
          class="cursor-pointer w-min gap-2 flex items-center"
        >
          <svelte:component this={link.icon} />
          {link.name}
        </a>
      </div>
    {/each}
  </div>
</div>

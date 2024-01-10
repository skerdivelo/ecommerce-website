<script lang="ts">
  import HomeIcon from "$lib/icons/HomeIcon.svelte";
  import Logo from "$lib/icons/Logo.svelte";
  import MenuIcon from "$lib/icons/MenuIcon.svelte";
  import ProductIcon from "$lib/icons/ProductIcon.svelte";
  import ShoppingBagIcon from "$lib/icons/ShoppingBagIcon.svelte";
  import type { HeaderLink } from "../../types/Header";
  import HeaderDrawer from "./HeaderDrawer.svelte";
  import ProductsPopover from "./ProductsPopover.svelte";

  const headerLinks: HeaderLink[] = [
    { name: "Home", link: "/home", icon: HomeIcon },
    { name: "Products", icon: ProductIcon, popover: ProductsPopover },
  ];

  let isMenuOpened = false;

  function open() {
    isMenuOpened = true;
  }
</script>

<header>
  <div
    class="padding-x py-6 border-b border-gray-300 flex items-center justify-between"
  >
    <div class="flex gap-16 items-center">
      <Logo />
      {#each headerLinks as link}
        <a
          id={link.name}
          href={link.link}
          class="cursor-pointer hidden md:block"
        >
          {link.name}
        </a>
        {#if link.popover}
          <svelte:component this={link.popover}></svelte:component>
        {/if}
      {/each}
    </div>
    <a href="/shopping-bag" class="hidden md:block">
      <ShoppingBagIcon />
    </a>
    <button on:click={open} class="block md:hidden z-10">
      <MenuIcon />
    </button>
  </div>
  <div class="md:hidden">
    <HeaderDrawer
      {headerLinks}
      {isMenuOpened}
      on:close={() => {
        isMenuOpened = false;
      }}
    />
  </div>
</header>

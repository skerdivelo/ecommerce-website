<script lang="ts">
  import { Popover } from "flowbite-svelte";
  import { shoppingBag } from "$lib/stores/shoppingBag";
  import ShoppingBag from "./ShoppingBag.svelte";
  import cart from '../images/cart.png';

  export let triggeredBy: string;
</script>

  {#if $shoppingBag.length === 0}
    <Popover class="popover bg-white px-40 py-{$shoppingBag.length * 150}" {triggeredBy}>
      <img src={cart} alt="Cart" class="w-20 h-20 mx-auto mb-6" />
      <p>Your shopping bag is empty</p>
    </Popover>
  {:else}
    <Popover class="popover bg-white px-40 py-{$shoppingBag.length * 150}" {triggeredBy}>
      {#each $shoppingBag as product (product.id)}
          <div class="product">
            <ShoppingBag />
          </div>
      {/each}
    </Popover>
  {/if}

<style>
  .product {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 40px;
  }
</style>
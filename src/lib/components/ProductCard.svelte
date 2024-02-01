<script lang="ts">
  import { writable } from 'svelte/store';
  import StarIcon from "$lib/icons/StarIcon.svelte";
  import { ButtonVariant } from "../../types/Button";
  import type { Product } from "../../types/Product";
  import Button from "./Button.svelte";
  import { shoppingBag } from '$lib/stores/shoppingBag';

  export let product: Product;

  // Reactive variable to track if the product is in the cart
  let inCart = writable(false);

  const toggleCart = (product: Product) => {
    inCart.update(value => {
      if (value) {
        console.log(`Removing ${product.name} from cart`);
        // Remove the product from the shopping bag
        shoppingBag.update(bag => bag.filter(p => p.name !== product.name));
      } else {
        console.log(`Adding ${product.name} to cart`);
        // Add the product to the shopping bag
        shoppingBag.update(bag => [...bag, product]);
      }
      return !value; // Toggle the inCart state
    });
  };
</script>

<div class="h-full p-8 pb-10 flex flex-col shadow-sm bg-white rounded-lg justify-between">
  <div>
    <div class="w-full aspect-square rounded-xl mb-7 overflow-hidden">
      <img class="w-full h-full object-cover scale-image cursor-pointer" src={product.image} alt="Product" />
    </div>

    <button class="w-min whitespace-nowrap font-bold text-fw-blue text-xl mb-6 block">
      {product.name}
    </button>
  </div>

<style>
  .red-text{
      color: white;
  }

  .button-red{
      background-color: red;
  }
</style>

  <div>
    <button class="w-min whitespace-nowrap font-light text-fw-darkgrey mb-3 block">
      {product.category}
    </button>
    
    <div class="flex items-center justify-between">
      <span class="font-light text-fw-darkgrey text-sm line-through">
        {product.price}
      </span>
      <div class="flex gap-1 items-center">
        <StarIcon />
        <span class="font-bold text-fw-gold text-sm items-center">
          {product.rating}
        </span>
      </div>
    </div>

    <span class="font-semibold text-2xl block mb-6 text-fw-red">
      {product.dicount}
    </span>

    <!-- Button that changes based on the inCart state -->
    {#if $inCart}
      <Button variant={ButtonVariant.PRIMARY} dClass="w-full red-text button-red" onClick={() => toggleCart(product)}>Rimuovi dal Carrello</Button>
    {:else}
      <Button variant={ButtonVariant.PRIMARY} dClass="w-full" onClick={() => toggleCart(product)}>Aggiungi al Carrello</Button>
    {/if}
  </div>
</div>

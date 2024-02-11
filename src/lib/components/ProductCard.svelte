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
      console.log(`Removing ${product.id} from cart`);
      // Remove the product from the shopping bag
      shoppingBag.update(bag => bag.filter(p => p.id !== product.id));
    } else {
      console.log(`Adding ${product.id} to cart`);
      // Check if the product already exists in the shopping bag
      shoppingBag.update(bag => {
        const existingProduct = bag.find(p => p.id === product.id);
        if (existingProduct) {
          // If the product exists, increase the quantity
          existingProduct.quantity += 1;
        } else {
          // If the product doesn't exist, add it to the shopping bag
          //@ts-ignore
          const price = parseFloat(product.price.replace(/[$,]/g, ''));
          bag.push({...product, quantity: 1, price});
        }
        return bag;
      });
    }
    return !value; // Toggle the inCart state
  });
};
</script>

<div id="product-card" class="h-full p-8 pb-10 flex flex-col shadow-sm bg-white rounded-lg justify-between">
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

    {#if $inCart}
      <Button variant={ButtonVariant.PRIMARY} dClass="w-full red-text button-red" onClick={() => toggleCart(product)}>Rimuovi dal Carrello</Button>
    {:else}
      <Button variant={ButtonVariant.PRIMARY} dClass="w-full" onClick={() => toggleCart(product)}>Aggiungi al Carrello</Button>
    {/if}
  </div>
</div>

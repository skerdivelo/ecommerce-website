<script lang="ts">
  import { Popover } from "flowbite-svelte";
  import { shoppingBag } from "$lib/stores/shoppingBag";
  import ShoppingBag from "./ShoppingBag.svelte";
  import cart from '../images/cart.png';

  export let triggeredBy: string;
</script>

  {#if $shoppingBag.length === 0}
    <Popover class="bg-white px-20 py-{$shoppingBag.length * 350}" {triggeredBy}>
      <img src={cart} alt="Cart" class="w-20 h-20 mx-auto mb-6" />
      <p>Your shopping bag is empty</p>
    </Popover>
  {:else}
    <Popover class="bg-white px-20 py-{$shoppingBag.length * 350}" {triggeredBy} style="position: relative; z-index: 9999;">
      {#each $shoppingBag as product (product.id)}
      <div class="product-detail">
        <!-- Display product details here, like an image, name, quantity, etc. -->
        <img src={product.image} alt={product.name} class="product-image" />
        <div class="product-info">
          <p>{product.name}</p>
          <p>Quantità: {product.quantity}</p>
          <!-- Add more product details as needed -->
        </div>
      </div>
    {/each}    
    </Popover>
  {/if}

<style>
.product-detail {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eaeaea; /* Light grey border for each product item */
  z-index: 9999;
}

.product-image {
  width: 90px; /* Adjust the size as needed */
  height: 90px; /* Adjust the size as needed */
  object-fit: cover;
  /* put the image on top of everything so it doesn't gets drown by text */
  z-index: 9999;
  margin-right: 15px; /* Space between the image and the product info */
  border-radius: 8px; /* Optional: Rounds the corners of the image */
}

.product-info {
  display: flex;
  flex-direction: column;
  z-index: 9999;
}

.product-info p {
  margin: 0; /* Removes default margin from paragraphs */
  padding: 2px 0; /* Adds a little space between the product name and quantity */
  font-size: 0.9rem; /* Adjust text size as needed */
  color: #333; /* Dark grey color for text */
  z-index: 9999;
}

/* Optionally, you can add styles for the last product-detail to remove the bottom border */
.product-detail:last-child {
  border-bottom: none;
  z-index: 9999;
}

</style>
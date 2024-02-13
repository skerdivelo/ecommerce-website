<script lang="ts">
  import { Popover } from "flowbite-svelte";
  import { shoppingBag } from "$lib/stores/shoppingBag";
  import cart from '../images/cart.png';
  import Button from "./Button.svelte";
  import { ButtonVariant } from "../../types/Button";
  import { goto } from "$app/navigation";

  export let triggeredBy: string;
</script>

{#if $shoppingBag.length === 0}
  <Popover class="bg-white px-20 py-20" {triggeredBy}> <!-- Adjusted padding to be constant -->
    <img src={cart} alt="Cart" class="w-20 h-20 mx-auto mb-6" />
    <p>Il Carello è vuoto</p>
  </Popover>
{:else}
  <Popover class="bg-white px-20 py-20" {triggeredBy} style="position: relative; z-index: 9999;"> <!-- Adjusted padding to be constant -->
    {#each $shoppingBag.slice(0, 3) as product (product.id)}
      <div class="product-detail">
        <img src={product.image} alt={product.name} class="product-image" />
        <div class="product-info">
          <p>{product.name}</p>
          <p>Quantità: {product.quantity}</p>
        </div>
      </div>
    {/each}
    {#if $shoppingBag.length > 3}
      <div class="more-products-indicator">...</div>
    {/if}
    <Button variant={ButtonVariant.PRIMARY} dClass="w-full" onClick={() => goto('/shopping-bag')}>Vai al Carello</Button>
  </Popover>
{/if}

<style>
.product-detail {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eaeaea; /* Light grey border for each product item */
}

.product-image {
  width: 90px; /* Adjust the size as needed */
  height: 90px; /* Adjust the size as needed */
  object-fit: cover;
  margin-right: 15px; /* Space between the image and the product info */
  border-radius: 8px; /* Optional: Rounds the corners of the image */
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-info p {
  margin: 0; /* Removes default margin from paragraphs */
  padding: 2px 0; /* Adds a little space between the product name and quantity */
  font-size: 0.9rem; /* Adjust text size as needed */
  color: #333; /* Dark grey color for text */
}

.product-detail:last-child {
  border-bottom: none;
}

.more-products-indicator {
  text-align: center;
  font-size: 24px; /* Adjust the size as needed */
  padding: 10px 0; /* Adjust the padding as needed */
}
</style>

<script lang="ts">
    import { shoppingBag } from "$lib/stores/shoppingBag";
    import type { Product } from '../../types/Product';

    let products: Product[] = [];

    // Subscribe to the shoppingBag store
    shoppingBag.subscribe(value => {
        products = value;
    });

    // Function to increase the quantity of a product
    function increaseQuantity(product: Product) {
        shoppingBag.update(bag => {
            const productIndex = bag.findIndex(p => p.name === product.name);
            if (productIndex !== -1) {
                bag[productIndex].quantity++;
            }
            return [...bag];
        });
    }

    // Function to decrease the quantity of a product
    function decreaseQuantity(product: Product) {
        shoppingBag.update(bag => {
            const productIndex = bag.findIndex(p => p.name === product.name);
            if (productIndex !== -1 && bag[productIndex].quantity > 1) {
                bag[productIndex].quantity--;
            }
            return [...bag];
        });
    }

    // Compute the total price
    $: totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
</script>

<!-- Display the products in the shopping bag -->
{#each products as product (product.name)}
    <div>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>Price: {product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <button on:click={() => increaseQuantity(product)}>+</button>
        <button on:click={() => decreaseQuantity(product)}>-</button>
    </div>
{/each}

<!-- Display the total price -->
<p>Total price: {totalPrice}</p>
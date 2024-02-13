<script lang="ts">
    import { shoppingBag } from "$lib/stores/shoppingBag";
    import { goto } from "$app/navigation";
    import type { Product } from '../../types/Product';
    import cart from "$lib/images/cart.png";
    import Spinner from "./Spinner.svelte";

    let products: Product[] = [];
    let loading = false;

    shoppingBag.subscribe(value => {
        products = value;
    });

    // Function to increase the quantity of a product
    function increaseQuantity(product: Product) {
        shoppingBag.update(bag => {
            const productIndex = bag.findIndex(p => p.id === product.id);
            if (productIndex !== -1) {
                bag[productIndex].quantity++;
            }
            return [...bag];
        });
    }

    // Function to remove a product
    function removeProduct(product: Product) {
        shoppingBag.update(bag => {
            const productIndex = bag.findIndex(p => p.id === product.id);
            if (productIndex !== -1) {
                bag.splice(productIndex, 1);
            }
            return [...bag];
        });
    }

    // Function to decrease the quantity of a product
    function decreaseQuantity(product: Product) {
        shoppingBag.update(bag => {
            const productIndex = bag.findIndex(p => p.id === product.id);
            if (productIndex !== -1) {
                if (bag[productIndex].quantity > 1) {
                    bag[productIndex].quantity--;
                } else {
                    //@ts-ignore
                    bag[productIndex].removed = true;
                    setTimeout(() => {
                        removeProduct(product);
                    }, 2000); // Remove the product after 2 seconds
                }
            }
            return [...bag];
        });
    }

    function compraTutto() {
        loading = true;
        setTimeout(() => {
            shoppingBag.update(bag => {
                bag = [];
                return bag;
            });
            loading = false;
            goto('/payment');
        }, 2000); // Show the spinner for 2 seconds before redirecting
    }

    // Compute the total price
    $: totalPrice = products.reduce((total, product) => total + (product.price || 0) * (product.quantity || 0), 0);
</script>

<style>
    :global(body) {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
        color: #333;
    }

    .product {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        transition: box-shadow 0.3s ease;
    }

    .product:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .product img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 20px;
    }

    .product-details {
        flex-grow: 1;
    }

    .product h2 {
        margin: 0;
        color: #333;
        font-size: 24px;
    }

    .product p {
        font-size: 18px;
        color: #666;
        margin: 5px 0 20px;
    }

    .button-group {
        display: flex;
        align-items: center;
    }

    .increase-button, .decrease-button {
        border: none;
        height: 40px;
        width: 40px;
        text-align: center;
        border-radius: 20px;
        font-weight: bold;
        color: #fff;
        margin: 0 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .increase-button {
        background-color: #28a745;
    }

    .increase-button:hover {
        background-color: #218838;
    }

    .decrease-button {
        background-color: #dc3545;
    }

    .decrease-button:hover {
        background-color: #c82333;
    }

    .quantity {
        font-size: 18px;
        width: 40px;
        text-align: center;
    }

    .total-price {
        font-size: 20px;
        font-weight: bold;
        text-align: right;
        margin-top: 20px;
    }

    .empty-bag {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh; /* Adjust as needed */
        text-align: center;
    }

    .empty-bag img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin-bottom: 20px;
    }

    .empty-bag p {
        font-size: 24px;
        color: #666;
    }

    .product.removed {
        animation: smoke 0.6s ease forwards;
    }

    .acquista-tutto-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 120px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 40px;
    }

    .acquista-tutto-button:hover {
        background-color: #218838;
    }

    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    @keyframes smoke {
        0% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-10px); }
    }
</style>

<div>
    {#if $shoppingBag.length === 0}
        <div class="empty-bag">
            <img src={cart} alt="Empty bag" />
            <p>Il Carello è vuoto.</p>
        </div>
    {:else}
        {#each $shoppingBag as product (product.id)}
            <div class="product {product.removed ? 'removed' : ''}">
                <img src={product.image} alt={product.name} />
                <div class="product-details">
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <div class="button-group">
                        <button class="increase-button" on:click={() => increaseQuantity(product)}>+</button>
                        <span class="quantity">{product.quantity}</span>
                        <button class="decrease-button" on:click={() => decreaseQuantity(product)}>-</button>
                    </div>
                </div>
            </div>
        {/each}

        <p class="total-price">Total Price: ${totalPrice}</p>

        {#if loading}
            <div class="spinner-container">
                <Spinner />
            </div>
        {:else}
            <button class="acquista-tutto-button" on:click={compraTutto}>Ordina</button>
        {/if}
    {/if}
</div>

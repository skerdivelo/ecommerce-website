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
</style>

<div>
    {#each products as product (product.name)}
        <div class="product">
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
</div>

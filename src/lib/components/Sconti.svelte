<script lang="ts">
    import { products } from "$lib/data/products";
    let allProducts = products;
</script>

<style>
    .products-grid {
        margin-bottom: 120px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
        padding: 2rem;
        background: linear-gradient(to bottom, #f9f9f9 0%, #fff 100%);
    }

    .product-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: auto;
        border: none;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        background: #ffffff; 
        overflow: hidden; 
    }

    .product-card:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }

    .product-card img {
        width: auto;
        height: 60%;
        transition: transform 0.3s ease;
        margin-bottom: 2rem;
        object-fit: cover; 
    }

    .product-card:hover img {
        transform: scale(1.1); 
    }

    .product-card h2 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: #333;
        transition: color 0.3s ease;
    }

    .product-card:hover h2 {
        color: #007bff; 
    }

    .product-card p {
        margin: 0.5rem 0;
        color: #666;
    }

    .product-card p:first-of-type {
        color: #333;
        font-weight: bold;
    }

    .discount {
        color: red;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (max-width: 768px) {
        .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }

    @media (max-width: 576px) {
        .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>

<div class="products-grid">
    {#each allProducts as product (product.id)}
        <div class="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p class="discount">Sconto: {product.dicount}</p>
            <p class="font-light text-fw-darkgrey text-sm line-through">Prezzo: {product.price}</p>
            <p>Valutazione: <span style="color: orange; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">{product.rating}</span></p>
        </div>
    {/each}
</div>
<script lang="ts">
    import { products } from "$lib/data/products";
    let watches = products.filter(product => product.category === "Orologi");
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
        background: #ffffff; /* Solid white background */
        overflow: hidden; /* Ensures nothing overflows the rounded borders */
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
        object-fit: cover; /* Ensures the image maintains aspect ratio and covers the container */
    }

    .product-card:hover img {
        transform: scale(1.1); /* Slightly enlarges the image on hover */
    }

    .product-card h2 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: #333;
        transition: color 0.3s ease;
    }

    .product-card:hover h2 {
        color: #007bff; /* Changes the title color on hover for a dynamic effect */
    }

    .product-card p {
        margin: 0.5rem 0;
        color: #666;
    }

    .product-card p:first-of-type {
        color: #333;
        font-weight: bold;
    }

    /* Responsive Styles */
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
    {#each watches as watch (watch.id)}
        <div class="product-card">
            <img src={watch.image} alt={watch.name} />
            <h2>{watch.name}</h2>
            <p>Sconto: {watch.dicount}</p> <!-- Corrected typo 'dicount' to 'discount' -->
            <p class="font-light text-fw-darkgrey text-sm line-through">Prezzo: {watch.price}</p>
            <p>Valutazione: <span style="color: orange; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">{watch.rating}</span></p> <!-- Makes the watch.rating yellow with shadow -->
        </div>
    {/each}
</div>

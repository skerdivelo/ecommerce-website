<script>
    let date = new Date();
    date.setDate(date.getDate() + 2);
    let deliveryDate = date.toLocaleDateString();
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
    }

    h1, h2 {
        color: #333;
    }

    .delivery-date {
        margin-top: 20px;
        font-size: 1.2em;
        color: #666;
    }
</style>

<div class="container">
    <h1>Ordine effettuato con successo</h1>
    <h2>Grazie per aver usato il nostro store</h2>
    <p class="delivery-date">L'ordine verrà consegnato il giorno {deliveryDate}</p>
</div>
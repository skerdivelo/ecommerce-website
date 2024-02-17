<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let countdown = 99999;
    const calculateDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date.toLocaleDateString();
    };

    let deliveryDate = calculateDeliveryDate();

    onMount(() => {
        const intervalId = setInterval(() => {
            countdown--;
            if (countdown === 0) {
                clearInterval(intervalId);
                goto('/home');
            }
        }, 1000);
    });
</script>

<style>
    .container {
        display: flex;
        position: relative;
        margin-left: 185px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
        background: #FAFAFA;
        color: #333;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        text-align: center;
    }

    .container * {
        text-align: center;
    }

    h1, h2 {
        margin: 0.5em 0;
    }

    .delivery-date {
        margin-top: 20px;
        font-size: 1.1rem;
        color: #555;
        background-color: #EFEFEF;
        border-radius: 8px;
        padding: 10px 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>

<main class="container">
    <header>
        <h1>Ordine effettuato con successo</h1>
        <h2>Grazie per aver acquistato da noi</h2>
    </header>
    <p class="delivery-date">Il tuo ordine sarà consegnato il {deliveryDate}</p>
    <p>Verrai reindirizzato alla home page in {countdown} secondi...</p>
</main>
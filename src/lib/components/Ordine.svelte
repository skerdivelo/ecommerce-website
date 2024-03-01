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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
    }

    .order{
        font-size: 3rem;
        margin: 1rem 0;
    }

    .delivery-date {
        font-size: 1.5rem;
        margin: 1rem 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 10px;
    }

    .redirect{
        font-size: 1.5rem;
        margin: 1rem 0;
        margin-bottom: 5rem;
    }
</style>

<div class="container">
        <h1 class="order">Ordine effettuato con successo</h1>
        <h2>Grazie per aver acquistato da noi</h2>
        <p class="delivery-date">Il tuo ordine sarà consegnato il {deliveryDate}</p>
        <p class="redirect">Verrai reindirizzato alla home page in {countdown} secondi...</p>
</div>
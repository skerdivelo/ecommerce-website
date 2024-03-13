<script lang="ts">
    import { shoppingBag, getShoppingBag } from "$lib/stores/shoppingBag";
    import Spinner from "./Spinner.svelte";
    import { goto } from "$app/navigation";
    import visa from '$lib/images/visa.png';
    import mastercard from '$lib/images/mastercard.png';
    import amex from '$lib/images/amex.png';
    import discover from '$lib/images/discover.png';

    let name = '';
    let surname = '';
    let city = '';
    let phoneNumber = '';
    let email = '';
    let creditCardNumber = '';
    let expiryDate = '';
    let cvv = '';

    let isFormFilled = false;

    let expiryDateError = '';

const validateExpiryDate = () => {
    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (Number(month) < 1 || Number(month) > 12) {
        expiryDateError = 'Il mese deve essere compreso tra 1 e 12.';
    } else if (Number(year) < Number(currentYear) || (Number(year) == Number(currentYear) && Number(month) < Number(currentMonth))) {
        expiryDateError = 'La carta è scaduta.';
    } else {
        expiryDateError = '';
    }
};

    const formatPhoneNumber = () => {
        phoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 10);
    };

    const formatExpiryDate = () => {
        expiryDate = expiryDate.replace(/\D/g, '').slice(0, 4);
        if (expiryDate.length > 2) {
            expiryDate = expiryDate.slice(0, 2) + '/' + expiryDate.slice(2);
        }
    };

    const formatCVV = () => {
        cvv = cvv.replace(/\D/g, '').slice(0, 3);
    };

    //@ts-ignore
    const filterText = (text) => {
        return text.replace(/\d/g, '');
    };

    let creditCardType = '';

    const detectCardType = (number: string) => {
        const cardPatterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6(?:011|5[0-9]{2})/,
        };

        for (const [type, pattern] of Object.entries(cardPatterns)) {
            if (number.match(pattern)) {
                return type;
            }
        }

        return '';
    };

    const formatCreditCardNumber = () => {
        let formattedNumber = creditCardNumber.replace(/\D/g, '').slice(0, 16);
        formattedNumber = formattedNumber.replace(/(.{4})/g, '$1-');
        creditCardNumber = formattedNumber.endsWith('-') ? formattedNumber.slice(0, -1) : formattedNumber;
        creditCardType = detectCardType(creditCardNumber);
    };

    const currentDateTime = new Date();
    const mysqlDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', ' ');
    let loading = false;
    let totalPrice = 0;
    let timeOfPurchase;
    let dateOfPurchase;
    let shippingDate; //+2 days from dateOfPurchase
    const submitForm = async () => {
        loading = true;
        let order;
        getShoppingBag().subscribe(items => {
            order = items.map(item => ({ id: item.id, quantity: item.quantity }));
            totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        });
        timeOfPurchase = new Date().toISOString().slice(0, 19).replace('T', ' ');
        dateOfPurchase = new Date().toISOString().slice(0, 19).replace('T', ' ');
        shippingDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
        const user = { name, surname, email };
        const data = { user, order, totalPrice, timeOfPurchase, dateOfPurchase, shippingDate};
        console.log(totalPrice);
        console.table(data);

        const response = await fetch('http://localhost:3000/api/pagamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Ordine inviato con successo');
            shoppingBag.update(() => []);
            setTimeout(() => {
                loading = false;
                goto('/ordine');
            }, 2000);
        } else {
            console.error('Errore nell\'invio dell\'ordine');
            alert('Errore nell\'invio dell\'ordine');
            goto('/home');
        }
    };

    $: isFormFilled = !!name && !!surname && !!city && !!phoneNumber && !!email && !!creditCardNumber && !!expiryDate && !!cvv && !expiryDateError;

    $: name = filterText(name);
    $: surname = filterText(surname);
    $: city = filterText(city);
    $: expiryDate && validateExpiryDate();
</script>

<style>
    @import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';

    :global(body) {
        font-family: 'Poppins', sans-serif;
    }

    .form-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .form-title {
        margin-bottom: 2rem;
        text-align: center;
        color: #374151;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        color: #6b7280;
    }

    .form-input {
        display: block;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        &:focus {
            outline: 2px solid #60a5fa;
        }
    }

    .credit-card-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        height: calc(100% - 2px);
        width: auto;
    }

    .submit-btn {
        display: block;
        width: 100%;
        padding: 0.75rem;
        margin-top: 1rem;
        border: none;
        border-radius: 8px;
        color: #fff;
        background-color: #3b82f6;
        cursor: pointer;
        &:hover {
            background-color: #2563eb;
        }
    }

    .submit-btn:disabled {
        background-color: #9CA3AF;
        cursor: not-allowed;
    }

    .form-input {
        display: block;
        width: 100%;
        padding: 0.75rem;
        border: 2px solid transparent;
        border-radius: 8px;
        background-color: #f7f7f7; 
        transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        color: #333;
    }

    .form-input:focus {
        outline: none;
        border: 2px solid #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
</style>

<div class="form-container">
    <h2 class="form-title">Informazioni di Pagamento</h2>
    <div class="form-group">
        <label class="form-label" for="name">Nome</label>
        <input class="form-input" type="text" id="name" bind:value={name}>
    </div>
    <div class="form-group">
        <label class="form-label" for="surname">Cognome</label>
        <input class="form-input" type="text" id="surname" bind:value={surname}>
    </div>
    <div class="form-group">
        <label class="form-label" for="city">Città</label>
        <input class="form-input" type="text" id="city" bind:value={city}>
    </div>
    <div class="form-group">
        <label class="form-label" for="phoneNumber">Numero di Telefono</label>
        <input class="form-input" type="tel" id="phoneNumber" bind:value={phoneNumber} on:input={formatPhoneNumber}>
    </div>
    <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input class="form-input" type="email" id="email" bind:value={email}>
    </div>
    <div class="form-group">
        <label class="form-label" for="creditCardNumber">Numero di Carta di Credito</label>
        <div style="position: relative;">
            <input class="form-input" type="text" id="creditCardNumber" bind:value={creditCardNumber} on:input={formatCreditCardNumber}>
            {#if creditCardType === 'visa'}
                <img class="credit-card-icon" src={visa} alt="Visa">
            {:else if creditCardType === 'mastercard'}
                <img class="credit-card-icon" src={mastercard} alt="Mastercard">
            {:else if creditCardType === 'amex'}
                <img class="credit-card-icon" src={amex} alt="Amex">
            {:else if creditCardType === 'discover'}
                <img class="credit-card-icon" src={discover} alt="Discover">
            {/if}
        </div>
    </div>
    <div class="form-group">
        <label class="form-label" for="expiryDate">Data di Scadenza</label>
        <input class="form-input" type="text" id="expiryDate" placeholder="MM/YY" bind:value={expiryDate} on:input={formatExpiryDate}>
        {#if expiryDateError}<p>{expiryDateError}</p>{/if}
    </div>
    <div class="form-group">
        <label class="form-label" for="cvv">CVV</label>
        <input class="form-input" type="text" id="cvv" bind:value={cvv} on:input={formatCVV}>
    </div>
    <button class="submit-btn" on:click={submitForm} disabled={!isFormFilled}>
        {#if loading}
            <Spinner />
        {:else}
            Paga
        {/if}
    </button>
</div>
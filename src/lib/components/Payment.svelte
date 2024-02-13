<script>
    let name = '';
    let surname = '';
    let city = '';
    let phoneNumber = '';
    let email = '';
    let creditCardNumber = '';
    let expiryDate = '';
    let cvv = '';

    let isFormFilled = false;

    $: isFormFilled = !!name && !!surname && !!city && !!phoneNumber && !!email && !!creditCardNumber && !!expiryDate && !!cvv;

    const submitForm = () => {
        // Implement form submission logic here
        console.log({ name, surname, city, phoneNumber, email, creditCardNumber, expiryDate, cvv });
    };

    const formatPhoneNumber = () => {
        phoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 10);
    };

    const formatCreditCardNumber = () => {
        let formattedNumber = creditCardNumber.replace(/\D/g, '').slice(0, 16);
        formattedNumber = formattedNumber.replace(/(.{4})/g, '$1-');
        creditCardNumber = formattedNumber.endsWith('-') ? formattedNumber.slice(0, -1) : formattedNumber;
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

    $: name = filterText(name);
    $: surname = filterText(surname);
    $: city = filterText(city);
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
    .form-input {
        display: block;
        width: 100%;
        padding: 0.75rem;
        border: 2px solid transparent;
        border-radius: 8px;
        background-color: #f7f7f7; /* change this to your desired input field color */
        transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        color: #333; /* change this to your desired input text color */
    }

    .form-input:focus {
        outline: none;
        border: 2px solid #3b82f6; /* change this to your desired input field focus border color */
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); /* change this to your desired input field focus shadow color */
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
        <input class="form-input" type="text" id="creditCardNumber" bind:value={creditCardNumber} on:input={formatCreditCardNumber}>
    </div>
    <div class="form-group">
        <label class="form-label" for="expiryDate">Data di Scadenza</label>
        <input class="form-input" type="text" id="expiryDate" placeholder="MM/YY" bind:value={expiryDate} on:input={formatExpiryDate}>
    </div>
    <div class="form-group">
        <label class="form-label" for="cvv">CVV</label>
        <input class="form-input" type="text" id="cvv" bind:value={cvv} on:input={formatCVV}>
    </div>
    <button class="submit-btn" on:click={submitForm} disabled={!isFormFilled}>Paga</button>
</div>
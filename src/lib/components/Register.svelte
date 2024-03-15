<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    let name = '';
    let surname = '';
    let indirizzo = '';
    let numero_telefono = '';
    let email = '';
    let confirmEmail = '';
    let password = '';
    let confirmPassword = '';
    async function handleRegister() {
        if (email !== confirmEmail) {
            console.log('Emails do not match');
            return;
        }
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name, surname, indirizzo, numero_telefono})
        });
        const data = await response.text();
        console.log(data);
        goto('/login');
    }
</script>

<div class="form-container bg-white shadow-md rounded-lg px-8 py-10 mt-0 mb-20 pt-20 pb-8 max-w-md mx-auto">
    <h2 class="form-title mb-6 text-3xl font-bold text-center text-gray-800">Register</h2>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="name">Name</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" bind:value={name} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="surname">Surname</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="surname" bind:value={surname} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="email">Email</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" bind:value={email} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="confirmEmail">Confirm Email</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="confirmEmail" bind:value={confirmEmail} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="password">Password</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" bind:value={password} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="confirmPassword">Confirm Password</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="confirmPassword" bind:value={confirmPassword} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="indirizzo">Address</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="indirizzo" bind:value={indirizzo} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="numero_telefono">Phone Number</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="tel" id="numero_telefono" bind:value={numero_telefono} required>
    </div>
    <button class="submit-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline" on:click={handleRegister}>Register</button>
    <div class="text-center mt-4">
        <a href="/login" class="text-blue-500 hover:text-blue-600 text-lg font-semibold underline">Already have an account? Login</a>
    </div>
</div>
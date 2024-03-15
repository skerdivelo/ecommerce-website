<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    let email = '';
    let password = '';
    async function handleLogin() {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.text();
        console.log(data);
        goto('/home');
    }
</script>

<div class="form-container bg-white shadow-md rounded-lg px-8 py-10 mt-20 mb-20 pt-20 pb-8 max-w-md mx-auto">
    <h2 class="form-title mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="email">Email</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" bind:value={email} required>
    </div>
    <div class="form-group mb-6">
        <label class="form-label block text-gray-600 text-sm font-semibold mb-2" for="password">Password</label>
        <input class="form-input shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" bind:value={password} required>
    </div>
    <div class="mt-4 mb-4">
        <a href="/forgot-password" class="text-blue-500 hover:text-blue-600">Forgot your password?</a>
    </div>
    <button class="submit-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline" on:click={handleLogin}>Login</button>
    <div class="text-center mt-4">
        <a href="/register" class="text-blue-500 hover:text-blue-600 text-lg font-semibold underline">Don't have an account yet?</a>
    </div>
</div>
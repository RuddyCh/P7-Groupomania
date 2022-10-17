<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: 'abc@free.com',
            password: '123456',
            hasInvalidCredentials: false,
            error: null
        }
    },
    methods: {
        SubmitForm() {
            const { VITE_SERVER_ADRESS, VITE_SERVER_PORT } = import.meta.env; // Get env variables
            const url = 'http://' + VITE_SERVER_ADRESS + ':' + VITE_SERVER_PORT + '/auth/login'; // Build url
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }; // Build options
            fetch(url, options)
                .then((res) => {
                    if (res.ok) return res.json()
                    res.text().then((err) => {
                        const { error } = JSON.parse(err)
                        this.error = error
                        throw new Error(error)
                    })
                })
                .then((res) => {
                    this.$swal({
                        title: 'Success!',
                        text: 'You have successfully logged in!',
                        icon: 'success',
                        iconColor: '#FD2D01',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#FD2D01'
                    }) // Show success message
                    .then(() => {
                        const token = res.token; // Get token
                        localStorage.setItem('token', token); // store token in local storage
                        location.replace('/home'); // Redirect to home page
                    })
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        isFormValid(bool) {
            this.hasInvalidCredentials = !bool; // show error message if form is not valid
        },
    },
    watch: {
        email(value) {
            const isValueEmpty = value === ""; // check if email is empty
            this.isFormValid(!isValueEmpty); // check if form is valid
            this.error = null; // reset error message
        },
        password(value) {
            const isValueEmpty = value === ""; // check if password is empty
            this.isFormValid(!isValueEmpty); // check if form is valid
            this.error = null // reset error message
        }
    }
}
</script>
<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
</script>

<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-16 w-auto"
                    src="../../img/logo/icon-groupomania.webp" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6" :class="this.hasInvalidCredentials ? 'hasErrors' : ''" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required="true" v-model="email" @invalid="markFormInvalid"
                            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-light focus:outline-none focus:ring-primary-light sm:text-sm"
                            placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required="true" v-model="password" @invalid="markFormInvalid"
                            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-light focus:outline-none focus:ring-primary-light sm:text-sm"
                            placeholder="Password" />
                    </div>
                </div>
                <div v-if="hasInvalidCredentials" class="errorMessage">Veuillez remplir tous les champs requis</div>
                <div v-if="!hasInvalidCredentials && error" class="errorMessage">{{error}}</div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-primary-default focus:ring-primary-light" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>

                    <div class="text-sm">
                        <p>New here ? <router-link to="/register" class="font-medium text-primary-default hover:text-primary-light">Create account</router-link></p>
                    </div>
                </div>

                <div>
                    <button type="submit" @click.prevent="SubmitForm" :disabled="hasInvalidCredentials"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-default py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-primary-verydark group-hover:text-primary-default" aria-hidden="true" />
                        </span>
                        <router-link to="/home">Sign in</router-link>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.hasErrors #email-address {
    border-color: red;
}

.hasErrors #password {
    border-color: red;
}
.errorMessage {
    color: red;
}
</style>
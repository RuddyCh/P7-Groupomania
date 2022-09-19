<script>
export default {
    name: 'AppNavbar',
    Data() {
        return {
            isLoggedIn: false
        }
    },
    created() {
        const token = localStorage.getItem('token');
        if (token != null) {
            this.isLoggedIn = true;
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token');
            this.$router.go('/login');
        }
    }
}
</script>
<script setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
    Bars3Icon,
} from '@heroicons/vue/24/outline'
</script>


<template>
    <header class="mb-6 border-b-4 border-secondary-dark">
        <Popover class="relative dark:bg-black">
            <div class="mx-auto max-w-full px-4 sm:px-6">
                <div
                    class="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <div class="flex justify-start lg:w-0 lg:flex-1">
                        <router-link to="/home" class="focus:outline-none rounded focus:ring-2 focus:ring-black focus:ring-offset-2">
                            <span class="sr-only">Workflow</span>
                            <img class="h-8 w-auto sm:h-10"
                                src="../../../logo.webp" alt="" />
                        </router-link>
                    </div>
                    <div class="-my-2 -mr-2 md:hidden">
                        <PopoverButton
                            class="inline-flex items-center justify-center rounded-md bg-primary-default dark:bg-black p-2 text-tertiary-default hover:bg-primary-dark hover:text-tertiary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light">
                            <span class="sr-only">Open menu</span>
                            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                        </PopoverButton>
                    </div>
                    <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
                        <router-link to="/home"
                            class="text-base font-medium text-white hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 rounded hover:border-b-4 hover:border-primary-default border-b-4 border-transparent">Home
                        </router-link>
                        <router-link to="/contact"
                            class="text-base font-medium text-white hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 rounded hover:border-b-4 hover:border-primary-default border-b-4 border-transparent">
                            Contact</router-link>
                    </PopoverGroup>
                    <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <router-link @click="logOut" to="" v-if="isLoggedIn"
                            class="whitespace-nowrap text-base font-medium text-white hover:text-primary-default border-primary-light hover:border-primary-dark border-b-2 focus:rounded focus:ring-black focus:ring-offset-6 focus:ring-2 focus:outline-none">
                            Logout</router-link>
                        <router-link to="/login" v-if="!isLoggedIn"
                            class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-default px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">
                            Login</router-link>
                    </div>
                </div>
            </div>

            <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                <PopoverPanel
                    class="z-10 absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div
                        class="divide-y-2 divide-gray-50 rounded-lg bg-tertiary-default border-secondary-default border-2 dark:bg-black shadow-lg ring-1 ring-primary-default ring-opacity-5">
                        <div class="space-y-6 py-6 px-5">
                            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                                <router-link to="/home"
                                    class="text-base dark:text-tertiary-light font-medium text-white hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 hover:underline hover:underline-offset-4 hover:decoration-primary-default">
                                    Home</router-link>
                                <router-link to="/contact"
                                    class="text-base dark:text-tertiary-light font-medium text-white hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 hover:underline hover:underline-offset-4 hover:decoration-primary-default">
                                    Contact
                                </router-link>
                            </div>
                            <div>
                                <router-link to="/login" v-if="!isLoggedIn"
                                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-default px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark">
                                    Login</router-link>
                                <p class="mt-6 text-center text-base font-medium text-white">
                                    Already connected ?
                                    {{ ' ' }}
                                    <router-link @click="logOut" to="/" v-if="isLoggedIn"
                                        class="text-primary-default hover:text-primary-light">
                                        Logout</router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </PopoverPanel>
            </transition>
        </Popover>
    </header>
</template>

<style scoped></style>
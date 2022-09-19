<script>
    import { headers } from './../../services/fetchOptions';
    import WallPage from './../../pages/wall/WallPage.vue';
    
    export default {
        components: {
            WallPage
        },
        data() {
            return {
                content: "",
                selectedImage: null, // image file
            };
        },
        methods: {
            handleNewFile(e) {
                this.selectedImage = e.target.files[0]; // FileList object

            },
            handleClick() {
                const postId = this.$route.params.id;
                console.log("postId :", postId);
                const { VITE_SERVER_ADRESS, VITE_SERVER_PORT } = import.meta.env; // Get env variables
                const url = 'http://' + VITE_SERVER_ADRESS + ':' + VITE_SERVER_PORT + '/posts' + '/' + postId;
                console.log('url :', url);
                const formData = new FormData(); // Create form data
                formData.append('content', this.content); // Append content
                formData.append('image', this.selectedImage); // Append image

                const options = {
                    headers,
                    method: 'PUT',
                    body: formData
                }; // Build options
                fetch(url, options)
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json(); // Return json if status is 200
                        }
                        else {
                            throw new Error('Error while fetching posts');
                        }
                    })
                    .then(() => {
                        this.$router.push("/home"); // Redirect to home page
                    })
                    .catch((err) => console.log('err :', err));
            }
        }
    }
</script>

<script setup>
import {
    PhotoIcon,
} from '@heroicons/vue/20/solid'

import Avatar from '../../components/ui/Avatar.vue';
</script>

<template>
    <div class="flex items-start space-x-4">
        <Avatar></Avatar>
        <div class="min-w-0 flex-1">
            <form action="#" class="relative">
                <div
                    class="overflow-hidden rounded-lg border border-secondary-default shadow-sm focus-within:border-primary-light focus-within:ring-1 focus-within:ring-primary-light">
                    <label for="comment" class="sr-only">Add your comment</label>
                    <textarea rows="3" name="comment" id="comment" v-model="content"
                        class="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                        placeholder="Add your comment..."></textarea>

                    <!-- Spacer element to match the height of the toolbar -->
                    <div class="pb-2" aria-hidden="true">
                        <!-- Matches height of button in toolbar (1px border + 36px content height) -->
                        <div class="py-px">
                            <div class="h-9" />
                        </div>
                    </div>
                </div>

                <div class="absolute inset-x-0 bottom-0 flex justify-between pb-2 pl-3 pr-2">
                    <div class="flex items-center space-x-5">
                        <div class="flex items-center">
                            <label for="file-input"
                                class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                <PhotoIcon class="h-5 w-5 text-tertiary-default hover:text-tertiary-dark cursor-pointer"
                                    aria-hidden="true" />
                                <span class="sr-only">Attach a file</span>
                            </label>
                            <input id="file-input" type="file" class="hidden" @change="handleNewFile" />
                            <!-- <img v-if="selectedImage" :src="selectedImage" alt="image selected" /> -->
                            <span v-if="selectedImage" class="ml-2 mb-1">{{selectedImage.name}}</span>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <button type="button" @click="handleClick"
                            class="inline-flex items-center rounded-md border border-transparent bg-primary-default px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">Post</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
<script>
import Comment from './Comment.vue';
import Avatar from '../Avatar.vue';
import { url, headers } from './../../../services/fetchOptions';
    export default {
        name: 'Card',
        components: {
            Comment,
            Avatar
        },
        props: {
            email: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            url: {
                type: [String, null],
                required: true
            },
            comments: {
                type: Array,
                required: true
            },
            likes: {
                type: Number,
                required: true
            },
            id: {
                type: Number,
                required: true
            },
            currentUser: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                currentComment: null,
                admin: import.meta.env.VITE_ADMIN,
                countOfLikes: this.likes.length,
            }
        },
        mounted() {},
        methods: {
            addComment(e) {
                const options = {
                    headers: {...headers, 'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({
                        comment: this.currentComment,
                    })
                };
                fetch(url + "/" + this.$props.id, options)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error('Error while fetching posts');
                    }
                })
                .then((res) => {
                    this.$router.go();
                })
                .catch((err) => console.log("err :", err));
            },
            deletePost(e) {
                fetch(url + "/" + this.$props.id, {
                    headers: {...headers, 'Content-Type': 'application/json'},
                    method: 'DELETE',
                })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error('Failed to delete post');
                    }
                })
                .then((res) => {
                    this.$router.go();
                })
                .catch((err) => console.log("err :", err));
            },
            likePost(e) {
                fetch(url + "/" + this.$props.id + "/like", {
                    headers: {...headers, 'Content-Type': 'application/json'},
                    method: 'POST',
                })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error('Failed to like post');
                    }
                })
                .then((res) => {
                    this.$router.go();
                })
                .catch((err) => console.log("err :", err));
            },
        },
    }
</script>

<template>
    <div class="max-w-5xl m-auto rounded overflow-hidden shadow-lg mb-4 border-secondary-default border-opacity-60 border-2">
        <div>
            <i v-if="currentUser === email" class="fa-solid fa-trash-can cursor-pointer text-xl text-tertiary-default hover:text-primary-default float-right m-3 hover:scale-110" @click="deletePost"></i>
            <router-link :to="`/edit/${this.$props.id}`">
            <i v-if="currentUser === email" class="fa-solid fa-pen-to-square cursor-pointer text-xl text-tertiary-default hover:text-primary-default float-right m-3 hover:scale-110"></i>
            </router-link>
            <i v-if="currentUser === admin"
                class="fa-solid fa-trash-can cursor-pointer text-xl text-tertiary-default hover:text-primary-default float-right m-3 hover:scale-110"
                @click="deletePost"></i>
            <router-link :to="`/edit/${this.$props.id}`">
            <i v-if="currentUser === admin"
                    class="fa-solid fa-pen-to-square cursor-pointer text-xl text-tertiary-default hover:text-primary-default float-right m-3 hover:scale-110"></i>
            </router-link>
        </div>
        <Avatar></Avatar>
        <div class="min-w-0 flex-1 mb-4 px-4">
            <p class="text-sm font-medium text-tertiary-dark">
                <a href="#" class="hover:underline">{{email}}</a>
            </p>
            <p class="text-sm text-tertiary-default">
                <a href="#" class="hover:underline">{{date}}</a>
            </p>
        </div>
        <img class="m-auto object-contain rounded-lg shadow-lg shadow-black" v-if="url" :src="url" alt="image uploaded">
        <div class="px-6 pb-6 pt-8">
            <p class="text-tertiary-default text-base">
                {{content}}
            </p>
        </div>
        <div class="relative p-4 ml-4 mr-4">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
            </div>
        </div>
        <div class="like-buttons flex justify-center">
            <div @click="likePost" class="likes mr-8 mb-4">
                <i class="fa-solid fa-thumbs-up mr-2 cursor-pointer text-lg text-emerald-500 hover:scale-125"></i>
                <span>{{countOfLikes}}</span>
            </div>
        </div>
        <div v-for="comment in comments" >
        <Comment :email="comment.user.email" :content="comment.content"></Comment>
        </div>
        
        <div class="flex items-start space-x-2 pl-6 pb-6 sm:pr-10 pr-4">
            <Avatar></Avatar>
            <div class="min-w-0 flex-1">
                <form action="#" class="relative">
                    <div
                        class="overflow-hidden rounded-lg border border-secondary-default shadow-sm focus-within:border-primary-light focus-within:ring-1 focus-within:ring-primary-light">
                        <label for="comment" class="sr-only">Add a response</label>
                        <textarea rows="1" name="comment" id="comment" v-model="currentComment"
                            class="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                            placeholder="Add a response..." />
        
                        <!-- Spacer element to match the height of the toolbar -->
                        <div class="pb-2" aria-hidden="true">
                            <!-- Matches height of button in toolbar (1px border + 36px content height) -->
                            <div class="py-px">
                                <div class="h-9" />
                            </div>
                        </div>
                    </div>
                    <div class="absolute bottom-0 flex pb-2 pl-2">
                        <button type="button" @click="addComment"
                            class="items-center rounded-md border border-transparent bg-primary-default px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">Reply</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<style scoped>
    img {
        max-width: 48%;
        max-height: 48%;
    }
</style>
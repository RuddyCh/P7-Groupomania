<script>
    import PostForm from './PostForm.vue';
    import Card from '../../components/ui/card/Card.vue';
    export default {
        name: 'WallPage',
        components: {
            Card,
            PostForm
        },
        beforeCreated() {
            const token = localStorage.getItem('token'); // Get token from local storage
            if (token == null) {
                this.$router.push('/login');
            } // If token is null, redirect to login page
        },
        mounted() {
            const { VITE_SERVER_ADRESS, VITE_SERVER_PORT } = import.meta.env; // Get env variables
            const url = 'http://' + VITE_SERVER_ADRESS + ':' + VITE_SERVER_PORT + '/posts'; // Build url
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }; // Build options
            fetch(url, options)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('Error while fetching posts');
                }
            })
            .then((res) => {
                const {email, posts} = res; // Get email and posts from response
                this.posts = posts; // Set posts
                this.email = email; // Set email
            })
            .catch((err) => console.log("err :", err));
        },
        data() {
            return {
                posts: [],
                email: null
            } // Return posts and email
        }
    }
</script>

<template>
    <div v-if="email" class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 dark:bg-black">
        <PostForm></PostForm>
        <div v-if="posts.length === 0">No posts to display. Start chatting !</div>
        <div v-for="post in posts">
            <Card :email="post.user" :title="post.title" :content="post.content" :url="post.url" :date="post.date" :comments="post.comments" :likes="post.likes" :dislikes="post.dislikes" :id="post.id"></Card>
        </div>
    </div>
</template>

<style scoped></style>
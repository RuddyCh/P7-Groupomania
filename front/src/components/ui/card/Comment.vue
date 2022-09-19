<script>
import Avatar from '../Avatar.vue';
    export default {
    name: "Comment",
    components: { Avatar },
    props: {
        email: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div class="flex mb-4 pr-4">
        <Avatar></Avatar>
        <div class="flex flex-col rounded-md bg-secondary-default bg-opacity-40 w-full p-2">
            <p class="font-semibold mb-1 text-tertiary-dark">{{email}} :</p>
            <p class="font-light text-tertiary-default">{{content}}</p>
        </div>
    </div>
</template>

<style scoped></style>
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import WallPage from '../pages/wall/WallPage.vue';
import EditPost from '../pages/wall/EditPost.vue';
import Register from '../pages/SignUp.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: LoginPage },
    { path: '/home', component: WallPage },
    { path: '/edit/:id', component: EditPost },
    { path: '/register', component: Register },
];

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from) => {
if (isLoginRequired(to)) {
    return router.push('/login');
}
});

function isLoginRequired(to) {
    if (isPrivatePage(to) && !isTokenInCache()) return true;
    return false;
}

function isPrivatePage(to) {
    const publicPages = ['/login', '/signup', '/register'];
    return !publicPages.includes(to.path);
}

function isTokenInCache() {
    return localStorage.getItem('token') != null;
}

export {router};
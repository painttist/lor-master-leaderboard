import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/404.vue'


const routerHistory = createWebHistory('/lor-master-leaderboard/')
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about/:name",
    name: "About",
    component: About,
    props: true,
  },
  { path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: NotFound },
];

const router = createRouter({
    history: routerHistory,
    routes: routes,
});

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'

export default router;
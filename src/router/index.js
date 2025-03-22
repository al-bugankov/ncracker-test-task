import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from "@/views/MoviesList.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MoviesList,
    },
  ],
})

export default router

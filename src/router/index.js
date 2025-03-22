import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from "@/views/MoviesList.vue";
import MovieDetails from '@/views/MovieDetails.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MoviesList,
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: MovieDetails,
    },
  ],
})

export default router

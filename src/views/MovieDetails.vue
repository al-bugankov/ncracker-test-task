<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFilmInfoStore } from '@/modules/film-info/stores/filmInfoStore'
import router from '@/router/index.js'

import MovieCard from '@/components/movie-card/MovieCard.vue'
import PageDivider from '@/components/divider/PageDivider.vue'


const route = useRoute();
const filmInfoStore = useFilmInfoStore();
const movie = ref(null);


const goHome = () => {
  router.push('/')
}

onMounted(async () => {
  // Если данные есть в сторе — используем их
  if (filmInfoStore.filmData) {
    movie.value = filmInfoStore.filmData;
  } else {
    // Если данных нет — запрашиваем по API
    movie.value = await filmInfoStore.getCurrentFilm(route.params.id);
  }
});

onUnmounted(() => {
  filmInfoStore.$reset();
});
</script>

<template>
  <div class="movie-details content">
    <div class="movie-details__nav">
      <button type="button" class="nav-button" @click="goHome">Назад к списку</button>
    </div>
    <page-divider />
  <div class="movie-details__card" v-if="movie">
    <movie-card :movie="movie" />
  </div>
  <div v-else class="movie-details__info">К сожалению, по вашему запросу ничего не найдено...</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.movie-details {
  background-color: $black-brown;
  height: 100vh;
}

.nav-button {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  line-height: 20px;
  color: $primary-red;
  margin-left: 32px;
  position: relative;
  height: 24px;
}

.nav-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -32px;
  width: 24px;
  height: 24px;
  background: url("@/assets/icons/arrow_back.png") no-repeat center center;
}

.movie-details__info {
  font-family: Roboto-Medium, sans-serif;
  font-size: 32px;
  line-height: 32px;
  color: $white;
}

.movie-details__card,
.movie-details__info {
  margin-top: 32px;
}
</style>

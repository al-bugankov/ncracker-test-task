<script setup>
import { ref, onMounted } from 'vue';
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore.js';
import { useFilmInfoStore } from '@/modules/film-info/stores/filmInfoStore'

import MovieCard from '@/components/movie-card/MovieCard.vue'
import PageDivider from '@/components/divider/PageDivider.vue'

const feedbackStore = useFeedbackStore()
const filmInfoStore = useFilmInfoStore();

const movies = ref([]);

onMounted(async () => {
movies.value = await filmInfoStore.getAllFilms()
});

const toggleCheckbox = (event, otherId) => {
  const otherCheckbox = document.getElementById(otherId);
  if (event.target.checked) {
    otherCheckbox.checked = false;
    startFiltering(event);
  }  else {
    resetFiltering(); // Сброс фильтра при снятии любой галочки
  }
};

const startFiltering = (event) => {
  feedbackStore.isGlobalLoading = true;

  const sortedMovies = [...movies.value]; // Создаем копию массива

  if (event.target.id === 'byName') {
    sortedMovies.sort((a, b) => (a.title).localeCompare(b.title));
  } else if (event.target.id === 'byYear') {
    sortedMovies.sort((a, b) => (parseInt(a.year) || 0) - (parseInt(b.year) || 0));
  }

  movies.value = sortedMovies; // Обновляем список фильмов

  feedbackStore.isGlobalLoading = false;
};

const resetFiltering = async () => {
  movies.value = await filmInfoStore.getAllFilms()
};
</script>

<template>
<div class="movies-list">
  <div class="movie-list__content content">
    <div class="movies-list__header">Фильмы</div>
    <div class="movies-list__filters">
      <div class="movies-list__filter">
        <input type="checkbox" id="byName"  @change="toggleCheckbox($event,'byYear')">
        <label for="byName" class="checkbox-label">Отсортировать по названию</label>
      </div>
      <div class="movies-list__filter">
        <input type="checkbox" id="byYear"  @change="toggleCheckbox($event, 'byName')">
        <label class="checkbox-label" for="byYear">Отсортировать по году</label>
      </div>
    </div>
    <page-divider />
    <div class="movies-list__films">
      <movie-card class="move-card" v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.movies-list {
  background-color: $black-brown;
}

.movies-list__header {
  font-family: Roboto-Medium, sans-serif;
  font-size: 32px;
  color: $white;
  line-height: 32px;
}

.movies-list__filters {
  display: flex;
  gap: 32px;
  margin-top: 16px;
}

.movies-list__filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.movies-list__filter input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4D4747;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  &:checked {
    background-color: $secondary-red;
    border-color: $secondary-red;
  }
}

.movies-list__filter input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 8px;
  background-image: url('@/assets/icons/Path.png');
  background-size: cover;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  color: $light-grey;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  cursor: pointer;
}

.movies-list__films {
  margin-top: 40px;
}

.move-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}
</style>

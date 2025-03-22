<script setup>
import { ref, onMounted } from 'vue';
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore.js';
import axios from 'axios';

import MovieCard from '@/components/movie-card/MovieCard.vue'

const feedbackStore = useFeedbackStore()

const movies = ref([]);

onMounted(async () => {
  feedbackStore.isGlobalLoading = true;
  try {
    const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies');
    movies.value = response.data.data;
  } catch (error) {
    alert('Ошибка')
    console.error('Ошибка при получении данных:', error);
  } finally {
    feedbackStore.isGlobalLoading = false;
  }
});

const toggleCheckbox = (event, otherId) => {
  const otherCheckbox = document.getElementById(otherId);
  if (event.target.checked) {
    otherCheckbox.checked = false;
  }
};
</script>

<template>
<div class="movies-list">
  <div class="movie-list__content content">
    <div class="movies-list__header">Фильмы</div>
    <div class="movies-list__filters">
      <div class="movies-list__filter">
        <input type="checkbox" id="byName"  @click="toggleCheckbox($event,'byYear')">
        <label for="byName" class="checkbox-label">Отсортировать по названию</label>
      </div>
      <div class="movies-list__filter">
        <input type="checkbox" id="byYear"  @click="toggleCheckbox($event, 'byName')">
        <label class="checkbox-label" for="byYear">Отсортировать по году</label>
      </div>
    </div>
    <div class="movies-list__divider"></div>
    <div class="movies-list__films">
      <movie-card v-for="movie in movies" :key="movie.id" :movie="movie" />
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
}

.movies-list__divider {
  width: 100%;
  height: 1px;
  background-color: $light-grey;
  margin-top: 16px;
}

.movies-list__films {
  margin-top: 40px;
}
</style>

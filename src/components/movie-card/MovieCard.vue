<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFilmInfoStore } from '@/modules/film-info/stores/filmInfoStore'
import LoaderSpinner from '@/modules/feedback/components/LoaderSpinner.vue'


defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const filmInfoStore = useFilmInfoStore();
const router = useRouter()

const loading = ref(true);

const formatDuration = (duration) => {
  const minutesMatch = duration.match(/(\d+)\s*мин\./); // Поиск "X мин."
  const fullMatch = duration.match(/(\d+)\s*мин\.\s*\/\s*(\d{2}:\d{2})/); // Поиск "X мин. / HH:MM"

  if (fullMatch) {
    return `${fullMatch[1]} мин / ${fullMatch[2]}:00`;
  }

  if (minutesMatch) {
    const minutes = minutesMatch[1].padStart(2, '0');
    return `${minutes} мин / 00:${minutes}:00`;
  }

  return duration;
};

const moveToFilm = (movie) => {
  filmInfoStore.setFilmData(movie);
  router.push(`/movies/${movie.id}`);
};
</script>

<template>
<div class="movie-list__item">
  <div class="movie-card">
    <div class="movie-card__poster">
      <loader-spinner v-if="loading" />
      <img
        :src="movie.poster"
        :alt="movie.title"
        @load="loading = false"
        @error="loading = false"
        v-show="!loading"
      />
    </div>
    <div class="movie-card__details">
      <div class="movie-card__description">
        <div v-if="movie.collapse?.duration?.[0]" class="movie-card__duration"> {{ formatDuration(movie.collapse.duration[0]) }}</div>
        <div class="movie-card__title" @click="moveToFilm(movie)">
          {{ movie.title }}
        </div>
        <div class="movie-card__year-genre">{{ movie.year }}, {{ movie.genres.join(', ') }}</div>
        <div class="movie-card__directors">
          Режиссёр: {{ movie.directors ? movie.directors.join(', ') : 'Неизвестен' }}
        </div>
        <div class="movie-card__actors">
          <span>Актёры:</span> {{ movie.actors ? movie.actors.join(', ') : 'Неизвестно' }}
        </div>
        <div class="movie-card__about">{{ movie.description }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.movie-list__item {
  position: relative;
}

.movie-card__duration {
  font-family: Roboto-Bold, sans-serif;
  font-size: 12px;
  color: $black;
  line-height: 12px;
  position: absolute;
  top: 32px;
  right: 0;
  width: 184px;
  height: 30px;
  display: flex;
  align-items: center;
  background: url("@/assets/icons/Rectangle.png") no-repeat center;
  background-size: cover;
  z-index: 1;
  padding-left: 18px;
}

.movie-card__duration::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 24px;
  width: 24px;
  height: 24px;
  background: url("@/assets/icons/theaters.png") no-repeat center;
}

.movie-card {
  display: flex;
  margin-bottom: 16px;
}

.movie-card__poster {
  min-width: 168px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $light-grey;
}

.movie-card__poster img {
  width: 112px;
  height: 168px;
  object-fit: cover;
  object-position: center;
}

.movie-card__description {
  padding-left: 24px;
}

.movie-card__title {
  margin-top: 32px;
  font-size: 36px;
  font-family: Roboto-Bold, sans-serif;
  color: $white;
  line-height: 36px;
  margin-bottom: 12px;
  cursor: pointer;
}

.movie-card__year-genre {
  margin-bottom: 8px;
}

.movie-card__year-genre,
.movie-card__directors,
.movie-card__actors span {
  font-family: Roboto-Bold, sans-serif;
  font-size: 12px;
  color: $grey-brown;
  text-transform: uppercase;
}

.movie-card__actors {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: $silver-grey;
  margin-bottom: 16px;
  margin-top: 10px;
}

.movie-card__about {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 20px;
  color: $white;
}
</style>

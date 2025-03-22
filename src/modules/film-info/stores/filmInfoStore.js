import { defineStore } from 'pinia';
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore.js';
import axios from 'axios'

export const useFilmInfoStore = defineStore('FilmInfoStore', {
  state: () => ({
    filmData: null,  // Начальное состояние данных о фильме — null
  }),
  actions: {
    setFilmData(data) {
      this.filmData = data;  // Записываем данные о фильме при клике на карточку
    }, // Записываем в стор данные из карточки при переходе из MovieList.vue
    async getAllFilms ()  {
      const feedbackStore = useFeedbackStore()
      feedbackStore.isGlobalLoading = true;
      try {
        const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies');
        const movies = response.data.data;
        return movies
      } catch (error) {
        alert('Ошибка')
        console.error('Ошибка при получении данных:', error);
      } finally {
        feedbackStore.isGlobalLoading = false;
      }
    }, // Получаем список всех фильмов
    async getCurrentFilm(id) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.isGlobalLoading = true;
      try {
        const response = await axios.get(`https://mashroom-movies-api.netlify.app/api/movie/${id}`);
        const movie = response.data.data;
        return movie
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        feedbackStore.isGlobalLoading = false;
      }
    }, // Получаем конкретный фильм (когда нет данных в сторе)
  },
});

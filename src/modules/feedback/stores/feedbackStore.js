import { defineStore } from 'pinia';

export const useFeedbackStore = defineStore('feedbackStore', {
  state: () => ({
    isGlobalLoading: false,
  }),
  getters: {},
  actions: {},
});

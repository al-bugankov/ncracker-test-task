<script lang="ts" setup>
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore.js';
import LoaderSpinner from '@/modules/feedback/components/LoaderSpinner.vue'

const feedbackStore = useFeedbackStore()
</script>

<template>
  <div v-if="feedbackStore.isGlobalLoading" class="loader_overlay">
<loader-spinner />
  </div>
</template>

<style scoped>
.loader_overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(21, 25, 34);
  opacity: 0.95;
  transition: opacity 0.1s;
}
</style>

<script setup>
import { RouterView } from 'vue-router'
import ProjectHeader from "@/components/project-header/ProjectHeader.vue";
import LoaderOverlay from '@/modules/feedback/components/LoaderOverlay.vue'

</script>

<template>
  <header>
    <project-header />
  </header>
<loader-overlay />
  <RouterView />
</template>

<style scoped>

</style>

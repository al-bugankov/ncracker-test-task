<script setup>

</script>

<template>
  <div class="loader">
    <div class="circle outer"></div>
    <div class="circle inner"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main";

.loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 6px solid transparent;
  box-sizing: border-box;
}

.outer {
  border-color: $black transparent;
  animation: rotate-outer 1.5s linear infinite;
}

.inner {
  border-color: $primary-red transparent;
  animation: rotate-inner 1s linear infinite;
}

@keyframes rotate-outer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes rotate-inner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

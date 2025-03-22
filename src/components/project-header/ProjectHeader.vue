<script setup lang="ts">

</script>

<template>
<div class="header">
  <div class="header__text">#MOVIENOW</div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.header {
  background-color: $primary-red;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__text {
  color: $black;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: calc(0.21 * 1em); // 1em равен текущему font-size, всегда высчитываем 21% (как в макете)
  font-weight: 700;
  font-family: Roboto-Bold, sans-serif;
}
</style>

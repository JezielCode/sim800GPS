<template>
  <Transition name="slide-fade">
    <component :is="layoutView" />
  </Transition>
</template>

<script setup>
import layoutView from "./RouterView.vue";
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

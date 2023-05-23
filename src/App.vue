<template>
  <Transition name="slide-fade">
    <component :is="layoutView" />
  </Transition>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import FullLayout from "src/layouts/FullLayout.vue";
import MainLayout from "src/layouts/MainLayout.vue";
import { stateLoginStore } from "src/stores/main-layout";

const stateLogin = stateLoginStore();
const route = useRoute();

const layoutView = computed(() => {
  // return stateLogin.getStateLogin == true
  //   ? MainLayout
  //   : FullLayout

  if (route.meta.layout == "full-layout") {
    return FullLayout;
  } else {
    return stateLogin.getStateLogin == true ? MainLayout : FullLayout;
  }
});

defineComponent({
  name: "App",
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
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

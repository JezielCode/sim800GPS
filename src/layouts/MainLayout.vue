<template>
  <q-layout view="lHh LpR lFf">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      elevated
      style="background: #21313c"
      class="text-white"
    >
      <q-scroll-area
        style="
          height: calc(100% - 190px);
          margin-top: 10px;
          border-right: 1px solid #ddd;

          font-weight: bold;
        "
      >
        <q-item clickable v-ripple>
          <q-item-section> @JezielGuiev </q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple @click="to_route('dashboard')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section> Dashboard </q-item-section>
        </q-item> -->

        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable v-ripple @click="to_route(menuItem.route)">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
          <q-separator color="white" />
          <q-item>
            <q-item-section>
              <q-btn
                @click="logout"
                rounded
                label="CERRAR SESION"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <Transition name="slide-fade">
      <q-page-container>
        <router-view />
      </q-page-container>
    </Transition>

    <q-footer elevated class="bg-white">
      <q-toolbar class="row justify-center">
        <q-btn
          dense
          flat
          round
          style="color: green"
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-btn
          class=""
          dense
          flat
          size="20px"
          round
          style="color: #ef6c00; margin: 0px 60px 0px 60px"
          icon="mdi-home"
          @click="toggleLeftDrawer"
        />
        <q-btn
          dense
          flat
          round
          style="color: green"
          icon="person"
          @click="to_route_menu('profile')"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { stateLoginStore } from "src/stores/main-layout";
import admin from "src/navigation/admin";
import user from "src/navigation/user";
const router = useRouter();
const $q = useQuasar();
let timer = ref(null);
const stateLogin = stateLoginStore();
const menuList = ref([
  {
    icon: "mdi-car",
    label: "Mi auto",
    separator: true,
    route: "mi-auto",
    role: "user",
  },
  {
    icon: "mdi-heart",
    label: "Ubicación persona",
    separator: true,
    route: "mi-personita",
    role: "admin",
  },
  {
    icon: "mdi-bell",
    label: "Notificacion",
    separator: false,
    route: "notification",
    role: "user",
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Sobre la app",
    separator: false,
    route: "aboutapp",
    role: "user",
  },
]);

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const to_route = (route) => {
  router.push({ name: route });
};

const to_route_menu = (route) => {
  router.push({ name: route });
};

const logout = () => {
  $q.loading.show({
    message: "Cerrando sesion...",
  });

  // hiding in 3s
  timer.value = setTimeout(() => {
    $q.loading.hide();
    timer.value = void 0;
    stateLogin.writeStateLogin(true);
    router.replace("/login");
  }, 2000);
};

switch (stateLogin.getStateRole) {
  case "admin":
    menuList.value = admin;
    break;
  case "user":
    menuList.value = user;
    break;
}

function onBackButton() {
  //router.go(-1);
  console.log("nos vamos atras");
}

onMounted(() => {
  window.addEventListener("popstate", onBackButton());
});
</script>
<style>
.q-drawer--mobile {
  font-size: medium;
}
.q-drawer--left {
  left: 0;
  transition: all 3s ease-in !important;
  transform: translateX(-100%);
}
</style>

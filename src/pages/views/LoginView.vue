<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          width="300"
        />
      </div>
      <div class="text-center">
        <p style="font-weight: bold; font-size: 30px; color: #55008e">RASGPS</p>
      </div>
      <div class="q-mb-sm">
        <q-input rounded outlined type="email" v-model="userData.email">
          <template v-slot:append>
            <q-avatar>
              <q-icon name="email" size="sm" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div>
        <q-input rounded outlined type="password" v-model="userData.password">
          <template v-slot:append>
            <q-avatar>
              <q-icon name="mdi-lock" size="sm" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="q-mt-xl">
        <q-btn
          color="secondary"
          glossy
          push
          class="full-width"
          icon="login"
          label="Ingresar"
          size="md"
          @click="signin"
        >
        </q-btn>
      </div>
    </div>
    <div class="text-center">
      <p>@Jeziel-Guiev</p>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import Users from "./repository.users.ts";
import { firstValueFrom } from "rxjs";
import { useRouter } from "vue-router";
import { stateLoginStore } from "src/stores/main-layout";

const stateLogin = stateLoginStore();
const singinUser = Users.getInstance();
const userData = ref({});
const $q = useQuasar();
const router = useRouter();
let timer = ref(null);
userData.value.email = "user@gmail.com";
userData.value.password = "muyseguro1234";

const signin = async () => {
  await firstValueFrom(
    singinUser.getUsers(userData.value.email, userData.value.password)
  ).then((value) => {
    if (Object.keys(value.data).length > 0) {
      $q.loading.show({
        message: "Pagina adquiriendo datos del servidor...",
      });
      // hiding in 3s

      timer.value = setTimeout(() => {
        $q.loading.hide();
        timer.value = void 0;
      }, 2000);

      stateLogin.writeStateLogin(true);
      stateLogin.writeStateRole(value.data.role);
      // router.push({name:"dashboard",params: { username: 'admin' }})
      router.push("/mi-auto");
    } else {
      $q.notify({
        message: "email o constraseña incorrecta.",
        color: "teal-6",
        icon: "mail",
      });
    }
  });
};
</script>
<style lang="sass" scoped>
dark
  background-color: $grey-3
</style>

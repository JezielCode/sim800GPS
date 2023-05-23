<template>
  <div class="q-pa-md">
    <q-card-section>
      <h5 class="text-center q-mt-md q-mx-xl">PERFIL USUARIO</h5>
      <div class="row">
        <div class="col-12 col-md-4 row justify-center items-center">
          <div class="">
            <q-avatar size="150px">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              />
            </q-avatar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row justify-center">
            <table class="q-mt-md" style="width: 100%">
              <tr>
                <th style="text-align: left">
                  <q-icon class="q-mx-md" size="20px" name="person" />
                  <span class="font-weight-bold text-center">Nombre:</span>
                </th>
                <td style="text-align: left">
                  {{ form.name_user }}
                </td>
              </tr>
              <tr>
                <th style="text-align: left">
                  <q-icon class="q-mx-md" size="20px" name="person" />
                  <span class="font-weight-bold">Apellido:</span>
                </th>
                <td class="">{{ form.last_name_user }}</td>
              </tr>

              <tr>
                <th style="text-align: left">
                  <q-icon size="20px" class="q-mx-md" name="person" />
                  <span class="font-weight-bold">Direccion:</span>
                </th>
                <td>{{ form.direction }}</td>
              </tr>

              <tr>
                <th style="text-align: left">
                  <q-icon class="q-mx-md" size="20px" name="person" />
                  <span class="font-weight-bold">Sexo:</span>
                </th>
                <td>{{ form.sex_user }}</td>
              </tr>
              <tr>
                <th style="text-align: left">
                  <q-icon class="q-mx-md" size="20px" name="person" />
                  <span class="font-weight-bold">Rol:</span>
                </th>
                <td>{{ form.user_rol }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </q-card-section>
  </div>
</template>
<script setup>
import { ref } from "vue";
const form = ref({
  id: "fsdf3423rwerw33",

  name_user: "Juan",
  direction: "Av. Vicencio #122",
  user_rol: "User",
  phone_user: "",
  sex_user: "Hombre",
  last_name_user: "Villegas",
  birth_date_user: "2022/10/17",
  ci_user: "3433223",
  email: "",
});
</script>

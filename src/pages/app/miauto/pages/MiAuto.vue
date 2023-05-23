<template>
  <q-page>
    <div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        style="height: 1000px"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="coordinate"></ol-geom-point>
              <ol-style>
                <ol-style-circle :radius="radius">
                  <ol-style-fill :color="fillColor"></ol-style-fill>
                  <ol-style-stroke
                    :color="strokeColor"
                    :width="strokeWidth"
                  ></ol-style-stroke>
                </ol-style-circle>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="coordinate"></ol-geom-point>
              <ol-style>
                <ol-style-circle :radius="radius">
                  <ol-style-fill :color="fillColor"></ol-style-fill>
                  <ol-style-stroke
                    :color="strokeColor"
                    :width="strokeWidth"
                  ></ol-style-stroke>
                </ol-style-circle>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="coordinateredRedone"></ol-geom-point>
              <ol-style>
                <ol-style-circle :radius="radius">
                  <ol-style-fill :color="fillColor"></ol-style-fill>
                  <ol-style-stroke
                    :color="strokeColorRed"
                    :width="strokeWidth"
                  ></ol-style-stroke>
                </ol-style-circle>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
    </div>

    <q-page-sticky position="top-left" :offset="[18, 18]">
      <div>
        <q-fab
          v-model="fab1"
          label="Mauricio R."
          label-position="left"
          color="red"
          icon="keyboard_arrow_right"
          direction="right"
        >
          <q-fab-action
            color="primary"
            @click="onClick"
            icon="mdi-run"
            label="En movimiento"
          />
        </q-fab>
      </div>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[50, 50]">
      <q-btn
        size="md"
        @click="updateLocationCar()"
        fab
        icon="mdi-map-marker"
        color="blue"
      ></q-btn>
    </q-page-sticky>
    <div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-center">
              <q-icon size="50px" color="red" name="mdi-map-marker"></q-icon>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Activa tu GPS y espera unos segundos antes de volver apretar el
            botón nuevamente esto se debe porque el gps esta obteniendo su
            ubicación, de esta manera podremos obtener un mejor cálculo de la
            ubicación de su vehículo con respecto a usted.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { api } from "boot/axios";
import axios from "axios";

import { Geolocation } from "@capacitor/geolocation";
export default {
  setup() {
    const routeUserOne = ref([
      {
        latitud: -17.393288,
        longitud: -66.259071,
        dateCreate:
          "Mon Sep 12 2022 22:04:24 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391771,
        longitud: -66.256264,
        dateCreate:
          "Mon Sep 12 2022 22:05:13 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39106,
        longitud: -66.248802,
        dateCreate:
          "Mon Sep 12 2022 22:06:03 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.390997,
        longitud: -66.244736,
        dateCreate:
          "Mon Sep 12 2022 22:06:56 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.390993,
        longitud: -66.239182,
        dateCreate:
          "Mon Sep 12 2022 22:07:47 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391071,
        longitud: -66.235985,
        dateCreate:
          "Mon Sep 12 2022 22:08:39 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391413,
        longitud: -66.229904,
        dateCreate:
          "Mon Sep 12 2022 22:09:22 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391659,
        longitud: -66.222572,
        dateCreate:
          "Mon Sep 12 2022 22:10:13 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391848,
        longitud: -66.218193,
        dateCreate:
          "Mon Sep 12 2022 22:11:03 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392208,
        longitud: -66.211014,
        dateCreate:
          "Mon Sep 12 2022 22:11:52 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392326,
        longitud: -66.208153,
        dateCreate:
          "Mon Sep 12 2022 22:12:51 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392588,
        longitud: -66.202377,
        dateCreate:
          "Mon Sep 12 2022 22:13:35 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392717,
        longitud: -66.199959,
        dateCreate:
          "Mon Sep 12 2022 22:14:21 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392906,
        longitud: -66.195313,
        dateCreate:
          "Mon Sep 12 2022 22:15:15 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393194,
        longitud: -66.188675,
        dateCreate:
          "Mon Sep 12 2022 22:16:01 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393442,
        longitud: -66.182404,
        dateCreate:
          "Mon Sep 12 2022 22:16:54 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393736,
        longitud: -66.176201,
        dateCreate:
          "Mon Sep 12 2022 22:17:41 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.394026,
        longitud: -66.170151,
        dateCreate:
          "Mon Sep 12 2022 22:18:31 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393841,
        longitud: -66.166191,
        dateCreate:
          "Mon Sep 12 2022 22:19:24 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39472,
        longitud: -66.165848,
        dateCreate:
          "Mon Sep 12 2022 22:20:09 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397057,
        longitud: -66.164673,
        dateCreate:
          "Mon Sep 12 2022 22:20:59 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397451,
        longitud: -66.162567,
        dateCreate:
          "Mon Sep 12 2022 22:21:49 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397367,
        longitud: -66.162071,
        dateCreate:
          "Mon Sep 12 2022 22:22:38 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397226,
        longitud: -66.161293,
        dateCreate:
          "Mon Sep 12 2022 22:23:28 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39716,
        longitud: -66.160713,
        dateCreate:
          "Mon Sep 12 2022 22:24:18 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396963,
        longitud: -66.159782,
        dateCreate:
          "Mon Sep 12 2022 22:25:07 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396929,
        longitud: -66.159401,
        dateCreate:
          "Mon Sep 12 2022 22:25:57 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396902,
        longitud: -66.159256,
        dateCreate:
          "Mon Sep 12 2022 22:26:47 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39686,
        longitud: -66.159187,
        dateCreate:
          "Mon Sep 12 2022 22:27:37 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396832,
        longitud: -66.158775,
        dateCreate:
          "Mon Sep 12 2022 22:28:27 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396732,
        longitud: -66.158463,
        dateCreate:
          "Mon Sep 12 2022 22:29:17 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396736,
        longitud: -66.158218,
        dateCreate:
          "Mon Sep 12 2022 22:30:07 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396652,
        longitud: -66.157562,
        dateCreate:
          "Mon Sep 12 2022 22:30:56 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396481,
        longitud: -66.15686,
        dateCreate:
          "Mon Sep 12 2022 22:31:47 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396437,
        longitud: -66.156311,
        dateCreate:
          "Mon Sep 12 2022 22:32:35 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39624,
        longitud: -66.155693,
        dateCreate:
          "Mon Sep 12 2022 22:33:25 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396128,
        longitud: -66.154968,
        dateCreate:
          "Mon Sep 12 2022 22:34:15 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39584,
        longitud: -66.153893,
        dateCreate:
          "Mon Sep 12 2022 22:35:05 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.395916,
        longitud: -66.153542,
        dateCreate:
          "Mon Sep 12 2022 22:35:56 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.395775,
        longitud: -66.152824,
        dateCreate:
          "Mon Sep 12 2022 22:36:44 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.395676,
        longitud: -66.151566,
        dateCreate:
          "Mon Sep 12 2022 22:37:34 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.395161,
        longitud: -66.149445,
        dateCreate:
          "Mon Sep 12 2022 22:38:24 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.396233,
        longitud: -66.148064,
        dateCreate:
          "Mon Sep 12 2022 22:39:14 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.399216,
        longitud: -66.147232,
        dateCreate:
          "Mon Sep 12 2022 22:40:05 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.399708,
        longitud: -66.147064,
        dateCreate:
          "Mon Sep 12 2022 22:40:59 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.399612,
        longitud: -66.146309,
        dateCreate:
          "Mon Sep 12 2022 22:41:45 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397701,
        longitud: -66.157806,
        dateCreate:
          "Tue Sep 13 2022 01:32:33 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.397367,
        longitud: -66.159134,
        dateCreate:
          "Tue Sep 13 2022 01:33:16 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.395124,
        longitud: -66.159515,
        dateCreate:
          "Tue Sep 13 2022 01:34:06 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392893,
        longitud: -66.159927,
        dateCreate:
          "Tue Sep 13 2022 01:34:56 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392881,
        longitud: -66.160835,
        dateCreate:
          "Tue Sep 13 2022 01:35:46 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393402,
        longitud: -66.163895,
        dateCreate:
          "Tue Sep 13 2022 01:36:36 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393946,
        longitud: -66.167664,
        dateCreate:
          "Tue Sep 13 2022 01:37:25 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39378,
        longitud: -66.171181,
        dateCreate:
          "Tue Sep 13 2022 01:38:16 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393492,
        longitud: -66.177673,
        dateCreate:
          "Tue Sep 13 2022 01:39:21 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.393221,
        longitud: -66.183876,
        dateCreate:
          "Tue Sep 13 2022 01:39:56 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392954,
        longitud: -66.190506,
        dateCreate:
          "Tue Sep 13 2022 01:40:51 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392559,
        longitud: -66.198845,
        dateCreate:
          "Tue Sep 13 2022 01:41:35 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392262,
        longitud: -66.205338,
        dateCreate:
          "Tue Sep 13 2022 01:42:29 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.392208,
        longitud: -66.207611,
        dateCreate:
          "Tue Sep 13 2022 01:43:19 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391932,
        longitud: -66.213959,
        dateCreate:
          "Tue Sep 13 2022 01:44:03 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.39172,
        longitud: -66.218925,
        dateCreate:
          "Tue Sep 13 2022 01:44:53 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391602,
        longitud: -66.22139,
        dateCreate:
          "Tue Sep 13 2022 01:45:43 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391211,
        longitud: -66.229088,
        dateCreate:
          "Tue Sep 13 2022 01:46:34 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.391163,
        longitud: -66.229897,
        dateCreate:
          "Tue Sep 13 2022 01:47:24 GMT+0000 (Coordinated Universal Time)",
      },
      {
        latitud: -17.390875,
        longitud: -66.237656,
        dateCreate:
          "Tue Sep 13 2022 01:48:13 GMT+0000 (Coordinated Universal Time)",
      },
    ]);
    const alert = ref(false);
    const center = ref([-66.1494808, -16.3914234]);
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const radius = ref(3);
    const strokeWidth = ref(10);
    const strokeColor = ref("blue");
    const strokeColorRed = ref("red");
    const fillColor = ref("white");

    const coordinate = ref([]);
    const coordinatered = ref([-65.1494808, -19.3914234]);
    const coordinateredRedone = ref([-66.259071, -17.393288]);
    const position = ref("determining...");
    const latitude = ref();

    const index = ref(0);

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then((newPosition) => {
        coordinate.value = [
          newPosition.coords.longitude,
          newPosition.coords.latitude,
        ];
        center.value = [
          newPosition.coords.longitude,
          newPosition.coords.latitude,
        ];
      });
    }

    function checkPermissions() {
      Geolocation.checkPermissions();
      Geolocation.requestPermissions().catch((err) => {
        console.log();
      });
    }

    let geoId;

    function changePositionUserOne(position) {
      coordinateredRedone.value = [
        routeUserOne.value[position].longitud,
        routeUserOne.value[position].latitud,
      ];
    }

    onMounted(() => {
      getCurrentPosition();
      checkPermissions();
      geoId = Geolocation.watchPosition(
        { timeout: 3000 },
        (newPosition, err) => {
          coordinate.value = [
            newPosition.coords.longitude,
            newPosition.coords.latitude,
          ];
        }
      );

      setInterval(() => {
        changePositionUserOne(index.value++);
      }, 7000);
    });

    onBeforeUnmount(() => {
      Geolocation.clearWatch(geoId);
    });

    function onClick() {
      // console.log('Clicked on a fab action')
    }
    function updateLocationCar() {
      getCurrentPosition();
      if (Object.keys(coordinate.value).length != 0) {
        // api
        //   .get("/api/locations")
        //   .then(({ data }) => {
        //     coordinatered.value = [data[0].longitud, data[0].latitud];
        //   })
        //   .catch(() => {
        //     coordinatered.value = [-65.1494808, -19.3914234];
        //   });
        // axios
        //   .post(
        //     `https://gpsv2.herokuapp.com/${coordinate.value[1]}/${coordinate.value[0]}`
        //   )
        //   .then((data) => {});
      } else {
        alert.value = true;
      }
    }
    return {
      fab1: ref(false),
      fab2: ref(true),
      coordinateredRedone,
      position,
      latitude,
      index,
      center,
      projection,
      zoom,
      rotation,
      routeUserOne,
      radius,
      strokeWidth,
      strokeColor,
      fillColor,
      coordinate,
      strokeColorRed,
      coordinatered,
      updateLocationCar,
      alert,
      onClick,
    };
  },
};
</script>

<style>
.position {
  position: relative;
}
</style>

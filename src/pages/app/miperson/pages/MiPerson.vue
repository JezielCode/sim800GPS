<template>
  <q-page>
    <div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        style="height: 700px"
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
      </ol-map>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        @click="updateLocationCar()"
        fab
        icon="mdi-crosshairs-gps"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { api } from "boot/axios";
import axios from "axios";
import { Geolocation } from "@capacitor/geolocation";
export default {
  setup() {
    const center = ref([-66.1494808, -16.3914234]);
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const radius = ref(3);
    const strokeWidth = ref(10);
    const strokeColor = ref("green");
    const strokeColorRed = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-65.1494808, -17.3914234]);
    const coordinatered = ref([-65.1494808, -19.3914234]);
    const position = ref("determining...");
    const latitude = ref();

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

    onMounted(() => {});

    function updateLocationCar() {
      axios
        .get("https://gpsv2.herokuapp.com/api/locations")
        .then(({ data }) => {
          coordinate.value = [data[0].longitud, data[0].latitud];
        })
        .catch(() => {
          coordinatered.value = [-65.1494808, -19.3914234];
        });
    }
    return {
      position,
      latitude,
      center,
      projection,
      zoom,
      rotation,

      radius,
      strokeWidth,
      strokeColor,
      fillColor,
      coordinate,
      strokeColorRed,
      coordinatered,
      updateLocationCar,
    };
  },
};
</script>

<style>
.position {
  position: relative;
}
</style>

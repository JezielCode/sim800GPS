<template>
  <q-page>
    <!-- <div>
      GPS nuero: <strong>{{ position }}</strong>
    </div> -->
    <div class="q-pa-md">Dashboard</div>
  </q-page>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";
export default {
  setup() {
    const position = ref("determining...");
    const latitude = ref();
    const imageSrc = ref("");

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then((newPosition) => {
        position.value = newPosition.coords.latitude;
        latitude.value = newPosition.coords.altitude;
      });
    }

    function checkPermissions() {
      Geolocation.requestPermissions();
    }

    let geoId;

    onMounted(() => {
      // getCurrentPosition();
      // //checkPermissions();
      // geoId = Geolocation.watchPosition({}, (newPosition, err) => {
      //   console.log(newPosition);
      //   position.value = newPosition.coords.latitude;
      // });
    });

    onBeforeUnmount(() => {
      //  Geolocation.clearWatch(geoId);
    });
    return {
      position,
      latitude,
    };
  },
};
</script>

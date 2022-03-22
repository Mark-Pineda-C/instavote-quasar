<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh" class="text-black">401</div>

      <div class="text-h2 text-black" style="opacity: 0.4">
        No tienes permiso para acceder a esta pantalla
      </div>

      <q-btn
        class="q-mt-xl"
        color="accent"
        text-color="white"
        unelevated
        @click="this.$router.go(-1)"
        label="Regresar"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error401",
});
</script>

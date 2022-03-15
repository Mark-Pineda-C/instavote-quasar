<template>
  <div
    class="flex flex-center overflow-hidden"
    style="height: calc(100vh - 50px); pointer-events: none"
  >
    <q-img
      src="~assets/light-mainBG.png"
      alt="Background"
      fit="cover"
      style="max-width: 100%; height: 100%; pointer-events: none"
    >
      <div
        class="absolute-full text-subtitle2 flex flex-center"
        style="background: rgba(0, 0, 0, 0.1)"
      >
        <div class="flex column flex-start" style="width: 80%; height: 80%">
          <h3 class="text-weight-bold text-shadow q-mb-none">
            Sistema web de voto electronico virtual
          </h3>
          <h5 class="text-shadow">Simple. Rapido. Seguro.</h5>
          <q-space />
          <q-btn
            color="accent"
            label="Ver Procesos Electivos"
            to="/activities"
            rounded
            style="width: 200px"
          />
        </div>
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainHome",
});
</script>

<style>
.text-shadow {
  text-shadow: 5px 5px 10px #000;
}
</style>

<template>
  <q-card class="q-pa-md q-ma-lg indications-card shadow-10">
    <q-card-section class="text-center">
      <div class="text-h4">Inidicaciones a tomar en cuenta</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <ul>
        <li>
          Se va a tomar un determinado tiempo para realizar el proceso electoral
          el cual sera <strong>5 minutos</strong>
        </li>
        <li>
          Una vez pasado el lapso de tiempo no podra volver a realizar la
          eleccion
        </li>
        <li>
          El proceso de votacion se cerrara a las <strong>16:00 horas</strong>
        </li>
        <li>
          <strong>SOLO TENDRAS UNA OPORTUNIDAD PARA EMITIR TU VOTO</strong>
        </li>
      </ul>
    </q-card-section>
    <q-separator />
    <q-card-actions class="flex flex-center q-mt-lg">
      <q-btn to="/home" color="negative">Regresar</q-btn>
      <q-btn to="main" color="positive">Iniciar</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProcessHome",
});
</script>

<style lang="sass" scoped>
.indications-card
    max-width: 80%
</style>

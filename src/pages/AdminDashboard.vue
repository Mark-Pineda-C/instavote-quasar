<template>
  <div class="q-ma-md full-width q-pa-xl">
    <q-list bordered separator>
      <q-item-label header><b>Todos los Procesos</b></q-item-label>
      <q-item v-for="(process, index) in processes" :key="index">
        <q-item-section>
          <q-item-label>{{ process.ProcessName }}</q-item-label>
        </q-item-section>
        <q-item-section side :class="setColor(getState(process))">
          {{ getState(process) }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { DateTime } from "luxon";

export default defineComponent({
  name: "AdminDashboard",
  data() {
    return {
      processes: [],
    };
  },
  created() {
    api.get("process/get-process-list").then((response) => {
      var Data = response.data;
      if (Data.status === "success") {
        this.processes = Data.message;
      }
    });
  },
  methods: {
    getState(obj) {
      var start = DateTime.fromISO(obj.ProcessDateStart);
      var end = DateTime.fromISO(obj.ProcessDateEnd);
      if (DateTime.now().ts < start.ts) {
        return "Aun no esta activo";
      }
      if (DateTime.now().ts > start.ts && DateTime.now().ts < end.ts) {
        return "Esta en progreso";
      }
      if (DateTime.now().ts > end.ts && obj.hasEnded === false) {
        return "Procesando Votos...";
      }
      if (DateTime.now().ts > end.ts && obj.hasEnded === true) {
        return "Ha finalizado";
      }
      return "";
    },
    setColor(str) {
      if (str === "Aun no esta activo") {
        return "text-accent";
      }
      if (str === "Esta en progreso") {
        return "text-positive";
      }
      if (str === "Procesando Votos...") {
        return "text-accent";
      }
      if (str === "Ha finalizado") {
        return "text-negative";
      }
      return "text-warning";
    },
  },
});
</script>

<template>
  <div class="q-ma-md full-width q-pa-xl">
    <q-list bordered separator>
      <q-item-label header>Procesos Activos</q-item-label>
      <q-item v-for="(process, index) in processes" :key="index">
        <q-item-section>
          <q-item-label>{{ process.ProcessName }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import { api } from "boot/axios";

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
      console.log(Data);
      if (Data.status === "success") {
        this.processes = Data.message;
      }
    });
  },
});
</script>

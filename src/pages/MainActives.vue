<template>
  <div class="q-ma-lg">
    <h4>Procesos Activos</h4>
    <hr />
    <div class="q-pa-md flex flex-center">
      <ProcessCard
        v-for="(process, index) in processes"
        :key="index"
        :value="process"
      ></ProcessCard>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
import { defineComponent } from "vue";
import { defineAsyncComponent } from "vue";

export default defineComponent({
  name: "MainActives",
  data() {
    return {
      processes: [],
    };
  },
  components: {
    ProcessCard: defineAsyncComponent(() =>
      import("../components/ProcessCard.vue")
    ),
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

<style></style>

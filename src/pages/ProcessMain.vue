<template>
  <div class="flex flex-center column full-width">
    <PositionBar
      v-for="(pos, index) in positions"
      :key="index"
      :value="pos"
    ></PositionBar>
    <div class="q-mt-lg">
      <q-btn color="accent" label="Emitir Voto" />
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "ProcessMain",
  components: {
    PositionBar: defineAsyncComponent(() =>
      import("../components/PositionBar.vue")
    ),
  },
  data() {
    return {
      positions: [],
    };
  },
  created() {
    api
      .get(`/process/get-process-positions/${this.$route.params.id}`)
      .then((res) => {
        this.positions = res.data.message;
      });
  },
});
</script>

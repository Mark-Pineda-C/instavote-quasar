<template>
  <div class="q-mt-md position-box">
    <q-card class="bg-secondary text-black position-bar flex items-center">
      <q-card-section class="text-h6 q-pa-none q-pl-md">
        Candidatos a {{ pos.position }}
      </q-card-section>
    </q-card>
    <div class="q-ma-xs candidate-container flex flex-center q-gutter-lg">
      <CandidateCard
        v-for="(can, index) in pos.candidates"
        :key="index"
        :value="can"
      ></CandidateCard>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "PositionBar",
  props: ["value"],
  data() {
    return {
      pos: this.value,
    };
  },
  components: {
    CandidateCard: defineAsyncComponent(() => import("./CandidateCard.vue")),
  },
});
</script>

<style lang="sass" scoped>
.position-box
    width: 80%
.position-bar
    width: 100%
    height: fit-content
.candidate-container
    max-width: 100%
    height: fit-content
</style>

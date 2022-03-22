<template>
  <div class="q-mt-md position-box">
    <q-card class="bg-secondary text-black position-bar flex items-center">
      <q-card-section class="text-h6 q-pa-none q-pl-md text-white">
        Candidatos a {{ pos.position }}
      </q-card-section>
    </q-card>
    <div
      class="q-ma-xs q-mt-md candidate-container flex flex-center"
      style="gap: 25px"
    >
      <CandidateCard
        v-for="(can, index) in pos.candidates"
        :key="index"
        :value="can"
        @select-card="selectCard"
        :selected="selectedCard"
        :i="index"
      ></CandidateCard>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

export default defineComponent({
  name: "PositionBar",
  props: ["value", "i"],
  data() {
    return {
      pos: this.value,
      selectedId: "",
      selectedCard: ref(-1),
    };
  },
  components: {
    CandidateCard: defineAsyncComponent(() => import("./CandidateCard.vue")),
  },
  methods: {
    selectCard(id, index) {
      this.selectedId = id;
      this.selectedCard = index;
      this.$emit("insert-vote", this.selectedId, this.i);
    },
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

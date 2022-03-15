<template>
  <q-card class="shadow-5 candidate-card overflow-hidden">
    <q-card-section style="width: 100%" class="q-pa-xs">
      <q-img src="../assets/stock.jpg" alt="Candidato">
        <div
          class="absolute-bottom text-subtitle2 text-center"
          style="padding: 0"
        >
          {{ can.name }}
        </div>
      </q-img>
      <q-card-actions class="flex flex-center q-mt-sm">
        <q-btn-toggle
          v-model="selectedCard"
          toggle-color="accent"
          outline
          :options="[{ label: 'Seleccionar', value: can._id }]"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CandidateCard",
  props: ["value"],
  data() {
    return {
      can: this.value,
      selectedCard: "",
    };
  },
});
</script>

<style lang="sass" scoped>
.candidate-card
  width: 180px
  height: 200px
</style>

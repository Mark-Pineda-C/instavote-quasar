<template>
  <q-card class="shadow-5 candidate-card overflow-hidden">
    <q-card-section style="width: 100%" class="q-pa-xs">
      <q-img :src="can.image" alt="Candidato" style="height: 115px">
        <div
          class="absolute-bottom text-subtitle2 text-center"
          style="padding: 0"
        >
          {{ can.name }}
        </div>
      </q-img>
      <q-card-actions class="flex flex-center q-mt-sm">
        <q-btn
          outline
          color="accent"
          label="seleccionar"
          :class="{ active: i === selected }"
          style="transition: 0.25"
          @click="selectCard"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CandidateCard",
  props: ["value", "selected", "i"],
  data() {
    return {
      can: this.value,
      selectedCard: "",
    };
  },
  methods: {
    selectCard() {
      this.$emit("select-card", this.can._id, this.i);
    },
  },
});
</script>

<style lang="sass" scoped>
.candidate-card
  width: 180px
  height: 200px
.active
  background: var(--q-accent) !important
  color: white !important
  border-radius: 8px !important
</style>

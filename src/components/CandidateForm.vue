<template>
  <q-card class="candidate-form">
    <q-card-section>
      <q-btn
        size="sm"
        color="negative"
        icon="clear"
        class="float-btn"
        round
        @click="this.$emit('Remove-Candidate')"
      />
      <div class="row q-gutter-x-sm">
        <div class="col">
          <q-input
            v-model="can.name"
            label="Nombre del candidato"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Porfavor no deje el campo vacio',
              (val) =>
                val.length > 3 || 'El nombre debe ser mayor a 3 caracteres',
            ]"
            dense
          ></q-input>
          <q-input
            v-model="can.group"
            label="Agrepacion del Candidato"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Porfavor no deje el campo vacio',
              (val) =>
                val.length > 3 || 'El nombre debe ser mayor a 3 caracteres',
            ]"
            dense
          ></q-input>
        </div>
        <div class="col q-pa-xs flex flex-center">
          <div class="image-input flex flex-center" v-if="!can.image">
            <input
              type="file"
              accept="images/*"
              class="invisible-input full-width"
              @change="convertImg"
            />
            <q-avatar
              color="accent"
              icon="add"
              class="input-icon"
              text-color="white"
            />
          </div>
          <div
            v-else
            style="height: 100px; width: 100px"
            class="image-container shadow-8"
          >
            <q-btn
              size="sm"
              color="negative"
              icon="clear"
              class="float-btn z-top"
              round
              @click="removeImg"
            />
            <q-img
              :src="can.image"
              alt="imagen del acandidato"
              style="height: 100px; width: 100px"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, toRef } from "vue";

export default defineComponent({
  name: "CandidateForm",
  props: ["value"],
  setup(props) {
    var can = toRef(props, "value");
    return {
      can,
      convertImg(e) {
        const file = e.target.files || e.dataTransfer.files;
        if (file.length) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.can.image = e.target.result;
          };
          reader.readAsDataURL(file[0]);
        }
      },
      removeImg() {
        can.value.image = null;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.candidate-form
    width: 500px
    height: 152px
    position: relative
.image-input
    background: #ddd
    width: 100%
    height: 100%
    border-radius: 10px
.image-container
    position: relative
    border-radius: 10px
.input-icon
    pointer-events: none
    cursor: pointer
.float-btn
    position: absolute
    top: -10px
    left: -10px
.invisible-input
    position: absolute
    opacity: 0
    cursor: pointer
    height: 100%
</style>

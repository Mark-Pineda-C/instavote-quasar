<template>
  <div class="full-width">
    <div class="q-my-lg text-center text-h4">Resultados del Proceso</div>
    <q-separator inset />
    <div class="q-px-lg q-mt-md" v-for="(pos, i) in process" :key="i">
      <div class="gt-xs text-h6">
        Resultados para el puesto de {{ pos.position }}
      </div>
      <div class="lt-sm text-h6">{{ pos.position }}:</div>
      <div
        class="full-width q-my-md q-px-lg flex items-center"
        v-for="(can, s) in pos.candidates"
        :key="s"
        :class="{ 'winner-candidate': compareVotes(can.counter, i) }"
      >
        <q-img
          class="shadow-5 candidate-img"
          :src="can.image"
          alt="imagen del acandidato"
        >
          <div
            class="absolute-bottom text-subtitle2 text-center"
            style="padding: 0"
          >
            {{ can.name }}
          </div>
        </q-img>
        <q-linear-progress
          size="50px"
          :value="getpercent(can.counter, totalVotes[i])"
          color="primary"
          class="vote-counter"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="accent"
              text-color="white"
              :label="can.counter + ' votos'"
            />
          </div>
        </q-linear-progress>
      </div>
    </div>
    <q-separator class="q-my-md" inset />
    <div class="q-px-lg q-mb-xl" style="position: relative">
      <div class="text-center text-h6 q-mb-lg">Relacion de ususarios</div>
      <q-linear-progress
        size="50px"
        color="positive"
        :value="getpercent(totalUsers[1], totalUsers[0])"
        class="user-counter"
      >
        <div
          class="absolute-full flex justify-start"
          style="height: 20px; z-index: 1"
        >
          <q-badge
            color="accent"
            text-color="white"
            :label="totalUsers[1] + ' votaron'"
          />
        </div>
      </q-linear-progress>
      <q-linear-progress
        reverse
        size="50px"
        color="negative"
        :value="getpercent(totalUsers[2], totalUsers[0])"
        class="user-counter"
      >
        <div
          class="absolute-full flex justify-end"
          style="height: 20px; z-index: 1"
        >
          <q-badge
            color="accent"
            text-color="white"
            :label="totalUsers[2] + ' no votaron'"
          />
        </div>
      </q-linear-progress>
    </div>
    <br />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useStore } from "src/pinia/user_session";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AdminStats",
  data() {
    const store = useStore();
    const $q = useQuasar();
    return {
      $q,
      store,
      process: [],
      totalUsers: [],
      process_obj: [],
      totalVotes: [],
      winners: [],
    };
  },
  created() {
    api
      .get(`/process/get-process-positions/${this.$route.params.id}`, {
        headers: { authorization: "Bearer " + this.store.getToken },
      })
      .then((res) => {
        this.process = res.data.message;
        this.process_obj = res.data.object;
        api
          .get(`/users/get-users/${this.process_obj.InstituteName}`)
          .then((res) => {
            if (res.data.status === "success") {
              console.log(res.data);
              var aux1 = res.data.message[0];
              var aux2 = res.data.message[1];
              var aux3 = aux1 - aux2;
              this.totalUsers.push(aux1, aux2, aux3);
            } else {
              console.log("error");
            }
            this.process.forEach((p) => {
              var aux = 0;
              var temp = 0;
              p.candidates.forEach((c) => {
                aux += c.counter;
                if (temp < c.counter) temp = c.counter;
              });
              this.totalVotes.push(aux);
              this.winners.push(temp);
            });
            if (this.process_obj.hasEnded === false) {
              this.$q.dialog({
                title: "alerta",
                message:
                  "Este proceso aun no ha finalizado, por lo que no se podran ver los datos correctamente",
              });
            }
          });
      });
  },
  methods: {
    getpercent(a, b) {
      return a / b;
    },
    compareVotes(counter, index) {
      if (counter === this.winners[index]) {
        return true;
      } else return false;
    },
  },
});
</script>

<style lang="sass" scoped>
.candidate-img
    transition: 0.25s
    max-width: 150px
    max-height: 150px
    body.screen--xs &
        height: 100px
        width: 100px
        border-radius: 5px
    body.screen--sm &
        height: 150px
        width: 150px
        border-radius: 10px
.vote-counter
    transition: 0.25s
    max-width: calc(100% - 100px)
    width: calc(100% - 150px)
    body.screen--xs &
        width: calc(100% - 100px)
    body.screen--sm &
        width: calc(100% - 150px)
.winner-candidate
    background: rgba(63,191,65,0.1)
.user-counter
    position: absolute
    width: 85%
    margin: 0 auto
    left: 0
    right: 0
</style>

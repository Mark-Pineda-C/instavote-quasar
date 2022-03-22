<template>
  <q-card class="gt-xs q-pa-md q-ma-lg indications-card shadow-10">
    <q-card-section class="text-center">
      <div class="text-h4">Inidicaciones a tomar en cuenta</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <ul>
        <li>
          Se va a tomar un determinado tiempo para realizar el proceso electoral
          el cual sera <strong>5 minutos</strong>
        </li>
        <li>
          Una vez pasado el lapso de tiempo no podra volver a realizar la
          eleccion
        </li>
        <li>
          El proceso de votacion se cerrara el dia <strong>{{ data }}</strong>
        </li>
        <li>
          <strong
            >SOLO TENDRAS UNA OPORTUNIDAD PARA EMITIR TU VOTO. SALIR DE LA
            PAGINA SE CONTARA COMO ABANDONO Y NO SE VOLVERA A PERMITIR ENTRAR A
            LA VOTACION</strong
          >
        </li>
      </ul>
    </q-card-section>
    <q-separator />
    <q-card-actions class="flex flex-center q-mt-lg">
      <q-btn color="negative" @click="logout">Regresar</q-btn>
      <q-btn @click="gotoVote" color="positive">Iniciar</q-btn>
    </q-card-actions>
  </q-card>
  <div class="lt-sm">
    <div class="text-center text-h4 q-px-sm">
      INDICACIONES A TOMAR EN CUENTA
    </div>
    <q-separator inset />
    <div class="q-mt-md q-px-md">
      <ul>
        <li>
          Se va a tomar un determinado tiempo para realizar el proceso electoral
          el cual sera <strong>5 minutos</strong>
        </li>
        <li>
          Una vez pasado el lapso de tiempo no podra volver a realizar la
          eleccion
        </li>
        <li>
          El proceso de votacion se cerrara el dia <strong>{{ data }}</strong>
        </li>
        <li>
          <strong
            >SOLO TENDRAS UNA OPORTUNIDAD PARA EMITIR TU VOTO. SALIR DE LA
            PAGINA SE CONTARA COMO ABANDONO Y NO SE VOLVERA A PERMITIR ENTRAR A
            LA VOTACION</strong
          >
        </li>
      </ul>
    </div>
    <q-separator inset />
    <div class="flex flex-center q-mt-md" style="gap: 20px">
      <q-btn color="negative" @click="logout">Regresar</q-btn>
      <q-btn @click="gotoVote" color="positive">Iniciar</q-btn>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { useStore } from "../pinia/user_session";
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { DateTime } from "luxon";

export default defineComponent({
  name: "ProcessHome",
  data() {
    var store = useStore();
    const $q = useQuasar();
    return {
      store,
      $q,
      data: "",
    };
  },
  created() {
    api.get("process/get-process-list").then((response) => {
      var Data = response.data;
      console.log(Data);
      if (Data.status === "success") {
        var process = Data.message;
        process.forEach((proc) => {
          if (proc._id.toString() === this.$route.params.id) {
            this.data = DateTime.fromISO(proc.ProcessDateEnd).toFormat(
              "dd 'a las' HH:mm"
            );
          }
        });
      }
    });
  },
  methods: {
    logout() {
      api
        .post(
          "/users/logout/",
          { id: this.store.getCode },
          {
            headers: { Authorization: "Bearer " + this.store.getToken },
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            this.$q.localStorage.clear();
            this.store.$reset();
            this.$router.push("/");
          } else {
            console.log(res);
            this.$q.notify({
              progress: true,
              type: "negative",
              message: "ocurrio un error inesperado",
            });
          }
        });
    },
    gotoVote() {
      this.$router.push("main");
    },
  },
});
</script>

<style lang="sass" scoped>
.indications-card
    max-width: 80%
</style>

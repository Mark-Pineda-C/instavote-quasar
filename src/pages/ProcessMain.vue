<template>
  <div class="flex flex-center column full-width">
    <PositionBar
      v-for="(pos, index) in positions"
      :key="index"
      :value="pos"
      :i="index"
      @insert-vote="insertVote"
    ></PositionBar>
    <div class="q-mt-lg">
      <q-btn color="accent" label="Emitir Voto" @click="packVote" />
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { api } from "boot/axios";
import { useStore } from "../pinia/user_session";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ProcessMain",
  components: {
    PositionBar: defineAsyncComponent(() =>
      import("../components/PositionBar.vue")
    ),
  },
  data() {
    var store = useStore();
    const $q = useQuasar();
    var toHandler;
    return {
      $q,
      store,
      toHandler,
      positions: [],
      vote: {
        process: this.$route.params.id,
        voteIds: [],
      },
    };
  },
  created() {
    api
      .get(`/process/get-process-positions/${this.$route.params.id}`, {
        headers: { authorization: "Bearer " + this.store.getToken },
      })
      .then((res) => {
        this.positions = res.data.message;
      });
    this.toHandler = setTimeout(() => {
      this.timeout();
    }, 300000);
  },
  methods: {
    insertVote(id, index) {
      const getIndex = (el) => el.forPosition === index;
      if (this.vote.voteIds.findIndex(getIndex) === index) {
        this.vote.voteIds[index].candidate = id;
      } else {
        this.vote.voteIds.push({ forPosition: index, candidate: id });
      }
    },
    packVote() {
      api
        .post("/votes/create-vote", this.vote, {
          headers: { authorization: "Bearer " + this.store.getToken },
        })
        .then((res) => {
          if (res.data.status === "success") {
            api
              .put(
                "/users/update-vote/",
                { id: this.store.getCode },
                {
                  headers: { authorization: "Bearer " + this.store.getToken },
                }
              )
              .then((res) => {
                if (res.data.status === "success") {
                  this.$q
                    .dialog({
                      title: "Emision de voto",
                      message:
                        "Voto emitido con exito. Se le regresara al inicio",
                      persistent: true,
                    })
                    .onOk(() => {
                      clearTimeout(this.toHandler);
                      this.$q.localStorage.clear();
                      this.store.$reset();
                      this.$router.push("/");
                    });
                } else {
                  console.log(res.data);
                  this.$q.notify({
                    progress: true,
                    message: "Ocurrio un error. intente de nuevo",
                    type: "negative",
                  });
                }
              });
          } else {
            this.$q.notify({
              progress: true,
              message: "Ocurrio un error. intente de nuevo",
              type: "negative",
            });
          }
        });
    },
    timeout() {
      this.$q
        .dialog({
          title: "Alerta",
          message: "se le acabo el tiempo. Se cerrara la sesion",
          persistent: true,
        })
        .onOk(() => {
          api.put(
            "/users/update-vote/",
            { id: this.store.getCode },
            {
              headers: { authorization: "Bearer " + this.store.getToken },
            }
          );
          this.$q.localStorage.clear();
          this.store.$reset();
          this.$router.push("/");
        });
    },
  },
  unmounted() {
    api.put(
      "/users/update-vote/",
      { id: this.store.getCode },
      {
        headers: { authorization: "Bearer " + this.store.getToken },
      }
    );
    clearTimeout(this.toHandler);
    this.$q.localStorage.clear();
  },
});
</script>

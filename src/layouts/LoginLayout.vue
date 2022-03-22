<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container class="flex flex-center bg-primary" style="height: 100vh">
      <q-page-sticky position="top-left" :offset="[18, 18]">
        <q-btn round push color="secondary" icon="arrow_back" to="/home" />
      </q-page-sticky>
      <q-card class="q-ma-md login-card shadow-10">
        <q-card-section>
          <div class="text-h5 text-center">
            <span class="text-secondary">InstaVote</span> LOGIN
          </div>
        </q-card-section>
        <q-separator inset color="primary" />
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              label="Id de acceso"
              v-model="id"
              :rules="[
                (val) => (val && val.length > 0) || 'No deje el campo vacio',
              ]"
              lazy-rules
            />
            <q-input
              label="Pin de acceso"
              :type="isPwd ? 'password' : 'text'"
              v-model="pin"
              :rules="[
                (val) => (val && val.length > 0) || 'No deje el campo vacio',
              ]"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="q-mt-xl flex flex-center">
              <q-btn label="Iniciar Sesion" color="accent" @click="Login" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "../pinia/user_session";

export default defineComponent({
  name: "LoginLayout",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    return {
      store,
      isPwd: ref(true),
      id: ref(""),
      pin: ref(""),
    };
  },
  methods: {
    Login() {
      var params = {};
      params.id = this.id;
      params.pin = this.pin;
      if (this.$route.params.id) {
        params.institute = this.$route.params.id;
      }
      if (!this.$route.params.id) {
        api
          .post("/users/validate-admin", params)
          .then((response) => {
            var myData = response.data;

            if (myData.status === "success") {
              if (myData.role === "ADMIN") {
                this.store.setToken(myData.token);
                this.store.setData(myData.message._id.toString(), myData.role);
                this.$router.push("/admin");
              }
            } else {
              this.$q.notify({
                progress: true,
                message: myData.message,
                type: "negative",
              });
            }
          })
          .catch((err) => {
            this.$q.notify({
              progress: true,
              message: "Ocurrio un error en el sistema",
              type: "negative",
            });
            console.log(err);
          });
      } else {
        api
          .post("/users/validate", params)
          .then((response) => {
            var myData = response.data;
            console.log(myData);
            if (myData.status === "success") {
              if (myData.role === "USER") {
                this.store.setToken(myData.token);
                this.store.setData(myData.user, myData.role);
                this.$router.push({
                  path: `/process/${myData.message}/start`,
                });
              }
            } else {
              if (myData.type === 1) {
                this.$q
                  .dialog({
                    title: "Alerta",
                    message: myData.message,
                  })
                  .onOk(() => {
                    this.$router.go(-1);
                  });
              } else {
                this.$q.notify({
                  progress: true,
                  message: myData.message,
                  type: "negative",
                });
              }
            }
          })
          .catch((err) => {
            this.$q.notify({
              progress: true,
              message: "Ocurrio un error en el sistema",
              type: "negative",
            });
            console.log(err);
          });
      }
    },
  },
});
</script>

<style lang="sass" scoped>
.login-card
    width: 300px
</style>

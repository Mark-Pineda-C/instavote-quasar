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

export default defineComponent({
  name: "LoginLayout",
  setup() {
    return {
      isPwd: ref(true),
      id: ref(""),
      pin: ref(""),
    };
  },
  methods: {
    Login() {
      var params = new URLSearchParams();
      params.append("id", this.id);
      params.append("pin", this.pin);
      if (this.$route.params.id) {
        params.append("institute", this.$route.params.id);
      }
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      if (!this.$route.params.id) {
        alert("ingresando como ADMIN");
        api
          .post("/users/validate-admin", params, config)
          .then((response) => {
            var myData = response.data;

            if (myData.status === "success") {
              if (myData.role === "ADMIN") {
                alert("Bienvenido, administrador");
                this.$router.push("/admin/create");
              }
            } else {
              alert(myData.status);
            }
          })
          .catch((err) => {
            alert("Ocurrio un error");
            console.log(err);
          });
      } else {
        api
          .post("/users/validate", params, config)
          .then((response) => {
            var myData = response.data;
            console.log(myData);
            if (myData.status === "success") {
              if (myData.role === "USER") {
                alert("Usuario correcto");
                this.$router.push({
                  path: `/process/${myData.message}/start`,
                });
              }
            } else {
              alert(myData.message);
              alert("fail");
            }
          })
          .catch((err) => {
            alert("Ocurrio un error");
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

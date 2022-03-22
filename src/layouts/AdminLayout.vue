<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn round flat to="/admin">
            <q-avatar>
              <img src="../assets/CIP_logo.png" />
            </q-avatar>
          </q-btn>
          InstaVote Dashboard
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="default"
      elevated
    >
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item
          clickable
          v-ripple
          active-class="text-secondary"
          to="/admin/create"
        >
          <q-item-section avatar>
            <q-icon name="create" />
          </q-item-section>
          <q-item-section>Nuevo Proceso</q-item-section>
        </q-item>
        <q-expansion-item expand-separator icon="equalizer" label="Procesos">
          <q-item
            v-for="(p, i) in processes"
            :key="i"
            clickable
            v-ripple
            active-class="text-secondary"
            :to="{
              name: 'stats',
              params: { id: p._id },
              props: { iName: p.InstituteName },
            }"
            class="indent"
          >
            <q-item-section avatar>
              <q-icon name="subdirectory_arrow_right" />
            </q-item-section>
            <q-item-section>{{ p.ProcessName }}</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item clickable v-ripple @click="closeSession">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Cerrar Sesion</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "../pinia/user_session";
import { api } from "../boot/axios";

export default defineComponent({
  name: "AdminLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const store = useStore();
    return {
      store,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      processes: [],
    };
  },
  created() {
    api.get("process/get-process-list").then((response) => {
      var Data = response.data;
      if (Data.status === "success") {
        this.processes = Data.message;
      }
    });
  },
  methods: {
    closeSession() {
      this.$q.localStorage.clear();
      this.store.$reset();
      this.$router.push("/");
    },
  },
});
</script>

<style lang="sass" scoped>
.indent
  padding-left: 72px
</style>

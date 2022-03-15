<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      elevated
    >
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item clickable v-ripple active-class="text-secondary" to="create">
          <q-item-section avatar>
            <q-icon name="create" />
          </q-item-section>
          <q-item-section>Nuevo Proceso</q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="text-secondary" to="dashboard">
          <q-item-section avatar>
            <q-icon name="equalizer" />
          </q-item-section>
          <q-item-section>Procesos Activos</q-item-section>
        </q-item>
        <q-list class="rounded-borders text-primary q-ml-md">
          <q-item clickable v-ripple active-class="text-secondary">
            <q-item-section avatar>
              <q-icon name="subdirectory_arrow_right" />
            </q-item-section>
            <q-item-section>Processo a</q-item-section>
          </q-item>
          <q-item clickable v-ripple active-class="text-secondary">
            <q-item-section avatar>
              <q-icon name="subdirectory_arrow_right" />
            </q-item-section>
            <q-item-section>Processo b</q-item-section>
          </q-item>
          <q-item clickable v-ripple active-class="text-secondary">
            <q-item-section avatar>
              <q-icon name="subdirectory_arrow_right" />
            </q-item-section>
            <q-item-section>Processo c</q-item-section>
          </q-item>
        </q-list>
        <q-separator spaced />
        <q-item clickable v-ripple active-class="text-secondary" to="settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Configuracion</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AdminLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

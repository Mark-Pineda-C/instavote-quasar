<template>
  <q-layout view="hHr lpr fff">
    <q-header elevated class="bg-primary text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title shrink>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <strong class="q-ml-sm">Insta Vote</strong>
        </q-toolbar-title>
        <q-space />
        <q-tabs
          shrink
          no-caps
          indicator-color="secondary"
          active-color="secondary"
          class="gt-xs"
        >
          <q-route-tab to="/home" label="Inicio" />
          <q-route-tab to="/activities" label="Procesos Activos" />
          <q-route-tab to="/about" label="Sobre Nosotros" />
          <q-route-tab to="/contact" label="Contacto" />
          <q-route-tab to="/login" icon="supervisor_account" />
        </q-tabs>
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="xs"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
      overlay
      style="z-index: 10000"
    >
      <q-list bordered separator>
        <q-item clickable to="home" active-color="secondary">
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item clickable to="activities" active-color="secondary">
          <q-item-section>Procesos Activos</q-item-section>
        </q-item>
        <q-item clickable to="about" active-color="secondary">
          <q-item-section>Sobre Nosotros</q-item-section>
        </q-item>
        <q-item clickable to="contact" active-color="secondary">
          <q-item-section>Contactanos</q-item-section>
        </q-item>
        <q-item clickable to="/login">
          <q-item-section>Ingreso Admin</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TestLayout",
  setup() {
    const rightDrawerOpen = ref(false);
    const $q = useQuasar();

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>

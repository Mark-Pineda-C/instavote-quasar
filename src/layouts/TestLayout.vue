<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title shrink>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Insta Vote
        </q-toolbar-title>
        <q-space />
        <q-tabs shrink>
          <q-route-tab to="/home" label="Inicio" />
          <q-route-tab to="/page1" label="Procesos Activos" />
          <q-route-tab to="/page2" label="Sobre Nosotros" />
          <q-route-tab to="/page3" label="Contacto" />
          <q-route-tab to="/page3" icon="supervisor_account" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TestLayout",
});
</script>

<style></style>

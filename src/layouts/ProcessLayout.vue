<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/CIP_logo.png" />
          </q-avatar>
          Insta Vote
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container
      class="flex flex-center"
      style="height: calc(100vh - 50px)"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProcessLayout",
});
</script>

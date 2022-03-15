<template>
  <q-card
    class="q-ma-md process-card shadow-10 flex flex-center"
    @click="goToLogin"
  >
    <q-card-section horizontal class="q-ma-none">
      <q-card-section class="text-h4">{{ value.InstituteName }}</q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProcessCard",
  props: ["value"],
  methods: {
    goToLogin() {
      this.$router.push({ path: `/login/${this.value.InstituteName}` });
    },
  },
});
</script>

<style lang="sass" scoped>
.process-card
    width: 350px
    height: 120px
    overflow: hidden
    transition: 0.25s
    cursor: pointer
.process-card::before
    content: ''
    position: absolute
    left: 0px
    width: 10px
    height: 100%
    background: var(--q-secondary)
    transition: 0.25s
.process-card:hover
    filter: contrast(80%)
.process-card:hover::before
    background-color: var(--q-positive)
</style>

<template>
  <q-card
    class="q-ma-md process-card shadow-10 flex flex-center"
    @click="goToLogin"
  >
    <q-card-section horizontal class="q-ma-none">
      <q-card-section class="process-name">{{
        value.InstituteName
      }}</q-card-section>
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
    body.screen--sm &
      height: 120px
    body.screen--xs &
      height: 80px
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
.process-name
  transition: 0.25s
  font-size: 2.125rem
  font-weight: 400
  body.screen--sm &
    font-size: 2.125rem
    font-weight: 400
  body.screen--xs &
    font-size: 1.25rem
    font-weight: 500
</style>

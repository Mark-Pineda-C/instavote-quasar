<template>
  <div class="q-ma-lg">
    <h4>Sobre Nosotros</h4>
    <hr />
    <h6>Conoce al equipo:</h6>
    <div class="flex flex-center q-mt-lg" style="gap: 30px">
      <q-card class="shadow-10 overflow-hidden about-card">
        <q-card-section style="width: 100%" class="q-pa-xs">
          <q-img
            src="https://scontent.flim28-1.fna.fbcdn.net/v/t39.30808-6/241040021_4320811927995053_3179411923085951869_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHgExGq7tb3vuHzIDrMvh_5mS95VjAe34yZL3lWMB7fjASKGO46RcaFiGTRdaC2QXB6RDPa7VZQPtjhag8vD0GR&_nc_ohc=O70mFek4xKAAX83qvDm&_nc_ht=scontent.flim28-1.fna&oh=00_AT80G4QFfW5_VbLoMGqHRqOj-h5PxHkxosevUj0dg04aiA&oe=623DCA79"
            alt="Candidato"
          >
            <div
              class="absolute-bottom text-subtitle2 text-center"
              style="padding: 0"
            >
              Mark Pineda
            </div>
          </q-img>
        </q-card-section>
      </q-card>
      <q-card class="shadow-19 overflow-hidden about-card">
        <q-card-section style="width: 100%" class="q-pa-xs">
          <q-img
            src="https://scontent.flim28-1.fna.fbcdn.net/v/t31.18172-8/28165128_1700803883310014_3080110726840709384_o.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGUAFWqrM5B_6ORHXn9kXW4uR-I-ltK3-q5H4j6W0rf6pL6om6CqJww4foYzuZRQTBGynkguSqUApv6HKQCnbCC&_nc_ohc=qSctwdnMT-EAX8Uv-uu&_nc_ht=scontent.flim28-1.fna&oh=00_AT-vNL9bI_K7p6K-qHNYPyIjOFxjMdXPLrqQJ2Iy6OrOFw&oe=625ED59D"
            alt="Candidato"
          >
            <div
              class="absolute-bottom text-subtitle2 text-center"
              style="padding: 0"
            >
              Cristhian Rivero
            </div>
          </q-img>
        </q-card-section>
      </q-card>
      <q-card class="shadow-10 overflow-hidden about-card">
        <q-card-section style="width: 100%" class="q-pa-xs">
          <q-img
            src="https://scontent.flim12-1.fna.fbcdn.net/v/t1.18169-9/21613_940427162700951_7633807326852648509_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFEvHpdJpvw80i-spGQ5Y0VHDsVsrdmRDYcOxWyt2ZENsc-ZtRb5_tdDqPRR42e9TpY4cMVrtMenYzLul8IWjud&_nc_ohc=x-qMPXF1FFMAX9tVZkG&_nc_ht=scontent.flim12-1.fna&oh=00_AT9mVXfBC8PXakk0wubjBExmiMw2norcWupPA3BvaSgIrw&oe=625F1A3F"
            alt="Candidato"
          >
            <div
              class="absolute-bottom text-subtitle2 text-center"
              style="padding: 0"
            >
              Jesus Teves
            </div>
          </q-img>
        </q-card-section>
      </q-card>
      <q-card class="shadow-10 overflow-hidden about-card">
        <q-card-section style="width: 100%" class="q-pa-xs">
          <q-img
            src="https://scontent.flim28-1.fna.fbcdn.net/v/t31.18172-8/21273136_1435991759855473_5794679245101655280_o.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGj7MQa8ELAvRqP3itJ-KcqXwbx9b-7aH1fBvH1v7tofSdqW6hPFvV84M8mHwfuqojYe8m7B2hylwdtV2tTmKz-&_nc_ohc=juFFwCkKAR8AX9uWTOi&_nc_ht=scontent.flim28-1.fna&oh=00_AT-2hNR-rqXJkpRu6x7Flf5_usNpO0TsUTeQ28RA7ztMOg&oe=625D1642"
            alt="Candidato"
          >
            <div
              class="absolute-bottom text-subtitle2 text-center"
              style="padding: 0"
            >
              Alexander Santos
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainAbout",
});
</script>

<style lang="sass" scoped>
.about-card
  width: 200px
</style>

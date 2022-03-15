<template>
  <div class="q-ma-md full-width q-pa-xl">
    <q-stepper v-model="step" vertical done-color="positive" animated>
      <q-step
        :name="1"
        title="1. Informacion general"
        icon="settings"
        :done="step > 1"
      >
        <q-form @submit.prevent="step++">
          <div class="row q-gutter-x-md">
            <div class="col">
              <q-input
                v-model="Process.InstitueName"
                label="Nombre de la Insitutcion"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Porfavor no deje el campo vacio',
                ]"
                lazy-rules
              />
              <q-input
                v-model="date"
                label="Fecha del Proceso"
                stack-label
                type="date"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Porfavor no deje el campo vacio',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="Process.ProcessName"
                label="Nombre del Proceso"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Porfavor no deje el campo vacio',
                ]"
                lazy-rules
              />
              <div class="row q-gutter-x-md">
                <div class="col">
                  <q-input
                    v-model="time"
                    label="Hora de inicio"
                    stack-label
                    type="time"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Porfavor no deje el campo vacio',
                    ]"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model.number="Process.ProcessDuration"
                    label="Duracion del proceso"
                    stack-label
                    type="number"
                    :rules="
                      ([
                        (val) =>
                          (val && val.length > 0) ||
                          'Porfavor no deje el campo vacio',
                      ],
                      [(val) => val > 0 || 'Porfavor Ingrese un valor real'])
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <q-stepper-navigation class="q-mt-none">
            <q-btn type="submit" color="accent" label="Siguiente" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
      <q-step
        :name="2"
        title="2. Posiciones y candidatos"
        icon="group"
        :done="Process.Positions[0].candidates.length > 0 && step > 2"
        :error="Process.Positions[0].candidates.length < 1 && step > 2"
      >
        <q-form @submit.prevent="step++">
          <div v-for="(pos, index) in Process.Positions" :key="index">
            <q-input
              bottom-slots
              v-model="pos.position"
              label="Nuevo Proceso"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor no deje el campo vacio',
              ]"
              lazy-rules
            >
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  icon="person_add"
                  @click="AddCandidate(index)"
                />
                <q-btn round dense flat icon="add" @click="CreatePosition()" />
                <q-btn
                  round
                  dense
                  flat
                  icon="remove"
                  @click="RemovePosition(index)"
                />
              </template>
            </q-input>
            <div
              v-if="pos.candidates.length > 0"
              class="q-mt-md q-gutter-x-xl q-gutter-y-md flex"
            >
              <CandidateForm
                v-for="(can, subindex) in pos.candidates"
                :key="subindex"
                :value="can"
                @Remove-Candidate="RemoveCandidate(index, subindex)"
              ></CandidateForm>
            </div>
          </div>

          <q-stepper-navigation class="q-gutter-x-lg">
            <q-btn @click="step--" label="volver" />
            <q-btn type="submit" color="accent" label="Siguiente" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
      <q-step
        :name="3"
        title="3. Usuarios del proceso"
        icon="upload"
        :done="Users.length > 0 && step > 3"
        :error="Users.length < 1 && step > 3"
      >
        <q-card class="q-ma-md flex flex-center full-width csv-card">
          <input
            type="file"
            accept=".csv"
            class="invisible-input full-width"
            @change="readCSV"
          />
          <q-card-section class="csv-card-step" v-if="fileStatus === 0"
            >Haga click aqui o Arraste el archivo .csv</q-card-section
          >
          <q-card-section
            class="csv-card-step flex flex-center column"
            v-if="fileStatus === 2"
          >
            <q-avatar color="positive" icon="done" />
            <p>El archivo se subio correctamente.</p>
          </q-card-section>
          <q-card-section
            class="csv-card-step flex flex-center column"
            v-if="fileStatus === 3"
          >
            <q-avatar color="negative" icon="clear" />
            <p>Ocurrio un error al subir el archivo.</p>
          </q-card-section>
          <q-inner-loading :showing="fileStatus === 1" label="Cargando..." />
        </q-card>
        <q-stepper-navigation class="q-gutter-x-lg">
          <q-btn @click="step--" label="volver" />
          <q-btn @click="step++" color="accent" label="Continue" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="4"
        title="4. Verificacion de datos"
        icon="archive"
        :done="step > 4"
      >
        <q-list bordered separator>
          <q-item>
            <q-item-section>Nombre :</q-item-section>
            <q-item-section side>{{ Process.ProcessName }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Institucion :</q-item-section>
            <q-item-section side>{{ Process.InstitueName }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Nombre :</q-item-section>
            <q-item-section side>{{ Process.ProcessName }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Fecha :</q-item-section>
            <q-item-section side
              >{{ Process.ProcessDate }} {{ time }}, duración:
              {{ Process.ProcessDuration }} hora(s)</q-item-section
            >
          </q-item>
          <q-item>
            <q-item-section>Cantidad de usuarios :</q-item-section>
            <q-item-section side>{{ Users.length - 1 }}</q-item-section>
          </q-item>
        </q-list>
        <q-stepper-navigation class="q-gutter-x-lg">
          <q-btn @click="step--" label="volver" />
          <q-btn
            color="accent"
            label="Registrar Proceso"
            @click="sendProcess()"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, reactive } from "vue";
import CandidateForm from "../components/CandidateForm.vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "AdminCreate",
  components: {
    CandidateForm: CandidateForm,
  },
  setup() {
    var step = ref(1);
    const $q = useQuasar();
    var fileStatus = ref(0);

    return {
      fileStatus,
      step,
      time: ref(""),
      date: ref(""),
      Process: reactive({
        InstitueName: ref(""),
        ProcessName: ref(""),
        ProcessDate: ref(""),
        ProcessDuration: ref(""),
        Positions: reactive([
          {
            position: ref(""),
            candidates: ref([]),
          },
        ]),
      }),
      Users: reactive([]),
      CreatePosition() {
        this.Process.Positions.push({
          position: ref(""),
          candidates: ref([]),
        });
      },
      RemovePosition(index) {
        this.Process.Positions.splice(index, 1);
      },
      RemoveCandidate(i, s) {
        this.Process.Positions[i].candidates.splice(s, 1);
      },
      AddCandidate(index) {
        this.Process.Positions[index].candidates.push({
          name: ref(""),
          group: ref(""),
          image: ref(null),
        });
      },
      readCSV(e) {
        this.fileStatus = 1;
        var file = e.target.files || e.dataTransfer.files;
        if (file.length) {
          setTimeout(() => {
            this.readUsers(file[0]);
          }, 1500);
        }
      },
      readUsers(file) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.csvToArray(e.target.result, ",");
        };
        reader.readAsText(file);
      },
      csvToArray(str, delimiter) {
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        this.Users.splice(0, this.Users.length);
        try {
          rows.forEach((row) => {
            const values = row.split(delimiter);
            var obj = {};
            var count = 0;
            values.forEach((value) => {
              obj[headers[count].trim()] = value.trim();
              count++;
            });
            this.Users.push(obj);
            this.fileStatus = 2;
          });
        } catch (e) {
          this.Users.splice(0, this.Users.length);
          console.log(e);
          this.fileStatus = 3;
        }
      },
      sendProcess() {
        this.Users.pop();
        const params = {
          institute: this.Process.InstitueName,
          users: this.Users,
        };
        this.Process.ProcessDate = new Date(
          this.date + " " + this.time
        ).getTime();
        console.log(this.Process.ProcessDate);
        api.post("process/create-process", this.Process).then((p_res) => {
          if (p_res.data.status === "success") {
            api.post("users/insert-many", params).then((u_res) => {
              console.log(u_res.data.status);
              $q.notify({
                type: "positive",
                color: "positive",
                message: "Proceso registrado con exito",
              });
            });
          }
        });
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.invisible-input
    position: absolute
    opacity: 0
    cursor: pointer
    height: 100%
.csv-card
    position: relative
    cursor: pointer
    height: 150px
.csv-card-step
    pointer-events: none
    cursor: pointer
</style>

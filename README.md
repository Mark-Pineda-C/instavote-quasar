Tabla de contenidos

- [Instavote](#instavote)
- [Herramientas](#herramientas)
- [Funciones](#funciones)
  - [vue](#vue)
  - [quasar](#quasar)
  - [toggleDrawer](#toggledrawer)
  - [login](#login)
  - [closesesion](#closesesion)
  - [ADMIN](#admin)
    - [createPosition / addCandidate](#createposition--addcandidate)
    - [RomovePosition/Candidate](#romovepositioncandidate)
    - [Creacion y lectura CSV a JSON](#creacion-y-lectura-csv-a-json)
    - [sendProcess](#sendprocess)
    - [get status / set colors](#get-status--set-colors)
  - [USER](#user)
    - [respecto a los votos](#respecto-a-los-votos)
    - [logout](#logout)
    - [gotoVote](#gotovote)
    - [insertVote](#insertvote)
    - [packVote](#packvote)
    - [timeout](#timeout)
- [Indicaciones de instalacion](#indicaciones-de-instalacion)

# Instavote

Aplicacion web del sistema _Instavote_ con el framework Quasar. Este es un sistema en el que se implementara el voto electronico como su principal función

# Herramientas

Las herramientas utilizadas en este proyecto son

- [Quasar](https://quasar.dev/start/pick-quasar-flavour)
- [Vue](https://vuejs.org/)
- [Axios](https://axios-http.com/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Pinia](https://pinia.vuejs.org/)

# Funciones

Todas las funciones utilizadas en la aplicación

### vue

Para mayor informacion, lea la documentacion [aqui](https://vuejs.org/guide/introduction.html)

### quasar

Para mayor informacion, lea la documentacion [aqui](https://quasar.dev/start/pick-quasar-flavour)

### toggleDrawer

Esta funcion sirve para alternar el estado de activacion del menu de contenido

```javascript
toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      }
```

### login

Esta funcion nos permitira ingresar al sistema, reconociendo si se trata de un usuario o un administrador, para asi referirlos a cada seccion respectivamente

```javascript
Login() {
    var params = {};
    params.id = this.id;
    params.pin = this.pin;
    if (this.$route.params.id) {
        params.institute = this.$route.params.id;
    }
    if (!this.$route.params.id) {
        api.post("/users/validate-admin", params)
            .then((response) => {
                var myData = response.data;
                if (myData.status === "success") {
                    if (myData.role === "ADMIN") {
                    this.store.setToken(myData.token);
                    this.store.setData(myData.message._id.toString(), myData.role);
                    this.$router.push("/admin");
                }
                } else {
                    this.$q.notify({
                    progress: true,
                    message: myData.message,
                    type: "negative",
                });
                }
            })
            .catch((err) => {
                this.$q.notify({
                progress: true,
                message: "Ocurrio un error en el sistema",
                type: "negative",
                });
                console.log(err);
            });
    } else {
            api
            .post("/users/validate", params)
            .then((response) => {
                var myData = response.data;
                console.log(myData);
                if (myData.status === "success") {
                if (myData.role === "USER") {
                    this.store.setToken(myData.token);
                    this.store.setData(myData.user,myData.role);
                    this.$router.push({
                    path: `/process/${myData.message}/start`,
                    });
                }
                } else {
                if(myData.type === 1){
                    this.$q.dialog({
                    title: 'Alerta',
                    message: myData.message,
                    }).onOk(() => {
                        this.$router.go(-1);
                    });
                } else {
                    this.$q.notify({
                    progress: true,
                    message: myData.message,
                    type: "negative"
                    });
                }

                }
            })
            .catch((err) => {
                this.$q.notify({
                progress: true,
                message: "Ocurrio un error en el sistema",
                type: "negative",
                });
                console.log(err);
            });
        }
    }
```

### closesesion

Esta funcion deshará las acciones del login y nos redirigirá a la pagina de inicio

```javascript
closeSession() {
    this.$q.localStorage.clear();
    this.store.$reset();
    this.$router.push("/");
}
```

## ADMIN

Funciones del administrador

### createPosition / addCandidate

Esta funcion agregara una nueva posicion / candidato al proceso por crearse

```javascript
CreatePosition() {
    this.Process.Positions.push({
        position: ref(""),
        candidates: ref([]),
    });
},
AddCandidate(index) {
    this.Process.Positions[index].candidates.push({
        name: ref(""),
        group: ref(""),
        image: ref(null),
    });
}
```

### RomovePosition/Candidate

Estas funciones nos permiten remover posiciones o candidatos del proceso a crear

```javascript
RemovePosition(index) {
    this.Process.Positions.splice(index, 1);
},
RemoveCandidate(i, s) {
    this.Process.Positions[i].candidates.splice(s, 1);
}
```

### Creacion y lectura CSV a JSON

Este conjunto de funciones sirven para recoger un archivo .csv y los transforma en un archivo JSON para poder enviarlo al backend

```javascript
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
}
```

### sendProcess

Esta funcion enpaqueta toda la data de l a creacion de proceso para poder enviarla al backend

```javascript
sendProcess() {
    this.Users.pop();
    const params = {
        institute: this.Process.InstituteName,
        users: this.Users,
    };
    var final_date = DateTime.fromISO(
        this.date + "T" + this.time + ":00.000-05:00"
    );
    this.Process.ProcessDateStart = final_date.toISO();
    this.Process.ProcessDateEnd = final_date
        .plus({ hours: this.duration })
        .toISO();
    api.post("process/create-process", this.Process, {
        headers: { authorization: "Bearer " + this.store.getToken },
    }).then((p_res) => {
        if (!p_res) {
            this.$q.notify({
            type: "negative",
            color: "negative",
            message: "Ocurrio un eror.",
            });
        }
        if (p_res.data.status === "success") {
            api.post("users/insert-many", params, {
                headers: { authorization: "Bearer " + this.store.getToken },
            })
            .then((u_res) => {
                console.log(u_res.data.status);
                this.$q.notify({
                type: "positive",
                color: "positive",
                message: "Proceso registrado con exito",
                });
            });
        }
    });
}
```

### get status / set colors

Estas funciones obtienen el estado del proceso (inactivo, activo, finalizado, contabilizado) y les asigna un color

```javascript
getState(obj) {
    var start = DateTime.fromISO(obj.ProcessDateStart);
    var end = DateTime.fromISO(obj.ProcessDateEnd);
    if (DateTime.now().ts < start.ts) {
        return "Aun no esta activo";
    }
    if (DateTime.now().ts > start.ts && DateTime.now().ts < end.ts) {
        return "Esta en progreso";
    }
    if (DateTime.now().ts > end.ts && obj.hasEnded === false) {
        return "Procesando Votos...";
    }
    if (DateTime.now().ts > end.ts && obj.hasEnded === true) {
        return "Ha finalizado";
    }
    return "";
},
setColor(str) {
    if (str === "Aun no esta activo") {
        return "text-accent";
    }
    if (str === "Esta en progreso") {
        return "text-positive";
    }
    if (str === "Procesando Votos...") {
        return "text-accent";
    }
    if (str === "Ha finalizado") {
        return "text-negative";
    }
    return "text-warning";
}
```

## USER

Funciones de los usuarios

### respecto a los votos

tenemos las funciones para obtener el porcentaje en relacion al contador de votos de un candidato con respecto a los votos totales, y una funcion que comprar los contadores y asigna al candidato ganador

```javascript
getpercent(a, b) {
    return a / b;
},
compareVotes(counter, index) {
    if (counter === this.winners[index]) {
        return true;
    } else return false;
}
```

### logout

Esta funcion cierra la sesion de un usuario, manteniendo su acceso a la votacion

```javascript
logout() {
    api.post(
        "/users/logout/",
        { id: this.store.getCode },
        { headers: { Authorization: "Bearer " + this.store.getToken } }
    ).then((res) => {
        if (res.data.status === "success") {
            this.$q.localStorage.clear();
            this.store.$reset();
            this.$router.push("/");
        } else {
            console.log(res);
            this.$q.notify({
                progress: true,
                type: "negative",
                message: "ocurrio un error inesperado",
            });
        }
    });
}
```

### gotoVote

Esta funcion da pase al usuario a la pagina de votacion

```javascript
gotoVote() {
    this.$router.push("main");
}
```

### insertVote

Esta funcion recoge las el id de los candidatos selecionados por el usuario

```javascript
insertVote(id, index) {
    const getIndex = (el) => el.forPosition === index;
    if (this.vote.voteIds.findIndex(getIndex) === index) {
        this.vote.voteIds[index].candidate = id;
    } else {
        this.vote.voteIds.push({ forPosition: index, candidate: id });
    }
}
```

### packVote

Esta funcion empaqueta los datos de la votación y los envia al backend

```javascript
packVote() {
    api.post("/votes/create-vote", this.vote, {
        headers: { authorization: "Bearer " + this.store.getToken },
    }).then((res) => {
        if (res.data.status === "success") {
            api.put("/users/update-vote/",
                { id: this.store.getCode },
                { headers: { authorization: "Bearer " + this.store.getToken } }
            ).then((res) => {
                if (res.data.status === "success") {
                    this.$q.dialog({
                        title: "Emision de voto",
                        message:
                        "Voto emitido con exito. Se le regresara al inicio",
                        persistent: true,
                    }).onOk(() => {
                        clearTimeout(this.toHandler);
                        this.$q.localStorage.clear();
                        this.store.$reset();
                        this.$router.push("/");
                    });
                } else {
                    console.log(res.data);
                    this.$q.notify({
                        progress: true,
                        message: "Ocurrio un error. intente de nuevo",
                        type: "negative",
                    });
                }
            });
        } else {
            this.$q.notify({
                progress: true,
                message: "Ocurrio un error. intente de nuevo",
                type: "negative",
            });
        }
    });
}
```

### timeout

Esta funcion nos retira de la pagina de votacion una vez pasado 5 minutos despues de haber ingresado

```javascript
timeout() {
    this.$q.dialog({
        title: "Alerta",
        message: "se le acabo el tiempo. Se cerrara la sesion",
        persistent: true,
    }).onOk(() => {
        api.put("/users/update-vote/",
            { id: this.store.getCode },
            { headers: { authorization: "Bearer " + this.store.getToken } }
        );
        this.$q.localStorage.clear();
        this.store.$reset();
        this.$router.push("/");
    });
}
```

# Indicaciones de instalacion

Instalar todas las dependencias

```bash
npm install
```

Iniciar la aplicación en modo de desarrollador (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

Revisar los archivos

```bash
npm run lint
```

Dar formato a los archivos

```bash
npm run format
```

Crear aplicacion para producción

```bash
quasar build
```

Personalizar la configuración
Lee como [Configurar quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

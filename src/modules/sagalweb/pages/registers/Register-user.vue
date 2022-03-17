<template>
  <v-container class="">
    <h2 class="text-left pl-4 title2">
      {{ showEdit ? "Editar usuario" : "Control de usuarios" }}
    </h2>
    <v-row>
      <v-col cols="12" class="text-right pr-8">
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="modaldialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-plus-thick </v-icon>
              Nuevo usuario
            </v-btn>
          </template>
          <template>
            <v-card>
              <v-toolbar color="primary" dark>
                Registrar una nueva zona
                <v-spacer></v-spacer>
                <v-btn icon @click="cancelEdit()">
                  <v-icon color="white">mdi-close </v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form class="px-4" ref="form" lazy-validation>
                  <v-row class="d-block d-sm-flex">
                    <v-col xs="12" sm="6">
                      <v-text-field
                        class="mt-4"
                        clearable
                        name="name"
                        v-model="formRegister.name"
                        label="Nombre"
                        type="text"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      xs="12"
                      sm="6"
                      class="d-flex justify-center align-self-center"
                    >
                      <v-radio-group
                        v-model="formRegister.role"
                        row
                        mandatory
                        color
                      >
                        <v-radio
                          color="secondary"
                          label="Bodega"
                          value="3"
                        ></v-radio>
                        <v-radio
                          color="secondary"
                          label="Supervisor"
                          value="2"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col xs="12" sm="6">
                      <v-text-field
                        class="mt-4"
                        clearable
                        name="email"
                        v-model="formRegister.email"
                        label="Email"
                        type="text"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6">
                      <v-text-field
                        class="mt-4"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        clearable
                        name="contraseña"
                        v-model="formRegister.password"
                        label="Contraseña"
                        :type="show ? 'text' : 'password '"
                        @click="show = !show"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" v-if="formRegister.role == 2">
                      <v-select
                        v-on:change="zoneId"
                        item-text="name"
                        item-value="zone_id"
                        return-object
                        single-line
                        :items="zones"
                        label="Zona"
                      >
                      </v-select>
                    </v-col>
                    <v-col xs="12" sm="6" v-if="formRegister.role == 3">
                      <v-select
                        v-on:change="selectCity"
                        item-text="name"
                        item-value="id"
                        return-object
                        single-line
                        :items="cities"
                        label="Ciudad"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <v-btn
                        :class="
                          showEdit
                            ? 'd-flex-inline mt-4 mx-3 white--text'
                            : 'd-none mt-4 mx-3 white--text'
                        "
                        @click="cancelEdit"
                        color="red"
                        text
                        >Cancelar</v-btn
                      >
                      <v-btn
                        v-model="changeBtn"
                        class="mt-2"
                        :disabled="!isDisabled"
                        :color="showEdit ? 'secondary' : 'primary'"
                        @click="toggleBtn"
                      >
                        {{ showEdit ? "Editar" : "Guardar" }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col xs="12" sm="8" offset-sm="2">
        <div dense elevation="0" class="d-block d-sm-flex justify-space-between">
          <v-col xs="12" sm="5">
          <v-text-field
            v-model="searchInput"
            v-on:input="changeText"
            append-icon="mdi-magnify"
            label="Buscar por correo"
            single-line
            outlined
            dense
            hide-details
            class="shrink"
          ></v-text-field>
          </v-col>
          <v-col xs="12" sm="5">
            <v-select
          :items="roles"
          v-model="searchRoles"
          v-on:input="changeTextSelect"
          label="Filtrar por rol"
          item-text="name"
          item-value="role"
          outlined
          dense
          hide-details
          single-line
          clearable
          class="shrink"
          ></v-select>
          </v-col>
        </div>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="10"
          class="elevation-0"
          :footer-props="{itemsPerPageText: 'Lineas por página'}"
        >
          <template v-slot:[`item.email`]="{ item }">
            <router-link :to="{ name: 'pedidos', params: { id: item.id , name: item.name}}">
              {{ item.email }}
            </router-link>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }} 
          </template>
          <template v-slot:[`item.role`]="{item}">
              <span v-if="item.role === 1"> Administrador</span>
              <span class="primary--text font-weight-black" v-else-if="item.role === 2"> Supervisor</span>
              <span v-else-if="item.role === 3"> Bodega</span>
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showUser(item.id)" v-bind="attrs" v-on="on" icon>
                  <v-icon class="ml-2 mb-1"  color="gray" dense >
                        mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Editar {{item.name}}</span>
            </v-tooltip>
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h7">
                  ¿ Está seguro de que desea eliminar a este usuario ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-grey lighten-2"
                    text
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn color="red" text @click="deleteCity(item.id)">
                    Eliminar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/axios/axios";

export default {
  data() {
    return {
      formRegister: {
        name: "Bodega Jesús",
        email: "jesusrosales19@gmail.com",
        password: "123456",
        role: "3",
        zone_id: "",
        city_id: ''
      },
      sortDesc: true,
      items: [],
      roles: [
        { 
          name:'Administrador',
          role:1
        },
        { 
          name:'Supervisor',
          role:2
        },
        { 
          name: 'Bodega',
          role:3
        }
      ],
      radios: null,
      show: false,
      zones: [],
      users:[],
      cloneUsers:[],
      showEdit: false,
      changeBtn: true,
      searchInput: "",
      searchRoles: '',
      dialog: false,
      modaldialog: false,
      page:1,
      length: 1,
      headers: [
          { text: 'Correo', value: 'email' },
          {
            text: 'Nombre',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Rol', value: 'role' },
          { text: '', value: 'option', align: 'end', sortable: false, },
      ],
      cities: [],
      cloneCities: []
    };
  },
  methods: {
    getZones() {
      axios.get("/zones")
        .then((resp) => {
          this.zones = resp.data.zones;
        })
        .catch((err) => {
          console.log(err.data)
        });
    },
    
    // * Trae el listado de ciudades ya registradas

    getCity() {
      axios.get("/cities")
        .then((resp) => {
          this.cities = resp.data.cities
          this.cloneCities = resp.data.cities
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    getUser() {
      axios.get("/users")
        .then((resp) => {
          this.users = resp.data.users
          this.cloneUsers = resp.data.users
        })
        .catch((err) => {
          console.log(err.data)
        });
    },
    saveUser() {
      const user = this.formRegister;
      axios.post("/auth/register", user)
        .then((response) => {
          this.$toast.success("Usuario Registrado", {});
        })
        .catch((error) => {
          this.$toast.success("El usuario no fue registrado", {});
        });
        this.modaldialog = false
    },
    showUser(id) {
      axios.get(`/cities/${id}`)
        .then((resp) => {
          this.cityid = id;
          this.modaldialog = true

          //TODO: objeto de la zona
          this.zoneId = this.zones.find(
            (item) => item.id === resp.data.city.zone_id
          );

          this.formcity.name = resp.data.city.name;
          this.formcity.zone_id = resp.data.city.zone_id;
        })
        .catch((err) => {
          console.log("Error", err);
        });
      setTimeout(() => {
        this.showEdit = true;
        this.changeBtn = false;
      }, 1500);
    },

    // * Condición del botón "Guardar/Editar" para disparar el Guardado o el editado

    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveUser()
      } else {
        console.log("editar")
        // this.updateCity()
      }
    },
    cancelEdit() {
      this.showEdit = false
      this.changeBtn = false
      this.modaldialog = false
    },

    changeText(text) {
      this.searchInput = text
      this.search();
    },

    changeTextSelect(text) {
      this.searchRoles = text
      this.serchForSelect()
    },

    serchForSelect() {
        this.users = this.cloneUsers;
        console.log('hola')
        if(this.searchRoles != null){
            let a = this.users
            const id = this.searchRoles
            const result =  a.filter((item) => item.role === id)
            this.users = result
        }else {
            this.users = this.cloneUsers
        }
    },

    search() {
      this.users = this.cloneUsers
      if (this.searchInput != null || this.searchInput != "") {
        let a = this.users;
        let term = this.searchInput.toLowerCase();
        let result = a.filter(
          (item) => item.email.toLowerCase().indexOf(term) > -1
        );
        this.users = result;
      }
    },

    zoneId(item) {
      this.formRegister.zone_id = item.id;
    },
    selectCity(item) {
      this.formRegister.city_id = item.id;
    },
  },
  created() {
    this.getZones()
    this.getUser()
    this.getCity()
  },
  computed: {
    isDisabled() {
      // && this.formRegister.zone_id != ""
      // return (this.formRegister.name.length > 0  && this.formRegister.email != "" && this.formRegister.password != "" && this.formRegister.role != "" )
      if(this.formRegister.role == 3 ){
        return (this.formRegister.name.length > 0  && this.formRegister.email != "" && this.formRegister.password != "" && this.formRegister.role != "" && this.formRegister.city_id != "")
      }{
        return (this.formRegister.name.length > 0  && this.formRegister.email != "" && this.formRegister.password != "" && this.formRegister.role != "" && this.formRegister.zone_id != "")
      }
      return
    },
  },
};
</script>

<style>
</style>
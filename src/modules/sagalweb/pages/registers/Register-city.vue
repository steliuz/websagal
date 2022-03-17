<template>
  <v-container>
    <h2 class="text-left pl-4 title2 mb-2">
      {{ showEdit ? "Editar Ciudad" : "Control de Ciudades" }}
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
              <v-icon color="white" >mdi-plus-thick </v-icon>
              Nueva Ciudad
            </v-btn>
          </template>
          <template >
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                Registrar una nueva zona
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click="cancelEdit()"
                >
                  <v-icon color="white" >mdi-close </v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form class="px-4" ref="form" lazy-validation>
                  <v-row class="d-block d-sm-flex">
                    <v-col xs="12" sm="6">
                      <v-text-field
                        class=""
                        autocomplete="off"
                        v-model="formcity.name"
                        clearable
                        name="name"
                        label="Nombre"
                        type="text"
                        hint="Indique un nombre de ciudad"
                        persistent-hint
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6">
                      <v-select
                        class=""
                        v-on:change="changeID"
                        v-model="zoneId"
                        item-text="name"
                        item-value="zone_id"
                        return-object
                        single-line
                        clearable
                        :items="zones"
                        label="Zonas"
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
      <v-col cols="12" md="8" offset-md="2">
        <div dense elevation="0" class="d-block d-sm-flex justify-space-between">
          <v-col xs="12" sm="5">
            <v-text-field
            v-model="searchInput"
            v-on:input="changeText"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            outlined
            dense
            hide-details
            class="shrink "
          ></v-text-field>
          </v-col>
          <v-col xs="12" sm="5">
            <v-select
          :items="zones"
          v-model="searchZones"
          v-on:input="changeTextSelect"
          label="Filtrar por zonas"
          item-text="name"
          item-value="id"
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
          :items="cities"
          :items-per-page="5"
          class="elevation-0"
          :footer-props="{itemsPerPageText: 'Lineas por página'}"
        >
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }} 
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showCity(item.id)" v-bind="attrs" v-on="on" icon>
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
                  ¿ Está seguro de que desea eliminar la Ciudad ?
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
      formcity: {
        name: "",
        zone_id: "",
      },
      zones: [],
      zone_id: "",
      zoneId: "",
      cities: [],
      cloneCities: [],
      cityid: "",
      showEdit: false,
      changeBtn: true,
      searchInput: "",
      searchZones: "",
      dialog: false,
      modaldialog: false,
      page:1,
      length: 1,
      headers: [
          {
            text: 'Ciudad',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Zona', value: 'zone.name' },
          { text: '', value: 'option', align: 'end', },
        ],
    };
  },
  // components: {
  //   Pagination
  // },
  methods: {
    // * Registra las nuevas ciudades

    saveCity() {
      const city = this.formcity;
      axios.post("/cities", city)
        .then((resp) => {
          this.dialog = false
          this.$toast.success("Ciudad Registrada", {});
        })
        .catch((error) => {
          console.log(error.data);
          this.$toast.error("La ciudad no fue registrado", {})
        });

      this.formcity.name = "";
      this.zoneId = "";
      this.modaldialog = false
      this.getCity();
    },

    // * Trae el listado de zonas registradas

    getZones() {
      axios.get("/zones")
        .then((resp) => {
          this.zones = resp.data.zones
          // console.log('zonas' , JSON.parse(JSON.stringify(this.zones)))
        })
        .catch((err) => {
          console.log('error : ', err.data);
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

    getCitiesByZone(id) {
      axios.get(`/getCitiesByZone/${id}`)
        .then((resp) => {
          // console.log( 'zona', resp.data)
        })
        .catch((err) => {
          console.log(err.data);
        });
    },

    // * Muestra los datos en los inputs para ser editados

    showCity(id) {
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

    // * Envia los nuevos datos ya editados a la base de datos

    updateCity() {
      const id = this.cityid;
      const city = this.formcity;

      axios.put(`/cities/${id}`, city)
        .then((resp) => {
          this.getCity();
          this.formcity.name = "";
          this.zoneId = "";
          this.showEdit = false;
          this.modaldialog = false
          this.changeBtn = true;
          this.$toast.success("Ciudad Editada Exitosamente", {});
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },

    // * Borra la ciudad seleccionada

    deleteCity(id) {
      axios.delete(`/cities/${id}`)
        .then((resp) => {
          this.$toast("Ciudad borrada exitosamente", {})
        })
        .catch((err) => {
          console.log("No se pudo eliminar");
        });
      this.getCity();
      this.dialog = false
    },

    changeText(text) {
      this.searchInput = text;
      this.search();
    },

    changeTextSelect(text) {
      this.searchZones = text;
      this.serchForSelect();
      console.log('id Zona: ', this.searchZones)
    },

    serchForSelect() {
        this.cities = this.cloneCities;
        if(this.searchZones != null){
          // console.log('Hola2')
            let cities = this.cities
            const idZone = this.searchZones
            const result =  cities.filter((item) => item.zone_id === idZone)
            this.cities = result
        }else {
            // console.log('chao')
            this.cities = this.cloneCities;
        }
    },
    search() {
      this.cities = this.cloneCities;
      if (this.searchInput != null || this.searchInput != "") {
        let a = this.cities;
        let term = this.searchInput.toLowerCase();
        let result = a.filter(
          (item) => item.name.toLowerCase().indexOf(term) > -1
        );
        this.cities = result;
      }
    },

    // * Condición del botón "Guardar/Editar" para disparar el Guardado o el editado

    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveCity();
      } else {
        // console.log('editar')
        this.updateCity();
      }
    },

    // * Cancela el editado, vuelve los campos a vaciós y desaparece los botones de editado

    cancelEdit() {
      this.formcity.name = "";
      this.zoneId = "";
      this.showEdit = false;
      this.changeBtn = false;
      this.modaldialog = false
    },

    // * Detecta el cambio de ID del Select para saber la zona seleccionada
    changeID(item) {
      this.formcity.zone_id = item.id;
    },
  },
  created() {
    // * Dispara en al momento de crear la página el llamado de la lista de zonas y de ciudades existentes

    this.getZones();
    // this.getCitiesByZone(2);
    this.getCity();
  },
  computed: {
    isDisabled() {
      return (this.formcity.name.length > 0 && this.formcity.zone_id != "")
    },
    paginationCities () { 
    
      // const { page, length, cities } = this
      const total= this.cities.length
      const number = Math.ceil(this.cities.length / this.length)
      return this.cities.slice((this.page - 1) * number, this.page * number)
    
    }
  },
};
</script>

<style scoped>

</style>
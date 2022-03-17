<template>
  <v-container>
    <h2 class="text-left pl-4 title2">
      {{ showEdit ? "Editar Zona" : "Control de zonas" }}
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
              Nueva zona
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
                <v-form class="px-4 mt-8" ref="form" lazy-validation>
                  <v-row class="d-block d-sm-flex">
                    <v-col xs="12">
                      <v-text-field
                        class=""
                        v-model="formZone.name"
                        autocomplete="off"
                        clearable
                        name="name"
                        label="Nombre"
                        type="text"
                        hint="Indique un nombre para la zona"
                        persistent-hint
                        required
                        :rules="zonaRules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <v-btn
                        :class="
                          showEdit
                            ? 'd-flex-inline mt-2 mx-3 white--text'
                            : 'd-none mt-4 mx-3 white--text'
                        "
                        @click="cancelEdit"
                        color="red"
                        text
                        >Cancelar</v-btn
                      >
                      <v-btn
                        v-model="changeBtn"
                        class=""
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
      <v-col cols="12" md="10" offset-md="1">
        <v-toolbar dense elevation="0" class="">
          <v-text-field
            v-model="searchInput"
            v-on:input="changeText"
            append-icon="mdi-magnify"
            label="Buscar por nombre"
            single-line
            outlined
            dense
            hide-details
            class="shrink"
          ></v-text-field>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="zones"
          :items-per-page="10"
          class="elevation-0"
          :footer-props="{itemsPerPageText: 'Lineas por página'}"
        >
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }} 
          </template>
          <template v-slot:[`item.cities`]="{ item }">
            <v-chip class="ma-1" color="secondary" v-for="cities in item.cities" :key="cities.id">{{`${ cities.name} `}}</v-chip>
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showZone(item.id)" v-bind="attrs" v-on="on" icon>
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
                  ¿ Está seguro de que desea eliminar esta Zona ?
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
                  <v-btn color="red" text @click="deleteZone(item.id)">
                    Eliminar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import { validationForm } from "../../../shared/utils/validation";
import axios from "@/axios/axios";

const { required } = validationForm();

export default {
  data() {
    return {
      formZone: {
        name: "",
      },
      zones: [],
      showEdit: false,
      changeBtn: true,
      zoneid: "",
      searchInput: "",
      cloneZone: [],
      newZone: false,
      dialog: false,
      modaldialog: false,
      zonaRules: [(v) => required(v, "zone")],
      page:1,
      length: 1,
      zoneCities : [],
      headers: [
          {
            text: 'Zonas',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Ciudades', value: 'cities'},
          { text: '', value: 'option', align: 'end', width: '18%'},
        ],
    };
  },
  components: {
    // Appbar
    eliminar: () =>
      import(
        /*webpackChunkName: "Eliminar"*/ "@/modules/sagalweb/components/eliminar"
      ),
  },
  methods: {
    saveZone() {
      const zona = this.formZone

      axios.post("/zones", zona)
        .then((resp) => {
          this.$toast.success("Zona Registrada", {})
          
        })
        .catch((err) => {
          this.$toast.error("La zona no fue registrada", {})
          console.log(err.data)
        });

      this.formZone.name = ""
      this.modaldialog = false
      this.getZones()
    },

    getZones() {
      axios.get("/zones")
        .then((resp) => {
          this.zones = resp.data.zones;
          this.cloneZone = resp.data.zones;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveZone();
        this.newZone = false
      } else {
        this.updateZone()
      }
    },

    showZone(id) {
      axios.get(`/zones/${id}`)
        .then((resp) => {
          this.modaldialog = true
          this.zoneid = id;
          this.formZone.name = resp.data.zone.name;
        })
        .catch((err) => {
          console.log("Error", err);
        });

      this.showEdit = true;
      this.changeBtn = false;
    },

    updateZone() {
      const id = this.zoneid;

      const zona = this.formZone;

      axios.put(`/zones/${id}`, zona)
        .then((resp) => {
           this.$toast.success("Zona Editada Exitosamente", {});
           this.modaldialog = false
          console.log("Nice", resp.this.data);
        })
        .catch((err) => {
          this.$toast.error("La zona no fue borrado", {})
          console.log("Error", err.data);
        });
      this.showEdit = false;
      this.changeBtn = true;
      this.formZone.name = "";
      this.getZones();
    },

    cancelEdit() {
      this.formZone.name = "";
      this.showEdit = false;
      this.changeBtn = false;
      this.modaldialog = false
    },

    deleteZone(id) {
      axios.delete(`/zones/${id}`)
        .then((resp) => {
          (this.dialog = false), this.$toast("Zona borrada exitosamente", {});
        })
        .catch((err) => {
          console.log("No se pudo eliminar", err.data);
        });
      this.getZones();
    },
    changeText(text) {
      this.searchInput = text;
      this.search();
    },
    search() {
      this.zones = this.cloneZone;
      if (this.searchInput != null || this.searchInput != "") {
        let a = this.zones;
        let term = this.searchInput.toLowerCase();
        let result = a.filter(
          (item) => item.name.toLowerCase().indexOf(term) > -1
        );
        this.zones = result;
      }
    },
  },
  created() {
    this.zones = this.getZones();
    setTimeout(() => {     
      this.mostrarCiudades()
      this.search()
    }, 2000);

  },
  computed:{
    isDisabled() {
        return this.formZone.name.length > 0;
    },
    contZones(){
      this.zones
    },
    // numZones(){
    //     const num = this.zones
    //     return num
    // },
  },
  watch: {

  }
};
</script>

<style>
</style>
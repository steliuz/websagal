<template>
  <v-container>
    <h1>Producto: {{ $route.params.product }}</h1>
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
              Producto
            </v-btn>
          </template>
          <template>
            <v-card>
              <v-toolbar color="primary" dark>
                Registro de Lote
                <v-spacer></v-spacer>
                <v-btn icon @click="cancelEdit()">
                  <v-icon color="white">mdi-close </v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form class="px4" ref="form" lazy-validation>
                  <v-row>
                    <v-col xs="12" sm="5">
                      <v-text-field
                        class="mt-4"
                        clearable
                        v-model="formReceived.code"
                        name="code"
                        label="Código"
                        type="number"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col xs="12" sm="2">
                      <v-text-field
                        class="mt-4"
                        v-model="formReceived.quantity"
                        clearable
                        name="quantity"
                        label="Cantidad"
                        type="number"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col xs="12" sm="5">
                      <v-text-field
                        class="mt-4"
                        clearable
                        v-model="formReceived.expedition_date"
                        name="expedition_date"
                        label="Fecha de Elaboración"
                        type="date"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="d-flex justify-space-around" xs="12" sm="6">
                      <div class="d-flex align-center">
                        <v-checkbox
                          label="Bueno"
                          v-model="formReceived.okay"
                          color="secondary"
                        ></v-checkbox>
                        <v-checkbox
                          label="Caduco"
                          v-model="formReceived.deciduous"
                        ></v-checkbox>
                        <v-checkbox
                          label="Mermado"
                          v-model="formReceived.depleted"
                          color="red"
                        ></v-checkbox>
                      </div>
                    </v-col>
                    <v-col xs="12" sm="6">
                      <v-text-field
                        class="mt-4"
                        clearable
                        v-model="formReceived.expiry_date"
                        name="expiry_date"
                        label="Fecha de Caducidad"
                        type="date"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
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
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      v-model="changeBtn"
                      class="mt-4"
                      :color="showEdit ? 'secondary' : 'primary'"
                      @click="toggleBtn"
                    >
                      {{ showEdit ? "Editar" : "Guardar" }}
                    </v-btn>
                  </v-col>
                </v-form>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col xs="12" sm="10" offset-sm="1">
        <template>
          <v-data-table
            :headers="headers"
            :items="pedidos"
            :items-per-page="5"
            class="elevation-1 mt-3"
          >
            <template v-slot:[`item.okay`]="{ item }">
              <div class="d-flex">
                <v-checkbox
                  v-model="item.okay"
                  class="check-mess"
                  color="secondary"
                ></v-checkbox>
              </div>
            </template>
            <template v-slot:[`item.deciduous`]="{ item }">
              <div class="d-flex">
                <v-checkbox v-model="item.deciduous" class="check-mess"></v-checkbox>
              </div>
            </template>
            <template v-slot:[`item.depleted`]="{ item }">
              <div class="d-flex">
                <v-checkbox
                  v-model="item.depleted"
                  class="check-mess"
                  color="red"
                ></v-checkbox>
              </div>
            </template>
            <template v-slot:[`item.options`]=" { item }">
              <v-btn icon color="red" @click="deleteLotsRecieved(item.id)">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/axios/axios'
export default {
  name: "lista",
  data() {
    return {
      headers: [
        { text: "Código", value: "lot.code" },
        { text: "Catidad", value: "quantity" },
        { text: "B", value: "okay", align: "center" },
        { text: "C", value: "deciduous", align: "center" },
        { text: "M", value: "depleted", align: "center" },
        { text: "Fecha caducidad", value: "expiry_date" },
        { text: "Fecha Elaboración", value: "expedition_date" },
        { text: "", value: "options", align: "end", width: "5%" },
      ],
      pedidos:[],
      formReceived: {
        code: '222222',
        quantity: '50',
        deciduous: 0,
        okay: 0,
        depleted: 0,
        expiry_date: "2022-09-28",
        expedition_date: "2022-02-28",
      },
      okay: 0,
      deciduous: 0,
      depleted: 0,
      dialog: false,
      modaldialog: false,
      showEdit: false,
      changeBtn: true,
    };
  },
  created() {
    this.getLotsReceived()
  },
  methods: {
    saveLotsReceived(){
      const lote = this.formReceived;
      console.log('lote: ', lote);
      axios.post('/lotsReceived/', lote)
      .then((resp) => {
          this.$toast.success("Lote Registrado Correctamente", {});
        })
        .catch((err) => {
          this.$toast.error("El usuario no fue registrado", {});
        });
        this.getLotsReceived()
        this.modaldialog = false
    },
    getLotsReceived(){
      axios.get('/lotsReceived/')
      .then((resp) => {
        const array = resp.data.lotsReceived
        const array2 = []
        array.map((item) => {
          if( this.$route.params.idProduct == item.lot.product_id){
             array2.push(item)
          }
             this.pedidos = array2

        })

          // this.pedidos = resp.data.lotsReceived
      })
      .catch((err) => {
        console.log(err.data)
      })
    },
    deleteLotsRecieved(id) {
      console.log(id);
      axios.delete(`/lotsReceived/${id}`)
      .then((resp)=>{
        this.dialog = false
        this.getLotsReceived()
        this.$toast('Lote Eliminado Exitosamente')
      })
      .catch((err) => {})

    },
    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveLotsReceived();
      } else {
        console.log("editar");
        // this.updateCity()
      }
    },
    cancelEdit() {
      this.showEdit = false;
      this.changeBtn = false;
      this.modaldialog = false;
    },
  },
};
</script>

<style scoped>
.check-mes .v-messages {
  display: none;
}
</style>
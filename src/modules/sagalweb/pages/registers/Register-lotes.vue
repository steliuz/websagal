<template>
  <v-container>
    <h2 class="text-left pl-4 title2">
      {{ showEdit ? "Editar Lote" : "Control de Lotes" }}
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
              Nueva Ciudad
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
                <v-form class="px4" ref="form" lazy-validation>
                  <v-col xs="12">
                    <v-text-field
                      class="mt4"
                      v-model="formLots.code"
                      autocomplete="off"
                      clearable
                      name="lote"
                      label="Número de lote"
                      type="text"
                      hint="Indque un número de lote"
                      persistent-hint
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col xs="12">
                    <v-text-field
                      label="Regular"
                      type="date"
                      v-model="formLots.expiry_date"
                    ></v-text-field>
                  </v-col>
                  <v-col xs="12">
                    <v-select
                      class=""
                      v-model="formLots.product_id"
                      :items="products"
                      v-on:change="changeID"
                      item-text="name"
                      item-value="id"
                      return-object
                      single-line
                      label="Productos"
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
      <v-col cols="12" md="8" offset-md="2">
        <div dense elevation="0" class="d-block d-sm-flex justify-space-between">
          <v-col xs="12" sm="5">
          <v-text-field
            v-model="searchInput"
            v-on:input="changeText"
            append-icon="mdi-magnify"
            label="Buscar por código"
            single-line
            outlined
            dense
            hide-details
            clearable
            class="shrink"
          ></v-text-field>
          </v-col>
          <v-col xs="12" sm="5">
            <v-select
          :items="products"
          v-model="searchProducts"
          v-on:input="changeTextSelect"
          label="Filtrar por producto"
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
        <!-- <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    N° de Lote <v-badge class="ml-2" content="6"></v-badge>
                  </th>
                  <th>
                    Producto
                  </th>
                  <th>
                    Fecha
                  </th>
                  <th class="text-right">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="{ id, code, expiry_date } in lots" :key="id">
                  <td>
                    {{ code }} 
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="showLot(id)" v-bind="attrs" v-on="on" icon>
                          <v-icon class="ml-2 mb-1"  color="gray"  small dense >
                               mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Editar {{code}}</span>
                    </v-tooltip>
                  </td>
                  <td>Café</td>
                  <td class="text-truncate">{{expiry_date}}</td>
                  <td class="text-right">
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
                          <v-btn color="red" text @click="deleteLot(id)">
                            Eliminar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </td>
                </tr>
              </tbody>
            </template>
        </v-simple-table> -->
        <v-data-table
          :headers="headers"
          :items="lots"
          :items-per-page="10"
          class="elevation-0"
          :footer-props="{itemsPerPageText: 'Lineas por página'}"
        >
          <template v-slot:[`item.code`]="{ item }">
            {{ item.code }} 
          </template>
          <template v-slot:[`item.product`]="{ item }">
              <span>{{item.product.name}}</span>
          </template>
          <template v-slot:[`item.expiry_date`]="{ item }">
              {{ item.expiry_date }} 
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showLot(item.id)" v-bind="attrs" v-on="on" icon>
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
                  ¿ Está seguro de que desea eliminar a este lote ?
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
                  <v-btn color="red" text @click="deleteLot(item.id)">
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
      formLots: {
        code: "123456",
        expiry_date: "2022-01-28",
        product_id: "",
      },
      products: [],
      clonesProducts:[],
      productShow: "",
      lotId: "",
      lots: [],
      cloneLots: [],
      showEdit: false,
      changeBtn: true,
      modaldialog: false,
      searchInput: "",
      searchProducts: '',
      dialog: false,
      page:1,
      length: 1,
      headers: [
          {
            text: 'N° de lote',
            align: 'start',
            sortable: false,
            value: 'code',
          },
          { text: 'Producto', value: 'product', },
          { text: 'Fecha', value: 'expiry_date', },
          { text: '', value: 'option', align: 'end', },
        ],
    };
  },
  methods: {
    getLots() {
      axios.get("/lots")
        .then((resp) => {
          this.lots = resp.data.lots
          console.log(resp.data.lots)
          this.cloneLots = resp.data.lots
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    getProducts() {
      axios.get("/products")
        .then((resp) => {
          this.products = resp.data.products;
          this.clonesProducts = resp.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveLot() {
      const lot = this.formLots;
      axios.post("/lots", lot)
        .then((resp) => {
          this.formLots.code = "";
          this.formLots.expiry_date = "";
          this.product_id = "";
          this.modaldialog = false
          this.$toast.success("Lote Registrado", {});
        })
        .catch((err) => {
          console.log(err.data);
          this.$toast.error("El Lote no fue registrado", {});
        });
      this.getLots();
    },
    showLot(id) {
      axios.get(`/lots/${id}`)
        .then((resp) => {
          this.lotId = id;
          this.modaldialog = true
          this.formLots = resp.data.lot
        })
        .catch((err) => {});
      setTimeout(() => {
        this.showEdit = true;
        this.changeBtn = false;
      }, 1500);
    },
    updateLot() {
      const id = this.lotId
      const lot = this.formLots
      axios.put(`/lots/${id}`, lot)
        .then((resp) => {
          this.getLots();
          this.formLots.code = ""
          this.formLots.expiry_date = ""
          this.product_id = ""
          this.showEdit = false
          this.changeBtn = true
          this.modaldialog = false
          this.$toast.success("Lote Editado Exitosamente", {});
        })
        .catch((err) => {

        })
    },
    deleteLot(id) {
      axios.delete(`/lots/${id}`)
        .then((resp) => {
          this.dialog = false
          console.log("Lote Borrada");
          this.$toast("Lote borrado exitosamente", {})
        })
        .catch((err) => {
          console.log("No se pudo eliminar");
          this.$toast.error("El lote no fue borrado", {})
        });
      this.getLots();
    },
    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveLot();
      } else {
        this.updateLot();
      }
    },
    cancelEdit() {
      console.log("click cancel");
      this.showEdit = false
      this.formLots.code = ""
      this.formLots.expiry_date = ""
      this.formLots.product_id = ""
      this.changeBtn = false
      this.modaldialog = false
    },
    changeText(text) {
      this.searchInput = text
      this.search();
    },

    changeTextSelect(text) {
      this.searchProducts = text;
      this.serchForSelect();
    },

    serchForSelect() {
        this.lots = this.cloneLots;
        if(this.searchProducts != null){
            let a = this.lots
            const id = this.searchProducts
            const result =  a.filter((item) => item.product_id === id)
            this.lots = result
        }else {
            this.lots = this.cloneLots;
        }
    },

    search() {
      this.lots = this.cloneLots
      if (this.searchInput != null ) {
        let a = this.cloneLots
        let term = this.searchInput
        let result = a.filter((item) => item.code.indexOf(term) > -1);
        this.lots = result;
      }else if (this.searchInput === null || this.searchInput === ""){
        this.lots = this.cloneLots
      }
    },
    changeID(item) {
      this.formLots.product_id = item.id
    },
  },
  created() {
    this.getLots()
    
    this.getProducts()
  },
};
</script>

<style>
</style>
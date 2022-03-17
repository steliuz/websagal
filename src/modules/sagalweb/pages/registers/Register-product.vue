<template>
  <v-container>
    <h2 class="text-left pl-4 title2">
      {{ showEdit ? "Editar Producto" : "Control de Productos" }}
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
                <v-form class="px-4" ref="form" lazy-validation>
                  <v-row class="d-block d-sm-flex">
                    <v-col xs="12">
                      <v-text-field
                        class="mt-4"
                        autocomplete="off"
                        v-model="formProduct.name"
                        clearable
                        name="name"
                        label="Nombre"
                        type="text"
                        hint="Indique un nombre para el producto"
                        persistent-hint
                        required
                      >
                      </v-text-field>
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
                        class="mt-4"
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
      <v-col  cols="12" md="8" offset-md="2">

        <v-toolbar dense elevation="0" class="">
          <v-text-field
            v-model="searchInput"
            v-on:input="changeText"
            append-icon="mdi-magnify"
            label="Buscar por nombre"
            single-line
            clearable
            outlined
            dense
            hide-details
            class="shrink"
          ></v-text-field>
        </v-toolbar>
        <!-- <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Producto <v-badge class="ml-2" content="6"></v-badge>
                  </th>
                  <th class="text-right">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="{ id, name } in products" :key="id">
                  <td>
                    {{ name }} 
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="showProduct(id)" v-bind="attrs" v-on="on" icon>
                          <v-icon class="ml-2 mb-1"  color="gray"  small dense >
                               mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Editar {{name}}</span>
                    </v-tooltip>
                  </td>
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
                          <v-btn color="red" text @click="deleteProduct(id)">
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
          :items="products"
          :items-per-page="10"
          class="elevation-0"
          :footer-props="{itemsPerPageText: 'Lineas por página'}"
        >
          <template v-slot:[`item.name`]="{ item }">
            {{ item.name }} 
          </template>
          <template v-slot:[`item.role`]="{item}">
              <span v-if="item.role === 1"> Administrador</span>
              <span v-else-if="item.role === 2"> Supervisor</span>
              <span v-else-if="item.role === 3"> Bodega</span>
          </template>
          <template v-slot:[`item.option`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showProduct(item.id)" v-bind="attrs" v-on="on" icon>
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
                  <v-btn color="red" text @click="deleteProduct(item.id)">
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
      formProduct: {
        name: "",
      },
      products: [],
      cloneProducts: [],
      productId: "",
      showEdit: false,
      changeBtn: true,
      modaldialog: false,
      searchInput: "",
      dialog: false,
      page:1,
      length: 1,
      headers: [
          {
            text: 'Producto',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '', value: 'option', align: 'end', },
        ],
    };
  },
  methods: {
    getProducts() {
      axios.get("/products")
        .then((resp) => {
          this.products = resp.data.products;
          this.cloneProducts = resp.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveProduct() {
      const product = this.formProduct;
      axios.post("/products", product)
        .then((resp) => {
          this.formProduct.name = "";
          this.getProducts();
          this.modaldialog = false
          this.$toast.success("Producto Registrado", {});
        })
        .catch((err) => {
          console.log(err.data);
          this.$toast.error("El prodcuto no fue registrado", {})
        });
    },
    showProduct(id) {
      
      axios.get(`/products/${id}`)
        .then((resp) => {
          this.productId = id;
          this.modaldialog = true
          this.formProduct.name = resp.data.product.name;
        })
        .catch((err) => {});
      setTimeout(() => {
        this.showEdit = true;
        this.changeBtn = false;
      }, 1500);
    },
    updateProduct() {
      const id = this.productId;
      const product = this.formProduct;
      axios.put(`/products/${id}`, product)
        .then((resp) => {
          this.getProducts();
          this.formProduct.name = "";
          this.showEdit = false;
          this.changeBtn = true;
          this.modaldialog = false
          this.$toast.success("Producto Editado Exitosamente", {});
        })
        .catch((err) => {});
    },
    deleteProduct(id) {
      axios.delete(`/products/${id}`)
        .then((resp) => {
          console.log("Borrado");
          this.$toast("Producto borrado exitosamente", {})
        })
        .catch((err) => {
          console.log("Error al borrar");
          this.$toast.error("El producto no fue borrado", {})
        });

      this.dialog = false
      this.getProducts();
    },
     search() {
      this.products = this.cloneProducts;
      if (this.searchInput != null ) {
        let a = this.products;
        let term = this.searchInput.toLowerCase();
        let result = a.filter(
          (item) => item.name.toLowerCase().indexOf(term) > -1
        );
        this.products = result;
      }else if (this.searchInput === null || this.searchInput === ""){
        this.products = this.cloneProducts;
      }
    },
    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveProduct();
      } else {
        this.updateProduct();
      }
    },
    changeText(text) {
      this.searchInput = text;
      this.search();
    },
    cancelEdit() {
      console.log("click cancel");
      this.showEdit = false;
      this.formProduct.name = "";
      this.changeBtn = false;
      this.modaldialog = false
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>
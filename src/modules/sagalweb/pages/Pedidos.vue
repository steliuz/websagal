<template>
  <v-container>
    <h2 class="text-left pl-4 title2">
      {{ $route.params.name }}
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
              Producto
            </v-btn>
          </template>
          <template>
            <v-card>
              <v-toolbar color="primary" dark>
                Registrar producto a bodega
                <v-spacer></v-spacer>
                <v-btn icon @click="cancelEdit()">
                  <v-icon color="white">mdi-close </v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form class="px4" ref="form" lazy-validation>
                  <v-col xs="12">
                    <v-select
                      :items="products"
                      v-on:input="changeTextSelect"
                      v-model="productID"
                      label="Productos"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      single-line
                      clearable
                    ></v-select>
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
      <v-col xs="12" sm="8" offset-sm="2">
        <template>
          <v-data-table
            :headers="headers"
            :items="productWineries"
            :items-per-page="5"
            dense
            class="elevation-1 mt-3"
          >
            <template v-slot:[`item.name`]="{ item }">
              <span class="font-weight-bold">
                {{ item.product.name }}
              </span>
            </template>
            <template v-slot:[`item.verification`]="{  }">
              <div class="d-flex align-center jutify-center">
                <span><v-icon color="secondary" v-show="checkbox2"> mdi-check-circle </v-icon></span>
                <span><v-icon color="primary" v-show="checkbox"> mdi-check-circle </v-icon></span>
              </div>
            </template>
            <template v-slot:[`item.options`]="item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="showProduct(item.item)" v-bind="attrs" v-on="on" icon>
                  <v-icon class="ml-2 mb-1"  color="gray" dense >
                        mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
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
                    <v-btn color="red" text @click="deleteProduct(item.item.id)">
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <router-link :to="{ name: 'listLotesBodegas', params: { product: 'hola'}}">
              <v-btn icon color="primary" >
                {{item.product}}
              </v-btn>
            </router-link> -->
              <v-btn icon color="primary" @click="listLotes(item)">
                <v-icon> mdi-arrow-right-drop-circle </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/axios/axios";
import { mapState, mapGetters } from 'vuex'
export default {
  name: "pedidos",
  data() {
    return {
      headers: [
        { text: "Producto", value: "name" },
        { text: "Verificación", value: "verification" },
        { text: "", value: "options", align: "end", width: "28%" },
      ],
      formBodega: {
        product_id: '',
        user_id: ''
      },
      checkbox: true,
      checkbox2: true,
      modaldialog: false,
      dialog: false,
      showEdit: false,
      changeBtn: true,
      products: [],
      searchProducts: "",
      userID: '',
      productID: '',
      productEnvio: '',
      productWineries: []
    };
  },
  created() {
    this.getProducts()
    this.me()
    this.getProductWineries()
  },
  methods: {
    listLotes(item) {
      this.$router.push({ name: "listLotesBodegas" , params: { product: item.item.product.name, idProduct: item.item.product.id  }});
    },
    me(){
        axios.get("/auth/me")
        .then((resp) => {
          this.formBodega.user_id = resp.data.user.id
        })
        .catch((err) => {

          console.log('error', err.data)
        
        })
    },
    getProducts() {
      axios.get("/products")
        .then((resp) => {
          this.products = resp.data.products
          this.clonesProducts = resp.data.products
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    getProductWineries() {
      axios.get("/wineriesProducts")
        .then((resp) => {
          const arrayProducts = resp.data.wineriesProducts
          this.productWineries =  arrayProducts.filter(item => item.user_id == this.$route.params.id)
        })
        .catch((err) => {
          console.log(err.data)
        });
    },
    saveProduct() {
      this.formBodega.product_id = this.productID
      const pedido = this.formBodega
      axios.post("/wineriesProducts", pedido)
        .then((resp) => {
          this.dialog = false

          this.$toast.success("Producto registrada", {});
        })
        .catch((err) => {
          console.log('error Wineries', err.data);
          this.$toast.error("El producto no fue registrado", {})
        });
        this.modaldialog = false;
        this.getProductWineries()
    },
    showProduct(item){
      const id = item.id
      axios.get(`/wineriesProducts/${id}`)
      .then((resp)=>{
        this.modaldialog = true
        this.productID = item.product_id
        this.productEnvio = item.id
      })
      .catch((err)=>{})
      setTimeout(() => {
        this.showEdit = true;
        this.changeBtn = false;
      }, 1500);
    },
    updateProduct() {
      const id = this.productEnvio;
      this.formBodega.product_id = this.productID
      const pedido = this.formBodega
      console.log(pedido)

      axios.put(`/wineriesProducts/${id}`, pedido)
        .then((resp) => {
          this.getProductWineries()
          this.modaldialog = false
          this.productID = "";
          this.$toast.success("Producto editado exitosamente", {});
        })
        .catch((err) => {
          this.$toast.error("El producto no fue editado", {})
          console.log("Error", err.data);
        });
      this.showEdit = false;
      this.changeBtn = true;
    },
    deleteProduct(id){
      axios.delete(`/wineriesProducts/${id}`)
      .then((resp)=> {
        this.dialog = false
        this.getProductWineries()
        this.$toast('Producto Eliminado Exitosamente', {})
      })
      .catch((err)=> {
          console.log("No se pudo eliminar", err.data);
      })
    },
    cancelEdit() {
      this.showEdit = false;
      this.changeBtn = false;
      this.productID = ''
      this.modaldialog = false;
    },
    toggleBtn() {
      if (this.changeBtn === true) {
        this.saveProduct();
      } else {
        this.updateProduct();
      }
    },
    changeTextSelect(text) {
      this.productID = text;
    },
  },
  computed: {
    roleUser() {
        return this.$store.state.auth.user && this.$store.state.auth.user.role; 

    },
  }
};
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 1px;
    padding-top: 4px;
}

.check-mes .v-messages {
  display:none;
}
</style>
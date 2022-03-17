import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>import(/* webpackChunkName: "Layout Auth" */ "@/modules/sagalweb/layouts/Auth"),
    children: [
      {
        path: "",
        name: "auth",
        component: () =>
          import(/*webpackChunkName: "ListPage"*/ "@/modules/sagalweb/pages/Index"),
      },
    ],
  },
  {
    path: "/dasboard",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/modules/sagalweb/layouts/Layout"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () =>
          import(/*webpackChunkName: "ListPage"*/ "@/modules/sagalweb/pages/Index"),
      },

      //TODO: Registros


      {
        path: "/register-zone",
        name: "register-zone",
        component: () =>
          import(/*webpackChunkName: "Register zone"*/ "@/modules/sagalweb/pages/registers/Register-zone"),
      },
      {
        path: "/register-user",
        name: "register-user",
        component: () =>
          import(/*webpackChunkName: "Register user"*/ "@/modules/sagalweb/pages/registers/Register-user"),
      },
      {
        path: "/register-city",
        name: "register-city",
        component: () =>
          import(/*webpackChunkName: "Register city"*/ "@/modules/sagalweb/pages/registers/Register-city"),
      },
      {
        path: "/register-lotes",
        name: "register-lotes",
        component: () =>
          import(/*webpackChunkName: "Register lote"*/ "@/modules/sagalweb/pages/registers/Register-lotes"),
      },
      {
        path: "/register-product",
        name: "register-product",
        component: () =>
          import(/*webpackChunkName: "Register product"*/ "@/modules/sagalweb/pages/registers/Register-product"),
      },

      //TODO: Bodega

      {
        path: "/pedidos/:id/:name",
        name: "pedidos",
        component: () =>
          import(/*webpackChunkName: "List zones"*/ "@/modules/sagalweb/pages/Pedidos"),
      },
      {
        path: "/listLotesBodegas/:product/:idProduct",
        name: "listLotesBodegas",
        component: () =>
          import(/*webpackChunkName: "List zones"*/ "@/modules/sagalweb/pages/ListLotesBodega"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;

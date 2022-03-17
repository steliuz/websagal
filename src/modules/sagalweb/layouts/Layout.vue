<template>
  <div id="inspire">
    <app-bar @handeDrawer="drawer = !drawer"></app-bar>

    <sidebar @handeDrawer="drawer = !drawer" :drawer="drawer"></sidebar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
    };
  },
  components: {
    // Appbar
    AppBar: () =>
      import(
        /*webpackChunkName: "Appbar"*/ "@/modules/sagalweb/components/Appbar"
      ),
    Sidebar: () =>
      import(/*webpackChunkName: "Menu"*/ "@/modules/sagalweb/components/Menu"),
  },
};
</script>

<style>
</style>
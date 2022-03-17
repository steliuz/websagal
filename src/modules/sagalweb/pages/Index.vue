<template>
  <div class="d-flex justify-center align-center lol">

    <div class="father">

    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    drawer: true,
  }),
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

.lol {
  /* background-color:#c1c1c1; */
  display: flex;
  height: 100vh;
}

.father{
  background-color: aquamarine;
  width: 400px;
  height: 400px;
}
</style>
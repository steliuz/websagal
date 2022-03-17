<template>
  <div>
    <v-app-bar app dense elevate-on-scroll elevation="4" color="white">
      <v-app-bar-nav-icon
        color="primary"
        @click="$emit('handeDrawer')"
      ></v-app-bar-nav-icon>

      <!-- <v-toolbar-title></v-toolbar-title> -->

      <v-spacer></v-spacer>


        <!-- <v-icon color="white">mdi-logout-variant</v-icon> -->
        <v-avatar size="36" height="auto">
          <img
          height="auto"
            alt="Avatar"
            src="@/assets/logo.png"
          />
        </v-avatar>


      <v-menu left bottom> </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
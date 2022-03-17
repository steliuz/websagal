<template>
  <div>
    <v-list-group :value="false" prepend-icon="mdi-account" color="primary">
      <template v-slot:activator>
        <v-list-item-title>Registros</v-list-item-title>
      </template>
      <div v-for="({ title, icon, color, link }, i) in records" :key="i" link>
        <v-list-item class="pl-8" :to="{ name: link }">
          <v-list-item-icon class="mr-4">
            <v-icon dense :color="color" v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </div>
    </v-list-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    records: [
       {
        icon: "mdi-map-outline",
        color: "cyan darken-1",
        title: "Registrar zona",
        link: "register-zone",
      },
      {
        icon: "mdi-map-marker-multiple",
        color: "cyan darken-1",
        title: "Registrar ciudad",
        link: "register-city",
      },
      {
        icon: "mdi-account",
        color: "cyan darken-1",
        title: "Registrar Usuario",
        link: "register-user",
      },
      {
        icon: "mdi-archive-edit",
        color: "cyan darken-1",
        title: "Registrar producto",
        link: "register-product",
      },
      {
        icon: "mdi-clipboard-list-outline",
        color: "cyan darken-1",
        title: "Registrar lotes",
        link: "register-lotes",
      },
    ],
  }),
};
</script>

<style>
</style>
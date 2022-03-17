<template>
    <div>
    <v-list-group :value="false" prepend-icon="mdi-clipboard-text-outline">
      <template v-slot:activator>
        <v-list-item-title>Listados</v-list-item-title>
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
        icon: "mdi-format-list-bulleted",
        color: "cyan darken-1",
        title: "Lista de Usuarios",
        link: "list-users",
      },
      {
        icon: "mdi-format-list-bulleted",
        color: "cyan darken-1",
        title: "Lista de productos",
        link: "list-products",
      },
      {
        icon: "mdi-format-list-bulleted",
        color: "cyan darken-1",
        title: "Lista de lotes",
        link: "list-lotes",
      },
      {
        icon: "mdi-format-list-bulleted",
        color: "cyan darken-1",
        title: "Lista de zonas",
        link: "list-zones",
      },
      {
        icon: "mdi-format-list-bulleted",
        color: "cyan darken-1",
        title: "Lista de ciudades",
        link: "list-cities",
      },
    ],
  }),
};
</script>

<style>

</style>
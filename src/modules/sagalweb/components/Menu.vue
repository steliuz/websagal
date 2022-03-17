<template>
  <v-navigation-drawer class="" :value="toggleDrawer" app color="claro" >
    <v-sheet color="white--text" class="text-center">
      <!-- <v-img src="@/assets/background-box2.png"> -->
      <div style="background-color: #518fd6; height: 150px">
        <v-avatar class="mt-8 mb-2" color="grey darken-1" size="64">
          <v-img aspect-ratio="30" src="@/assets/koala.jpg"></v-img>
        </v-avatar>
        <div class="white--text" v-if="user">{{user.name}}</div>
      </div>
      <!-- </v-img> -->
    </v-sheet>

    <!-- <v-divider></v-divider> -->

    <v-list class="d-flex flex-column" dark>
      <!-- <records></records> -->

      <div v-for="({ title, icon, color, link }, i) in roleMenu" :key="i" link>
        <v-list-item active-class="active" :to="{ name: link }">
          <v-list-item-icon class="mr-4">
            <v-icon class="icon" dense :color="color" v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title" ></v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
    <template v-slot:append>
      <v-list-item class="" @click.prevent="logout" >
        <v-list-item-icon>
          <v-icon color="white">mdi-logout-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: "Sidebar",
  props: { drawer: Boolean },
  components: {
    
    // Appbar
    records: () =>
      import(
        /*webpackChunkName: "Menu Records"*/ "@/modules/sagalweb/components/components-menu/records"
      ),
    lists: () =>
      import(
        /*webpackChunkName: "Menu Records"*/ "@/modules/sagalweb/components/components-menu/lists"
      ),
  },
  data: () => ({
    toggleDrawer: true,
    links: [
      {
        icon: "mdi-home",
        color: "white",
        title: "Inicio",
        link: "index",
        isAdmin: false,
        isSupervisor: false,
        isCellar: true
      },
      {
        icon: "mdi-map-outline",
        color: "white",
        title: "Control de zonas",
        link: "register-zone",
        isAdmin: true,
        isSupervisor: false,
        isCellar: false
      },
      {
        icon: "mdi-map-marker-multiple",
        color: "white",
        title: "Control de ciudades",
        link: "register-city",
        isAdmin: true,
        isSupervisor: false,
        isCellar: false
      },
      {
        icon: "mdi-account",
        color: "white",
        title: "Control de usuarios",
        link: "register-user",
        isAdmin: true,
        isSupervisor: false,
        isCellar: false
      },
      {
        icon: "mdi-archive-edit",
        color: "white",
        title: "Control de productos",
        link: "register-product",
        isAdmin: true,
        isSupervisor: false,
        isCellar: false
      },
      {
        icon: "mdi-clipboard-list-outline",
        color: "white",
        title: "Control de lotes",
        link: "register-lotes",
        isAdmin: true,
        isSupervisor: false,
        isCellar: false
      },
    ],
  }),
  methods:{
    ...mapActions('auth' , ['getMe' , 'logout']),
    menu() {
        // let array = this.links

        // if(this.isAdmin === true || this.isSupervisor === true) {
        //   array = array.filter((item) => item.isAdmin == this.isAdmin)
        //   console.log('array01: ', array); 
        // }else if (this.isSupervisor === true){
        //   array = array.filter((item) => item.isSupervisor == this.isSupervisor)
        //   console.log('array02: ', array);
        // }{
        //   array = array.filter((item) => item.isCellar == this.isCellar)
        //   console.log('array03: ', array);
        // }
    }
  },
  created() {
    this.getMe()
    this.menu()
  },
  computed: {
    ...mapState( 'auth', ['user'] ),
    ...mapGetters('auth' , ['isAdmin' , 'isSupervisor', 'isCellar']),
    roleMenu(){
      let array = this.links

        if(this.isAdmin === true || this.isSupervisor === true) {
           return array = array.filter((item) => item.isAdmin == this.isAdmin)
           console.log('1');
        }else if (this.isSupervisor === true){
           return array = array.filter((item) => item.isSupervisor == this.isSupervisor)
           console.log('2');
        }{
           return array = array.filter((item) => item.isCellar == this.isCellar)
           console.log('3');
        }
    }
    
  },
  watch: {
    drawer() {
      this.toggleDrawer = this.drawer;
    },

    toggleDrawer() {
      if (this.$vuetify.breakpoint.smAndDown) {
        // this.$emit('handeDrawer')
      }
    },
  },
};
</script>

<style scoped>
.logout {
  position: absolute;
  bottom: 0px;
}

.v-list-item {
  flex: 0 !important;
}

.active {
  background-color: #fff;
  color: #2461a7;
}

.active .white--text {
  color: #2461a7 !important;
  caret-color: #2461a7 !important;
}

.v-list-item__title {
  color:#fff
}

.active .v-list-item__title {
    color: #2461a7;
}
</style>
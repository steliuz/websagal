<template >
  <v-container fluid>
    <v-row class="imx-bg-responsive">
      <v-col cols="6" class="pa-0 d-none d-md-flex">
        <div class="box-left">
          <v-img
            class="img-box img-box-md"
            height="100%"
            v-if="$vuetify.breakpoint.lg"
            src="@/assets/boxs1.jpg"
          ></v-img>
          <v-img class="img-box" height="100%" v-else src=""></v-img>
        </div>
      </v-col>
      <v-col xs="12" sm="12" md="6" class="align-self-center">
        <v-container class="d-flex justify-center">
          <v-card color="px-xs-5 auth-card" elevation="6">
            <div class="fill-height">
              <div class="d-flex flex-column align-center justify-center">
                <v-img
                  class="margin-img"
                  width="80"
                  height="auto"
                  src="@/assets/logo-completo.png"
                ></v-img>
                <!-- <h2><span class="name-logo">SAGAL</span></h2> -->
              </div>
              <v-form
                class="px-xs-2 px-sm-6 px-md-5"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      class="mt-8"
                      clearable
                      v-model="email"
                      name="Email"
                      label="Correo"
                      type="text"
                      hint="Ej: usuario@gmail.com"
                      :rules="emailRules"
                      required
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      name="password"
                      label="Contraseña"
                      :counter="15"
                      maxlength="15"
                      :rules="rulesPassword"
                      required
                      @click:append="show = !show"
                    >
                    </v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      label="Recordar contraseña"
                      required
                    >
                    </v-checkbox>
                  </v-col>
                  <v-col xs="8" lg="6" offset-xs="2" offset-lg="3" class="pb-1">
                    <v-btn
                      block
                      rounded
                      :loading="loading"
                      :disabled="loading"
                      @click="login"
                      class="mt-4"
                      color="primary"
                      value="log in"
                    >
                      Entrar
                    </v-btn>
                  </v-col>
                  <v-col cols="12"   class="text-center pt-2">
                    <v-btn text small> ¿ Olvidaste tu contraseña ? </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationForm } from "../../shared/utils";
import axios from "@/axios/axios";
import { mapActions, mapState } from 'vuex'

const { min, required, email } = validationForm();

export default {
  data: () => ({
    valid: true,
    show: false,
    password: "123456",
    loading: false,
    rulesPassword: [(v) => required(v, "password"), (v) => min(v, 6)],
    email: "jesusrosales19@gmail.com",
    emailRules: [(v) => required(v, "email"), (v) => email(v)],
    checkbox: false,
  }),

  created() {},

  methods: {
    //  ...mapActions('auth' , ['login']),

    login() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
          loading: this.loading
        })
      }
    }
    // async login() {
    //   this.loading = true;

    //   const user = {
    //     email: this.email,
    //     password: this.password,
    //   };

    //   if(this.$refs.form.validate()) {
    //     await axios.post("/auth/login", user)
    //      .then((resp) => {
    //        this.$toast.success("Hola, ¡Bienvenido.!", {});
    //        localStorage.setItem("access_token", resp.data);
    //        this.loading = true;
    //        console.log(resp.data)
    //        setTimeout(() => (this.loading = false), 2000);
    //        setTimeout(() => this.$router.push("index"), 2500);
    //      })
    //      .catch((error) => {
    //        this.alert = true
    //        this.$toast.error("Tu email o contraseña no son correctas", {});
    //        console.log(error.data);
    //      });

    //   }
    //        setTimeout(() => {
    //          this.loading = false;
    //        }, 3000);

    // },
  },
};
</script>

<style scoped>
.bar-progress {
  width: 100%;
  height: 100vh;
  position: absolute !important;
  padding: 0;
  margin: 0;
  background-color: rgba(255, 255, 255, 1);
}
.name-logo {
  color: #00ac62;
  padding-left: 3px;
}
.color1 {
  background-color: #2561a7;
}

.color2 {
  background-color: #00ac62;
}

.box {
  height: 100vh;
}

.auth-card {
  width: 70%;
  max-width: 500px;
  height: 480px;
  min-height: inherit;
  color: #fff !important;
  padding: 20px;
}

.img-box {
  object-fit: cover;
  object-position: 10% 100%;
}

.box-left {
  height: 100vh;
  width: 100%;
  min-height: 100%;
}

.margin-img {
  margin-top: 20px;
}

@media screen and (min-width: 1264px) {
  .auth-card {
    width: 65%;
    /* height: 500px; */
    max-width: inherit;
    min-height: inherit;
  }
  .margin-img {
    margin-top: 20px;
  }

  .img-box {
    clip-path: polygon(0 0, 97% 0, 85% 100%, 0% 100%);
  }
}
@media screen and (min-width: 960px) and (max-width: 1263px) {
  .margin-img {
    margin-top: 20px;
  }
  .img-box {
    background-image: url("../../../assets/boxs-md.jpg");
    background-position: 77% center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
}

@media screen and (min-width: 600px) and (max-width: 959px) {
  .auth-card {
    width: 90%;
    max-width: 450px;
    height: auto;
    min-height: 500px;
  }
  .margin-img {
    margin-top: 20px;
  }
  .imx-bg-responsive {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
      url("../../../assets/boxs.jpg");
    background-position: left center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
}
@media screen and (max-width: 599px) {
  .auth-card {
    width: 90%;
    max-width: 400px;
    height: auto;
    min-height: inherit;
  }
  .margin-img {
    margin-top: 20px;
  }
  .imx-bg-responsive {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
      url("../../../assets/boxs.jpg");
    background-position: right center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
}
</style>
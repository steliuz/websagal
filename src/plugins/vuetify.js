import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#2461a7', // #E53935
            secondary: '#03AC63', // #FFCDD2
            accent: colors.indigo.base, // #3F51B5
            claro: '#518fd6',
            gray: '#90A4AE'
          },
        },
      },
});

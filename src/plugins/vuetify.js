import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#eeeeee',
                secondary: '#0a60ad',
                anchor: '#dceffd',
                warning: '#83C6F9',
                darkblue: '#0a60ad'
            },
        },
    },
})
import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import * as firebase from 'firebase';

import App from './App';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';

Vue.use(Vuetify, {
  theme: {
    primary: '#D32F2F',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBNLpV27Ubk1Ub188NJu2AYw84-AG2bofM',
      authDomain: 'developermeetup.firebaseapp.com',
      databaseURL: 'https://developermeetup.firebaseio.com',
      projectId: 'developermeetup',
      storageBucket: 'gs://developermeetup.appspot.com',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });

    this.$store.dispatch('loadMeetups');
  },
});

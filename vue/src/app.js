import _ from 'lodash';
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import moment from 'moment';
import './sass/base.scss';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

//require ('./vue-templates/components.js');

Vue.component(
  'Nowplaying',
  require('./vue-templates/now-playing.vue').default
);

const Explore = require('./vue-templates/explore.vue').default
const Browse = require('./vue-templates/browse.vue').default
const Playback = require('./vue-templates/playback.vue').default

//Preparing for changing multiple views
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', components: {a: Explore}, name:"explore" },
    { path: '/browse', components: {a: Browse}, name: "browse" },
    { path: '/playback', components: {a: Playback}, name:"playback" }
  ]
});

Vue.prototype.moment = moment

var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug){
      console.log('setMessageAction triggered with', newValue);
    }
    this.state.message = newValue;
  },
  clearMessageAction () {
    if (this.debug){
      console.log('clearMessageAction triggered');
    }
    this.state.message = '';
  }
};

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://wave.local:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

var app = new Vue({
el: '#app',
router: router,
data: {
  message: 'Hello Wave!',
},
sockets: {
  connect: function () {
    console.log('socket connected');
  },
  pushState: function (data) {
    console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    console.log(data);
  }
},
methods:{
  getStatus(){
    console.log('Clicking on get state');
    this.$socket.emit('getState');
  },
  handleResize(e){
    console.log('Resizing');
  },

}
});

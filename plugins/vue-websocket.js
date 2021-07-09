import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }, inject) => {
  Vue.use(VueNativeSock, 'ws://10.10.6.80/insacog/wsa/frontend/', {
		store: store,
		format: 'json',
  		connectManually: true,
  })
}

import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }, inject) => {
  Vue.use(VueNativeSock, `${process.env.WS_BASE_URL}/frontend`, {
		store: store,
		format: 'json',
  		connectManually: true,
  })
}

import Vue from 'vue'
import { ToastProgrammatic as Toast } from 'buefy'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home',
	timeout: null,
	table_search: '',
	landing_info: {},
	missing_columns: [],
	download_metadata: [],
	landing_info_loaded: false,
	download_notification: false,
	// WebSocket data
	all_metadata: null,
	uploaded_metadata: {},
	metadata_length: 0,
	table_loading: true,
	socket: {
		isConnected: false,
		isLoaded: {
			all_metadata: false,
		}
	}
});

const connectWS = () => {
	Vue.prototype.$connect()
}

const disconnectWS = () => {
	Vue.prototype.$disconnect()
}

export const getters = {
	getField,
	get_timeout(state) {
		return state.timeout
	}
};

export const mutations = {
	updateField,
	SET_TIMEOUT(state, payload) {
		state.timeout = payload
	},
	SOCKET_ONOPEN (state, event)  {
		this.$socket = event.currentTarget
		state.socket.isConnected = true
		this.$socket.send(JSON.stringify({'type': 'MY_METADATA', 'filter': { 'each_page': 15, 'page': 1 }}))
		this.$socket.send(JSON.stringify({'type': 'MY_METADATA_NAME'}))
	},
	SOCKET_ONCLOSE (state, event)  {
		state.socket.isConnected = false
	},
	SOCKET_ONERROR (state, event)  {
		console.error('Error', state, event)
	},
	SOCKET_ONMESSAGE (state, event)  {
		if(event['type'] == 'MY_METADATA') {
			state.all_metadata = event.data.metadata
			state.metadata_length = event.data.total_length
			state.table_loading = false
			state.socket.isLoaded.all_metadata = true
		} else if(event['type'] == 'DOWNLOAD_METADATA') {
			state.download_metadata = event.data.metadata
			state.download_notification = false
		} else if(event['type'] == 'MY_METADATA_NAME') {
			state.uploaded_metadata = event.data.name
		}
	},
	SOCKET_RECONNECT(state, count) {
		console.info('socket_reconnect')
	},
	SOCKET_RECONNECT_ERROR(state) {
		console.info('socket_reconnect_error')
	},
	SET_LANDING(state, payload) {
		state.landing_info = payload
		state.landing_info_loaded = true
	},
}

export const actions = {
	async set_timeout({ commit }, payload) {
		commit('SET_TIMEOUT', payload)
	},
	async websocket_connect({ commit }) {
		connectWS()
	},
	async websocket_disconnect({ commit }) {
		disconnectWS()
	},
	async websocket_send({ commit }, payload) {
		this.$socket.send(JSON.stringify(payload))
	},
	async set_landing_info({ commit }) {
		const data = await this.$axios.$post('https://research.nibmg.ac.in/insacog/api/files/landing-stats/')
		commit('SET_LANDING', data)
	},
}

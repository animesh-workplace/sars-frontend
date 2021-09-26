import Vue from 'vue'
import moment from "moment"
import { ToastProgrammatic as Toast } from 'buefy'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home',
	timeout: null,
	missing_columns: [],
	landing_info: {},
	landing_info_loaded: false,
	// WebSocket data
	map_data: [],
	dashboard: {},
	all_metadata: null,
	metadata_length: 0,
	bar_chart_data: {},
	table_loading: true,
	treemap_chart_data: {},
	lineage_definition_data: {},
	socket: {
		isConnected: false,
		isLoaded: {
			map_data: false,
			dashboard: false,
			all_metadata: false,
			bar_chart_data: false,
			treemap_chart_data: false,
			lineage_definition_data: false
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
		console.log(event)
		this.$socket = event.currentTarget
		state.socket.isConnected = true
		this.$socket.send(JSON.stringify({'type': 'ALL_METADATA', 'filter': { 'each_page': 15, 'page': 1 }}))
	},
	SOCKET_ONCLOSE (state, event)  {
		state.socket.isConnected = false
	},
	SOCKET_ONERROR (state, event)  {
		console.error(state, event)
	},
	SOCKET_ONMESSAGE (state, event)  {
		if(event['type'] == 'ALL_METADATA') {
			state.all_metadata = event.data.metadata
			state.metadata_length = event.data.total_length
			state.table_loading = false
			state.socket.isLoaded.all_metadata = true
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
		const data = await this.$axios.$post('/files/landing-stats/')
		commit('SET_LANDING', data)
	},
}

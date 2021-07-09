import Vue from 'vue'
import moment from "moment"
import { ToastProgrammatic as Toast } from 'buefy'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home',
	timeout: null,
	missing_columns: [],
	// WebSocket data
	map_data: [],
	dashboard: {},
	all_metadata: null,
	bar_chart_data: {},
	table_loading: true,
	socket: {
		isConnected: false,
		isLoaded: {
			map_data: false,
			dashboard: false,
			all_metadata: false,
			bar_chart_data: false,
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
		this.$socket.send(JSON.stringify({'type': 'DASHBOARD'}))
		this.$socket.send(JSON.stringify({'type': 'ALL_METADATA'}))
		this.$socket.send(JSON.stringify({'type': 'BAR_CHART_DATA'}))
		this.$socket.send(JSON.stringify({'type': 'MAP_DATA'}))
	},
	SOCKET_ONCLOSE (state, event)  {
		state.socket.isConnected = false
	},
	SOCKET_ONERROR (state, event)  {
		console.error(state, event)
	},
	SOCKET_ONMESSAGE (state, event)  {
		if(event['type'] == 'ALL_METADATA') {
			state.all_metadata = event.data
			state.table_loading = false
			state.socket.isLoaded.all_metadata = true
		}
		else if(event['type'] == 'DASHBOARD') {
			state.dashboard = event.data
			state.socket.isLoaded.dashboard = true
		}
		else if(event['type'] == 'BAR_CHART_DATA') {
			state.bar_chart_data = event.data
			state.socket.isLoaded.bar_chart_data = true
		}
		else if(event['type'] == 'MAP_DATA') {
			state.map_data = event.data
			state.socket.isLoaded.map_data = true
		}
	},
	SOCKET_RECONNECT(state, count) {
		console.info('socket_reconnect')
	},
	SOCKET_RECONNECT_ERROR(state) {
		console.info('socket_reconnect_error')
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
	}
}

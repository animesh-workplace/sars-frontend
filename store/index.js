import moment from "moment";
import { ToastProgrammatic as Toast } from 'buefy';
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home',
	timeout: null,
	missing_columns: [],
	websocket_connection: null,
});

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
	SET_WEBSOCKET_CONNECTION(state, payload) {
		state.websocket_connection = payload
		state.websocket_connection.onmessage = (event) => {
			let websocket_data = JSON.parse(event.data)['message']
		}
	}
}

export const actions = {
	async set_timeout({ commit }, payload) {
		commit('SET_TIMEOUT', payload)
	},
	async set_websocket_connection({ commit }) {
		commit('SET_WEBSOCKET_CONNECTION', new WebSocket(`${process.env.WS_BASE_URL}/frontend/`))
	}
}

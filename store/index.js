import moment from "moment";
import { ToastProgrammatic as Toast } from 'buefy';
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home',
	timeout: null,
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
	}
}

export const actions = {
	async set_timeout({ commit }, payload) {
		commit('SET_TIMEOUT', payload)
	}
}

import moment from "moment";
import { ToastProgrammatic as Toast } from 'buefy';
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	active: 'Home'
});

export const getters = {
	getField,
};

export const mutations = {
	updateField,
}

export const actions = {
}

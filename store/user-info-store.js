import moment from "moment"
import { ToastProgrammatic as Toast } from 'buefy'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	token_expiry: '',
	download_link: '',
	uploaded_metadata: {},
});

export const getters = {
	getField,
};

export const mutations = {
	SET_TOKEN_EXPIRY(state, payload) {
		state.token_expiry = payload
	},
	SET_UPLOADED_METADATA(state, payload) {
		state.uploaded_metadata = payload
	},
	SET_DOWNLOAD_LINK(state, payload) {
		state.download_link = payload
	},
	updateField,
}

export const actions = {
	async user_login({ commit, dispatch }, payload) {
		try {
			const data = await this.$axios.$post('/auth/login/', payload)
			this.$auth.setToken('local', `JWT ${ data.token }`)
			this.$auth.setRefreshToken('local', data.token)
			this.$axios.setHeader('Authorization', `JWT ${ data.token }`)
			this.$auth.setUser(data.username)
			this.$auth.ctx.app.$axios.setHeader('Authorization', `JWT ${ data.token }`)
			await commit('SET_TOKEN_EXPIRY', data.expires)
			this.$auth.$storage.setCookie('token_expiry', data.expires)
			await dispatch('set_uploaded_metadata')
			await dispatch('set_download_link')
			// localStorage.setItem('token_expiry', data.expires)
			this.$router.push('/upload')
			Toast.open({
				message: `Logged In Successfully`,
				type: 'is-success',
				position: 'is-bottom'
			})
		} catch(err) {
			Toast.open({
				message: err.response.data['message'] || err.response.data || err,
				type: 'is-danger',
				position: 'is-bottom'
			})
		}
	},
	async user_logout({ commit, dispatch }) {
		this.$auth.logout()
		this.$cookies.remove('c_uid')
		this.$auth.$storage.setCookie('token_expiry', false)
		await commit('SET_TOKEN_EXPIRY', '')
		await this.dispatch('websocket_disconnect')
		Toast.open({
			type: 'is-info',
			message:'Logged Out',
			position: 'is-bottom'
		})
	},
	async user_logout_server({ commit, dispatch }) {
		this.$auth.logout()
		this.$auth.$storage.setCookie('token_expiry', false)
		this.$cookies.remove('c_uid')
		await commit('SET_TOKEN_EXPIRY', '')
	},
	async set_uploaded_metadata({ commit }) {
		const metadata_header = await this.$axios.$post('/files/metadata-info-name/')
		commit('SET_UPLOADED_METADATA', metadata_header)
	},
	async set_download_link({ commit }) {
		const link_api = await this.$axios.$post('/files/metadata-download/')
		let link = link_api.link
		commit('SET_DOWNLOAD_LINK', link)
	},
}

import moment from "moment"
import { ToastProgrammatic as Toast } from 'buefy'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	userinfo: {},
	token_expiry: '',
	avatar_image: '',
	poster_image: '',
	editmode: false,
	uploaded_metadata: {},
	activateemailmodal: false,
	activateuploadposter: false,
	activateuploadavatar: false,
	activatepasswordmodal: false,
	activateedituserinfomodal: false,
	activateforgotpasswordmodal: false,
});

export const getters = {
	getField,
};

export const mutations = {
	SET_USERINFO(state, payload) {
		state.userinfo = payload
	},
	SET_TOKEN_EXPIRY(state, payload) {
		state.token_expiry = payload
	},
	SET_AVATAR_IMAGE(state, payload) {
		state.avatar_image = payload
	},
	SET_POSTER_IMAGE(state, payload) {
		state.poster_image = payload
	},
	SET_EDIT_MODE(state, payload) {
		state.editmode = payload
	},
	SET_ACTIVATE_EMAIL_MODAL(state, payload) {
		state.activateemailmodal = payload
	},
	SET_ACTIVATE_EDIT_USER_INFO_MODAL(state, payload) {
		state.activateedituserinfomodal = payload
	},
	SET_ACTIVATE_PASSWORD_MODAL(state, payload) {
		state.activatepasswordmodal = payload
	},
	SET_ACTIVATE_FORGOT_PASSWORD_MODAL(state, payload) {
		state.activateforgotpasswordmodal = payload
	},
	SET_UPLOADED_METADATA(state, payload) {
		state.uploaded_metadata = payload
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
		await dispatch('set_activateforgotpasswordmodal', false)
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
		await dispatch('set_activateforgotpasswordmodal', false)
	},
	async update_password_submit({ commit, dispatch }, payload) {
		try{
			const data = await this.$axios.$post('/auth/update-password/', payload)
			await dispatch('set_activatepasswordmodal', false)
	        // Toast.open({
	        //   message: data['message'],
	        //   type: 'is-success',
	        //   position: 'is-bottom'
	        // })
		} catch(err) {
			await dispatch('set_activatepasswordmodal', false)
			// Toast.open({
			// 	message: err.response.data['message'] || err.response.data || err,
			// 	type: 'is-danger',
			// 	position: 'is-bottom'
			// })
		}
	},
	async forgot_password_submit({ commit, dispatch }, payload) {
		try{
			const data = await this.$axios.$post('/auth/forgot-password/', payload)
			await dispatch('set_activateforgotpasswordmodal', false)
	        // Toast.open({
	        //   message: data['message'],
	        //   type: 'is-success',
	        //   position: 'is-bottom'
	        // })
		} catch(err) {
			await dispatch('set_activateforgotpasswordmodal', false)
			// Toast.open({
			// 	message: err.response.data['message'] || err.response.data || err,
			// 	type: 'is-danger',
			// 	position: 'is-bottom'
			// })
		}
	},
	async set_uploaded_metadata({ commit }) {
		const metadata_header = await this.$axios.$post('/files/metadata-info-name/')
		commit('SET_UPLOADED_METADATA', metadata_header)
	},
	set_activateforgotpasswordmodal({ commit }, payload) {
		commit('SET_ACTIVATE_FORGOT_PASSWORD_MODAL', payload)
	},
}

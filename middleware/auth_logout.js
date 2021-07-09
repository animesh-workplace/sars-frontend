export default async function ({ app, redirect }) {
	const { $axios, $auth, store, router } = app
	let refreshToken = $auth.$storage.getCookie('_refresh_token.local')
	let tokenexpiry = $auth.$storage.getCookie('token_expiry')
	let expiry_time_ms = new Date(tokenexpiry).getTime()
	let time_now_ms = new Date().getTime()
	let time_left = expiry_time_ms - time_now_ms
	if(store.getters.get_timeout == null) {
		console.log('timeout is null in store')
		if(time_left > 1000) {
			console.log('Time is greater than 1000')
			let time_out_function = setTimeout(function() {
										store.dispatch('user-info-store/user_logout')
									}, time_left);
		} else {
			console.log('Time is less than 1000')
			store.dispatch('user-info-store/user_logout_server')
			return redirect('/login')
		}
	}
	store.dispatch('set_timeout', true)
}

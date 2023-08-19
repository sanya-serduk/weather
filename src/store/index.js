import { createStore } from 'vuex'
import city from "@/store/modules/city";
import settings from "@/store/modules/settings";
import weather from "@/store/modules/weather";
import localstorage from "@/store/modules/localstorage";
import localstoragePlugin from "@/store/plugins/localstorage";

export default createStore({
	modules: {
		settings,
		weather,
		city,
		localstorage
	},
	plugins: [
		localstoragePlugin
	]
})
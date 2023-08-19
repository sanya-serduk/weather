import mitt from "mitt";

export default {
	install: (Vue) => {
		Vue.config.globalProperties.$emitter = mitt()
	}
}
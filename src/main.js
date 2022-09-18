/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import { ProjectSelector } from "../dist/my-lib-es";
Vue.config.productionTip = false;
Vue.use(ProjectSelector);
// Vue.use(ProjectSelector);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"
Vue.use(Antd)

new Vue({
  render: (h) => h(App),
}).$mount("#app");

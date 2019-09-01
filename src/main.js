import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import vcolorpicker from 'vcolorpicker'

Vue.config.productionTip = false;

Vue.prototype.$g = null;

Vue.use(Antd);

Vue.use(vcolorpicker)

new Vue({
  render: h => h(App),
}).$mount('#root');

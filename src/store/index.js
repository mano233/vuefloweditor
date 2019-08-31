import Vue from 'vue';
import Vuex from 'vuex';
import {Graph} from '@/core/editorcore';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
        init(){
            Vue.prototype.$g = Graph.init({
                container: document.getElementById('mountNode'),
                width: 500,
                height: 500,
                modes: {
                    default: ['drag-node', 'click-select'],
                    addElement: ['drag-node', 'click-select', 'click-add-node','hoverNodeActived','dragEdge'],
                    addLine : ['drag-node','click-select','click-add-edge-line'],
                    addCurve : ['drag-node','click-select','click-add-edge-curve'],
                    deleteItem : ['click-select','delete-add-node']
                },
                defaultEdge: {
                    shape: 'flow-polyline-round',
                },
            });
        },
        destroy(state,g){
            g.destroy();
        }
    }
})

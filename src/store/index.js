import Vue from 'vue';
import Vuex from 'vuex';
import {Graph} from '@/core/editorcore';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
        init(){
            const g = Graph.init({
                container: document.getElementById('mountNode'),
                width: 500,
                height: 500,
                modes: {
                    default: ['drag-node', 'click-select'],
                    addElement: ['drag-node', 'clickSelected', 'click-add-node','hoverNodeActived','dragEdge'],
                    deleteItem : ['click-select','delete-add-node']
                },
                defaultEdge: {
                    shape: 'flow-polyline-round',
                },
            });
            Vue.prototype.$g = g;
            g.on('afteritemselected',(e)=>{
                console.log(e);
            })
        },
        destroy(state,g){
            g.destroy();
        }
    }
})

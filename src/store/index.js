import Vue from 'vue';
import Vuex from 'vuex';
import {Graph} from '@/core/editorcore';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
        init(){
            const graph = new Graph();

            const g = graph._init({
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


            g.on('afteritemselected',(item)=>{
                console.log(item);
                console.log(item._cfg.model);
                // g.updateItem(item,{x:90});

            })
        },
        destroy(state,g){
            g.destroy();
        }
    }
})

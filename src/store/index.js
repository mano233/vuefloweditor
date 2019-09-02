import Vue from 'vue';
import Vuex from 'vuex';
import {Graph} from '@/core/editorcore';

Vue.use(Vuex);


// types
const types = {
    SET_ITEMNODE: 'SET_ITEMNODE',
    SET_SHOWVIEW: 'SET_SHOWVIEW',
};

// state
const state = {
    result: null, //存储canvas打印结果
    selectedItem: null, // 当前选中的Item
    showEditor: false, //是否展示编辑页面
    panelSelected:{},// 左侧面板选中的图形
};

// getters
const getters = {
    result: state => state.result,
    showEditor: state => state.showEditor,
};

// mutations
const mutations = {
    //初始化
    init () {
        //创建构造函数
        const graph = new Graph();
        //初始化
        const g = graph._init({
            container: document.getElementById('mountNode'),
            width: 1000,
            height: 500,
            modes: {
                default: ['drag-node', 'click-select'],
                // addElement: ['drag-node', 'clickSelected', 'click-add-node','hoverNodeActived','dragEdge'],
                addElement: ['drag-node', 'click-add-node', 'clickSelected'],
                addEdge: ['drag-node', 'click-select', 'click-add-edge'],
                deleteItem: ['click-select', 'delete-add-node']
            },
            defaultEdge: {
                shape: 'flow-polyline-round',
            },

        });
        Vue.prototype.$g = g;

        g.on('afteritemselected', (item) => {
            console.log(item);
            // console.log(item._cfg.model);
            // g.updateItem(item,{x:90});
        })

    },
    setPanelSelected(state,obj) {
        state.panelSelected = obj;
    },
    //打印canvas的内容
    computedresult (state, item) {
        let nodesArr = [];
        let edgesArr = [];

        let {nodes} = item; //节点
        let {edges} = item; //线条

        //遍历所有节点
        nodes.forEach(function (ele) {
            nodesArr.push(ele._cfg.model);
        })

        //遍历所有线条
        edges.forEach(function (ele) {
            edgesArr.push(ele._cfg.model);
        })

        let newArrNode = [];
        let newArrEdge = [];

        //拿到对应的信息
        nodesArr.forEach(function (ele) {
            newArrNode.push({
                id: ele.id,
                x: ele.x,
                y: ele.y,
                shape: ele.shape,
                label: ele.label,
                style: ele.style
            });
        })

        edgesArr.forEach(function (ele) {
            newArrEdge.push({
                source: ele.source,
                target: ele.target,
                shape: ele.shape,
            });
        })

        let result = {
            'edges': JSON.stringify(newArrEdge),
            'nodes': JSON.stringify(newArrNode),
        }

        state.result = result;
    },

    //修改点击的元素
    [types.SET_ITEMNODE] (state, itemNode) {
        if (itemNode) {
            state.selectedItem = itemNode;
        } else {
            state.selectedItem = null;
        }
    },

    //修改是否展示编辑框
    [types.SET_SHOWVIEW] (state, showEditor) {
        if (showEditor) {
            state.showEditor = showEditor;
        } else {
            state.showEditor = false;
        }
    },




    destroy (state, g) {
        g.destroy();
    }
}


export default new Vuex.Store({
    state,
    getters,
    mutations
})

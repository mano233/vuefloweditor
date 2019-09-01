<template>

    <div class="toolbar">
        <a-button-group>
            <a-button  @click="addElementCircle">添加圆形元素</a-button>
            <a-button  @click="addElementRect">添加方形元素</a-button>
            <a-button  @click="addElementTriangle">添加三角形元素</a-button>
            <a-button  @click="addLine">添加直线线条</a-button>
            <a-button  @click="addArrowLine">添加箭头直线线条</a-button>
            <a-button  @click="addCurve">添加曲线线条</a-button>
            <a-button  @click="deleteItem">删除元素</a-button>
            <a-button  @click="changeColor">改变颜色</a-button>
            <a-button  @click="clearCanvas">清空画布</a-button>
            <a-button  @click="save">保存</a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {Graph} from "@/components/core/editorcore";
    import list from '../core/behaviors/index';

    let g = null;

    export default {
        name: "ToolBar",
        data () {
            return {
                count: 1,
                data : null
            }
        },
        mounted () {
           this.init();
        },

        methods: {
            //初始化
            init(){
                // let ele = document.getElementsByClassName('sketchpad');
                let num = document.getElementById('mountNode').children.length;
                //避免添加多个canvas
                if(num <= 0){
                     this.$root.$g = Graph.init({
                        container: document.getElementById('mountNode'),
                        width: 1000,
                        height: 500,
                        modes: {
                            default: ['drag-node', 'click-select','diamond'],
                            addElementCircle : ['drag-node','click-select','click-add-node-circle'],
                            addElementRect : ['drag-node','click-select','click-add-node-rect'],
                            addArrowLine : ['drag-node','click-select','click-add-node-arrow'],
                            addElementTriangle : ['drag-node','click-select','click-add-node-triangle'],
                            addLine : ['drag-node','click-select','click-add-edge-line'],
                            addCurve : ['drag-node','click-select','click-add-edge-curve'],
                            deleteItem : ['click-select','delete-add-node']
                        },
                    });
                    g = this.$root.$g;
                }
            },
            //切换模式(添加圆形元素)
            addElementCircle(){
                g.setMode('addElementCircle');
            },
            //切换模式(添加方形元素)
            addElementRect(){
                g.setMode('addElementRect');
            },
            //切换模式(添加直线)
            addLine(){
                g.setMode('addLine');
            },
            addArrowLine(){
                g.setMode('addArrowLine')
            },
            //切换模式(添加曲线)
            addCurve(){
                g.setMode('addCurve');
            },
            //删除节点
            deleteItem(){
                g.setMode('deleteItem');
            },
            addElementTriangle(){
                g.setMode('addElementTriangle');
            },
            //改变颜色
            changeColor(){
                console.log(list);
                list.list.push('#'+Math.random().toString().substring(8,14))
            },
            //清空画板
            clearCanvas(){
                Graph.clearCanvas();
            },
            //保存信息
            save(){
                let nodesArr = [];
                let edgesArr = [];

                let {nodes} = g._cfg; //节点
                let {edges} = g._cfg; //线条

                console.log(nodes);
                console.log(edges);

                nodes.forEach(function (ele) {
                    nodesArr.push(ele._cfg.model);
                })

                edges.forEach(function (ele) {
                    edgesArr.push(ele._cfg.model);
                })

                console.log(nodesArr)
                console.log(edgesArr)

                let nodeObj = {};
                let edgeObj = {};
                let newArrNode = [];
                let newArrEdge = [];

                nodesArr.forEach(function (ele) {
                    nodeObj = {
                        id : ele.id,
                        x : ele.x,
                        y : ele.y,
                        shape : ele.shape,
                        label : ele.label,
                        style : ele.style
                    }
                    newArrNode.push(nodeObj);
                })

                edgesArr.forEach(function (ele) {
                    edgeObj = {
                        source: ele.source,
                        target: ele.target,
                        shape : ele.shape,
                    }
                    newArrEdge.push(edgeObj);
                })

                let result = {
                    'edges': JSON.stringify(newArrEdge),
                    'nodes' : JSON.stringify(newArrNode),
                }

                console.log(result)
            }
        }
    }



</script>

<style scoped>
    .toolbar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

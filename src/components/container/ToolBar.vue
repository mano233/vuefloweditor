<template>

    <div class="toolbar">
        <a-button-group>
            <a-button  @click="addElementCircle">添加圆形元素</a-button>
            <a-button  @click="addElementRect">添加方形元素</a-button>
            <a-button  @click="addLine">添加直线线条</a-button>
            <a-button  @click="addCurve">添加曲线线条</a-button>
            <a-button  @click="deleteItem">删除元素</a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {Graph} from "@/components/core/editorcore";
    let g = null;

    export default {
        name: "ToolBar",
        data () {
            return {
                count: 1,
            }
        },
        mounted () {
            g = Graph.init({
                container: document.getElementById('mountNode'),
                width: 500,
                height: 500,
                modes: {
                    default: ['drag-node', 'click-select'],
                    addElement: ['drag-node', 'click-select', 'click-add-node'],
                    addLine : ['drag-node','click-select','click-add-edge-line'],
                    addCurve : ['drag-node','click-select','click-add-edge-curve'],
                    deleteItem : ['click-select','delete-add-node']
                },
            });
        },
        methods: {
            //切换模式(添加圆形元素)
            addElementCircle(){
                g.setMode('addElement');
                g.clickAddNode('circle');
            },
            //切换模式(添加方形元素)
            addElementRect(){
                g.setMode('addElement');
                g.clickAddNode('rect');
            },
            //切换模式(添加直线)
            addLine(){
                g.setMode('addLine');
            },
            //切换模式(添加曲线)
            addCurve(){
                g.setMode('addCurve');
            },
            //删除节点
            deleteItem(){
                g.setMode('deleteItem');
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

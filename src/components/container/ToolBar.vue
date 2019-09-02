<template>

    <div class="toolbar">
        <a-button-group>
            <a-button  @click="addElementCircle">添加圆形元素</a-button>
            <a-button  @click="addElementRect">添加方形元素</a-button>
            <a-button  @click="addLine">添加直线线条</a-button>
            <a-button  @click="addCurve">添加曲线线条</a-button>
            <a-button  @click="changeLine">改变线条</a-button>
            <a-button  @click="deleteItem">删除元素</a-button>
            <a-button  @click="clearCanvas">清空画布</a-button>
            <a-button  @click="save">保存</a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {clickAddNode,clickAddEdge} from '../../core/register/behaviors/handlers'
    import {Graph} from "../../core/editorcore";

    export default {
        name: "ToolBar",
        methods: {
            //切换模式(添加圆形元素)
            addElementCircle(){
                this.$g.setMode('addElement');
                clickAddNode('RewriteCircle');
            },
            //切换模式(添加方形元素)
            addElementRect(){
                this.$g.setMode('addElement');
                clickAddNode('RewriteRect');
            },
            //切换模式(添加直线)
            addLine(){
                this.$g.setMode('addEdge');
                clickAddEdge('line');
            },
            //切换模式(添加曲线)
            addCurve(){
                this.$g.setMode('addEdge');
                clickAddEdge('cubic');
            },
            //删除节点
            deleteItem(){
                this.$g.setMode('deleteItem');
            },
            //改变线条
            changeLine(){

            },
            //清空画板
            clearCanvas(){
                //创建构造函数，使用私有的方法清空
                let graph = new Graph();
                graph._clearCanvas(this.$g);
            },
            //保存canvas上信息
            save(){
                this.$store.commit('computedresult',this.$g._cfg);

                console.log(this.$store.getters.result);
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

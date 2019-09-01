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
    export default {
        name: "ToolBar",
        data () {
            return {
                count: 1,
            }
        },
        methods: {
            //切换模式(添加圆形元素)
            addElementCircle(){
                this.$g.setMode('addElement');
                this.$g.clickAddNode('base-node');
            },
            //切换模式(添加方形元素)
            addElementRect(){
                this.$g.setMode('addElement');
                this.$g.clickAddNode('rect');
            },
            //切换模式(添加直线)
            addLine(){
                this.$g.setMode('addLine');
            },
            //切换模式(添加曲线)
            addCurve(){
                this.$g.setMode('addCurve');
            },
            //删除节点
            deleteItem(){
                this.$g.setMode('deleteItem');
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

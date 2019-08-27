<template>
    <div class="ToolBar">
        <button  @click="addElement">添加元素</button>
        <button  @click="addLine">添加线条</button>
        <button  @click="deleteItem">删除元素</button>
    </div>
</template>

<script>
    import {Graph} from "@/components/core/editorcore";
    let g = null;

    const data = {
        nodes : [],
        edges : []
    }

    export default {
        name: "ToolBar",
        data () {
            return {
                count: 1,
                data : data.nodes
            }
        },
        mounted () {
            g = Graph.init({
                container: document.getElementById('mountNode'),
                width: 500,
                height: 500,
                modes: {
                    default: ['drag-node', 'click-select'],
                    addElement : ['drag-node','click-select','click-add-node'],
                    addLine : ['drag-node','click-select','click-add-edge'],
                    deleteItem : ['click-select','delete-add-node']
                },
            });
            console.log(g.instance)

        },
        methods: {
            //切换模式(添加元素)
            addElement(){
                g.setMode('addElement');
            },
            //切换模式(添加线条)
            addLine(){
                console.log(g)
                g.setMode('addLine');
            },
            //删除节点
            deleteItem(){
                g.setMode('deleteItem');
            }
        }
    }
</script>

<style scoped>
.ToolBar{
    width: 100%;
    border: 1px solid black;
}
</style>
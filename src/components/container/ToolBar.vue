<template>
    <div class="toolbar">
        <a-button-group>
            <a-button @click="addElement">添加元素</a-button>
            <a-button @click="addLine">添加线条</a-button>
            <a-button @click="deleteItem" type="dashed">删除元素</a-button>
        </a-button-group>
        <!--<button  @click="addElement">添加元素</button>-->
        <!--<button  @click="addLine">添加线条</button>-->
        <!--<button  @click="deleteItem">删除元素</button>-->
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
    .toolbar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

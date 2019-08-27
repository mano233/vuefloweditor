<template>
    <div id="app">
        <div id="mountNode"></div>
        <button  @click="addElement">添加元素</button>
        <button  @click="addLine">添加线条</button>
        <button  @click="deleteItem">删除元素</button>
    </div>
</template>

<script>
    import {Graph} from "@/components/core/editorcore";

    let g = null;
    export default {
        name: 'app',
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

        },
        methods: {
            //切换模式(添加元素)
            addElement(){
                g.setMode('addElement');
            },
            //切换模式(添加线条)
            addLine(){
                g.setMode('addLine');
            },
            //删除节点
            deleteItem(){
                g.setMode('deleteItem');
            }
        }
    }
</script>

<style>
    canvas {
        border: 1px solid red;
    }
    #app {
        position: relative;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

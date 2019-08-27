<template>
    <div id="app">
        <div id="mountNode"></div>
        <button id="btn" @click="add">add</button>
        <button  @click="addElement">添加元素</button>
        <button  @click="addLine">添加线条</button>
        <button  @click="deleteItem">删除元素</button>
    </div>
</template>

<script>

    import {Graph} from "@/components/core/editorcore";

    const g = new Graph();

    const data = {
        nodes: [],
        edges: []
    };

    export default {
        name: 'app',
        data () {
            return {
                nodes: data.nodes,
                count: 1,
            }
        },
        watch: {
            nodes () {
                g.draw(data);
            }
        },
        mounted () {
            g.init({
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
            g.draw(data);
        },
        methods: {
            //增加节点
            add () {
                this.count += 20;
                this.nodes.push({
                    x: 50 + this.count,
                    y: 10 + this.count,
                    shape: 'circle',
                    label: 'circle',
                })
            },
            //切换模式(添加元素)
            addElement(){
                g.instance.setMode('addElement');
            },
            //切换模式(添加线条)
            addLine(){
                g.instance.setMode('addLine');
            },
            //删除节点
            deleteItem(){
                g.instance.setMode('deleteItem');
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

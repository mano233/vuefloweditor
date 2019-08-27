<template>
    <div id="app">
        <div id="mountNode" style="border: 1px solid red;"></div>
        <button id="btn" @click="add">add</button>
    </div>
</template>

<script>

    import {Graph} from "@/components/core/editorcore";

    const g = new Graph();

    const data = {
        nodes: [{
            id:'node1',
            x: 100,
            y: 100,
            shape: 'circle',
            label: 'circle',
        },{
            id : 'node2',
            x: 300,
            y: 300,
            shape: 'circle',
            label: 'circle',
        }],
        // edges: []
    };

    export default {
        name: 'app',
        data () {
            return {
                nodes: data.nodes,
                count : 1
            }
        },
        watch: {
            nodes () {
                g.draw(data);
            }
        },
        mounted () {
            g.init(document.getElementById('mountNode'));
            g.draw(data);
        },
        methods: {
            add () {
                this.count += 20;
                this.nodes.push({
                    x: 50 + this.count,
                    y: 10 + this.count,
                    shape: 'circle',
                    label: 'circle',
                })
                console.log(data)
            },
        }
    }
</script>

<style>
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

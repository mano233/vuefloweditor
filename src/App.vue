<template>
    <div id="app">
        <div id="mountNode"></div>
        <button id="btn" @click="add">add</button>
    </div>
</template>

<script>

    import {Graph} from "@/components/core/editorcore";

    const g = new Graph();

    const data = {
        nodes: [{
            x: 100,
            y: 100,
            shape: 'circle',
            label: 'circle',
        }, {
            x: 200,
            y: 100,
            shape: 'rect',
            label: 'rect',
        }, {
            x: 300,
            y: 100,
            size: [60, 30],
            shape: 'ellipse',
            label: 'ellipse',
        }, {
            x: 400,
            y: 100,
            shape: 'image',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
            label: 'image',
        }]
    };

    export default {
        name: 'app',
        data () {
            return {
                nodes: data.nodes,
            }
        },
        watch: {
            nodes () {
                g.draw(data);
            }
        },
        mounted () {
            console.log(g);
            const t = g.init(document.getElementById('mountNode'));
            t.draw(data);
        },
        methods: {
            add () {
                // let i = 1;
                this.nodes.push({
                    x: 50,
                    y: 100,
                    shape: 'circle',
                    label: 'circle',
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

<template>
    <div id="app">
        <div id="mountNode"></div>
    </div>
</template>

<script>
    import graph from "@/components/core/editorcore";

    const data = {
        nodes: [{
            id: 'node1',
            x: 100,
            y: 200
        }, {
            id: 'node2',
            x: 300,
            y: 200
        }],
        edges: [{
            source: 'node1',
            target: 'node2'
        }]
    };
    export default {
        name: 'app',
        data () {
            return {}
        },
        mounted () {
            graph.init(document.getElementById('mountNode'));
            graph.draw(data);
        },
        components: {}
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

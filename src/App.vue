<template>
    <div id="app">
        <PandelLeft></PandelLeft>
        <Sketchpad></Sketchpad>
    </div>
</template>

<script>
    import PandelLeft from './components/container/PanelLeft'
    import Sketchpad from './components/container/Sketchpad'

    export default {
        name: 'app',
        components : {
            PandelLeft,
            Sketchpad
        }
    }
</script>

<style>
    canvas {
        border: 1px solid red;
    }
    #app {
        position: relative;
    }
</style>

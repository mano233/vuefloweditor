<template>
    <div id="app">
        <!--工具栏-->
        <div class="toolbar_container">
            <ToolBar></ToolBar>
        </div>
        <!--文本-->
        <div class="context">
            <ItemPanel></ItemPanel>
            <Canvas></Canvas>
            <Details></Details>
        </div>

    </div>
</template>

<script>
    import ItemPanel from './components/container/ItemPanel';
    import Canvas from './components/container/Canvas';
    import ToolBar from './components/container/ToolBar';
    import Details from './components/container/Details.vue';


    export default {
        name: 'app',
        components : {
            ItemPanel,
            Canvas,
            Details,
            ToolBar
        },
        beforeDestroy () {

        }
    }
</script>

<style>
    .context {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
    }

    .toolbar_container {
        display: flex;
        height: 60px;
        background-color: #ffffff;
        border-bottom: 1px solid #d0d0d0;
    }
    #app {
        position: relative;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>

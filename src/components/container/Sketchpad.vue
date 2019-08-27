<template>
    <div class="Sketchpad">
        <TooBar />
        <div id="mountNode"></div>
    </div>
</template>

<script>
    import TooBar from './ToolBar'
    export default {
        name: "Sketchpad",
        components : {
            TooBar,
        }
    }
</script>



<style scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .Sketchpad{
        position: absolute;
        left: 20%;
        width:60%;
        height:100vh;
        border: 1px solid black;
    }

    canvas{
        border: 1px solid red;
    }
</style>
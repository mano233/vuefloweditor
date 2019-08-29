<template>
    <div class="sketchpad">
        <div id="mountNode"></div>
    </div>
</template>

<script>
    export default {
        name: "Canvas",
        components : {},
        mounted () {
            this.$store.commit('init');
        },
        beforeDestroy () {
            this.$store.commit('destroy',this.$g);
        }
    }
</script>


<style>
    canvas {
        border: 1px solid red;
    }

    .sketchpad {
        display: flex;
        flex: 1;
        background-color: #ffffff;
    }
</style>

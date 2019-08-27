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
            const canvas = document.getElementById('mountNode');

            canvas.ondrop = function (e) {
                e.preventDefault();
                console.log('放入了一个圆');
            }
            canvas.ondragover = function (e) {
                // 必须阻止ondragover的原生事件，ondrop事件才可触发
                e.preventDefault();
            }
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

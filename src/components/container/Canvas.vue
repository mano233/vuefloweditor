<template>
    <div class="sketchpad">
        <div id="mountNode"></div>
    </div>
</template>

<script>
    import list from '../core/behaviors/index'
    import G6 from '@antv/g6';
    import ToolBar from './ToolBar'

    export default {
        name: "Canvas",
        data(){
            return {
                offset : [],
                Graph : '',
            }
        },
        components : {},
        mounted () {
            const canvas = document.getElementById('mountNode');
            var self = this;
            canvas.ondrop = function (e) {
                self.offset = [];

                e.preventDefault();

                console.log('放入了一个圆');

                list = list.list;

                list.push(ToolBar);


                this.Graph = list[1].methods.init();

                this.Graph.node = this.Graph.addItem('node', {
                    x: e.clientX - 220,
                    y: e.clientY - 60,
                    id: G6.Util.uniqueId(),
                    shape : 'circle',
                    color : 'black',
                    style : {
                        fill:  list[0]
                    }
                });

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

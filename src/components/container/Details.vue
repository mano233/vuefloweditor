<template>

    <div class="panel_right">
        <div class="edit">
            <div class="edit-head">
                <span>Node</span>
            </div>
            <div class="edit-body" >
                <a-form>
                    <!--编辑-->
                    <a-form-item label="label">
                        <a-input id="label" v-model="labelData" @change="changeData" />
                    </a-form-item>

                    <!--宽度-->
                    <a-form-item label="width">
                        <a-input id="width" v-model="widthData"  />
                    </a-form-item>

                    <!--高度-->
                    <a-form-item label="height">
                        <a-input id="height" v-model="heightData"  />
                    </a-form-item>


                    <!--半径-->
                    <a-form-item label="radius">
                        <a-input type="number"  id="radius" v-model="radiusData"  />
                    </a-form-item>

                    <!--添加下一个节点-->
                    <a-button @click="addNode">添加节点</a-button>

                    <!--复制节点-->
                    <a-button @click="copyNode">复制节点</a-button>

                    <!--删除节点-->
                    <a-button @click="deleteNode">删除节点</a-button>

                </a-form>
            </div>
        </div>
        <!--小地图功能-->
        <div class="map">

        </div>
    </div>
</template>

<script>
    import list from '../core/behaviors/index';
    import ToolBar from './ToolBar'
    import G6 from '@antv/g6';
    import {Graph} from "../core/editorcore";

    export default {
        data () {
            return {
                labelData : '',
                widthData : '',
                heightData : '',
                radiusData : '',
                Graph : '',
                width : '',
                height : '',
                showView : false
            };
        },
        computed : {
        },
        methods: {
            changeData(e){
                let labelArr = list.labelArr;
                labelArr.push(e.target.value);

                if(labelArr.length > 1) {
                    labelArr.shift();
                }
                // console.log(labelArr);
            },
            //添加节点
            addNode: function () {

                console.log(list.addArr);
                
                this.Graph = this.$g;

                console.log(this.Graph);

                // this.Graph.addItem('node', {
                //     x: Math.ceil(Math.random() * 1000),
                //     y: Math.ceil(Math.random() * 500),
                //     id: G6.Util.uniqueId(),
                //     label: '开始',
                //     shape: 'textCircle',
                //     style: {
                //         fill: list[0],
                //     }
                // });
                
                console.log(list.addArr[0].node._cfg.id)
                // console.log(this.Graph.node._cfg.id)

                // this.Graph.addItem('edge', {
                //     source:list.addArr[0].graph.node._cfg.id,
                //     target:this.Graph.node._cfg.id,
                //     shape : 'line',
                //     id : G6.Util.uniqueId(),
                // });

                // console.log(this.Graph);

                // const edge = {
                //     shape: 'line',
                //     source: list.addArr[0].graph.node._cfg.id,
                //     target:  this.Graph.node._cfg.id
                //     // source: this.Graph.node._cfg.id,
                //     // target: list.addArr[0]
                // }

                // const data = {
                //     nodes: [{
                //         id: list.addArr[0].graph.node._cfg.id,
                //         x: 100,
                //         y: 200
                //     },{
                //         id: this.Graph.node._cfg.id,
                //         x: 300,
                //         y: 200
                //     }],
                //     edges: [{
                //         source: list.addArr[0].graph.node._cfg.id,
                //         target: this.Graph.node._cfg.id
                //     }]
                // };

                // const data = {
                //     nodes: [{id:"g1",x:341,y:117,shape:"textCircle",label:"开始",style:{fill:"#000"}},
                //         {id:"g2",x:708,y:231,shape:"textCircle",label:"开始",style:{fill:"#000"}}
                //         ],
                //     edges: [{source:"g1",
                //             target:"g2",
                //             shape:"line"
                //     }
                //             ]
                // };


                //添加节点addItem,model{x y}
                //添加线条addEdge，model(souce起始点（id），taget结束的点(id))
                
                // this.Graph.data(data);
                // this.Graph.render();


            },
            //复制节点
            copyNode(){
                this.Graph = ToolBar.methods.init();

                this.Graph.node = this.Graph.addItem('node', {
                    x: Math.ceil(Math.random()*1000),
                    y: Math.ceil(Math.random()*500),
                    id: G6.Util.uniqueId(),
                    label : '开始',
                    shape : 'textCircle',
                    style : {
                        fill:  list[0],
                    }
                });
            },
            //删除节点
            deleteNode(){

                if(list.deleteArr.length > 1){
                    list.deleteArr.shift();
                }

                this.Graph = ToolBar.methods.init();


                this.Graph.removeItem(list.deleteArr[0].item)

                console.log(list.deleteArr);

            }
        },
    };
</script>

<style scoped>
    .panel_right {
        display: flex;
        flex-direction: column;
        width: 220px;
        background: #fafafa;
        border-left: 1px solid #d0d0d0;
    }
    .edit-head{
        padding: 5px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }
    .edit-body{
        margin-top: 20px;
        text-align: center;
        /*display: none;*/
    }

</style>

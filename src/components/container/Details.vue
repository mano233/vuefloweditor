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
                        <a-input id="label" v-model="newData" @change="changeData" />
                    </a-form-item>

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
                newData : '',
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
        display: none;
    }

</style>

<template>

    <div class="toolbar">
        <div style="flex:1"></div>
        <div class="items">
            <a-icon type="undo" />
            <div style="font-size:12px">撤销</div>
        </div>
        <div class="items">
            <a-icon type="redo" class="items"/>
            <div style="font-size:12px">回退</div>
        </div>
        <a-divider type="vertical" />
        <div class="items">
            <a-icon type="copy" class="items"/>
            <div style="font-size:12px">拷贝</div>
        </div>
        <div class="items">
            <a-icon type="scissor" class="items"/>
            <div style="font-size:12px">拷贝</div>
        </div>
       <div class="items">
           <a-icon type="delete" class="items"/>
           <div style="font-size:12px" @click="deleteItem">删除</div>
       </div>

        <a-divider type="vertical" />
        <div class="items">
            <a-icon type="zoom-in" class="items"/>
            <div style="font-size:12px">放大</div>
        </div>
        <div class="items">
            <a-icon type="zoom-out" class="items"/>
            <div style="font-size:12px">缩小</div>
        </div>
        <a-divider type="vertical" />
        <div class="items">
            <a-icon type="fullscreen-exit" class="items"/>
            <div style="font-size:12px">居中显示</div>

        </div>
        <div class="items">
            <a-icon type="fullscreen" class="items"/>
            <div style="font-size:12px">缩放显示</div>

        </div>
        <a-divider type="vertical" />
        <a-dropdown :trigger="['click']">
            <div class="items">
                <a-icon type="small-dash" />
                <div style="font-size:12px">线条样式</div>
            </div>
            <a-menu slot="overlay">
                <a-menu-item key="0">
                    曲线
                </a-menu-item>
                <a-menu-item key="1">
                    直线
                </a-menu-item>
            </a-menu>
        </a-dropdown>
        <div class="items">
            <a-icon type="sync" />
            <div style="font-size:12px">清空画板</div>
        </div>
        <a-divider type="vertical" />
        <div class="items">
            <a-icon type="cloud-download" class="items"/>
            <div style="font-size:12px">下载</div>
        </div>
        <div style="flex:1"></div>
        <a-button-group>
            <a-button  @click="addElementCircle">添加圆形元素</a-button>
            <a-button  @click="addElementRect">添加方形元素</a-button>
            <a-button  @click="addElementDiamond">添加菱形元素</a-button>
            <a-button  @click="addLine">添加直线线条</a-button>
            <a-button  @click="addCurve">添加曲线线条</a-button>
            <a-button  @click="changeLine">改变线条</a-button>
            <a-button  @click="deleteItem">删除元素</a-button>
            <a-button  @click="clearCanvas">清空画布</a-button>
            <a-button  @click="save">保存</a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {clickAddNode,clickAddEdge} from '../../core/register/behaviors/handlers'
    import {Graph} from "../../core/editorcore";

    export default {
        name: "ToolBar",
        methods: {
            //切换模式(添加圆形元素)
            addElementCircle(){
                this.$g.setMode('addElement');
                clickAddNode('c-node');
                // clickAddNode('RewriteCircle');
            },
            //切换模式(添加方形元素)
            addElementRect(){
                this.$g.setMode('addElement');
                // clickAddNode('RewriteRect');
                clickAddNode('task-node');
            },
            addElementDiamond(){
                this.$g.setMode('addElement');
                clickAddNode('RewriteDiamond');
            },
            //切换模式(添加直线)
            addLine(){
                this.$g.setMode('addEdge');
                clickAddEdge('line');
            },
            //切换模式(添加曲线)
            addCurve(){
                this.$g.setMode('addEdge');
                clickAddEdge('cubic');
            },
            //删除节点
            deleteItem(){
                this.$g.setMode('deleteItem');
            },
            //改变线条
            changeLine(){

            },
            //清空画板
            clearCanvas(){
                //创建构造函数，使用私有的方法清空
                let graph = new Graph();
                graph._clearCanvas(this.$g);
            },
            //保存canvas上信息
            save(){
                this.$store.commit('computedresult',this.$g._cfg);

                console.log(this.$store.getters.result);
            }

        }
    }
</script>

<style scoped>
    .toolbar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

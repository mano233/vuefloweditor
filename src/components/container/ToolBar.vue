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
           <div style="font-size:12px">删除</div>
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
        <!--<a-button-group size="small">-->
        <!--    <a-button @click="addElementCircle">添加圆形元素</a-button>-->
        <!--    <a-button @click="addElementRect">添加方形元素</a-button>-->
        <!--    <a-button @click="addLine">添加直线线条</a-button>-->
        <!--    <a-button @click="addCurve">添加曲线线条</a-button>-->
        <!--    <a-button @click="deleteItem">删除元素</a-button>-->
        <!--</a-button-group>-->
    </div>
</template>

<script>
    export default {
        name: "ToolBar",
        data () {
            return {
                count: 1,
            }
        },
        methods: {
            //切换模式(添加圆形元素)
            addElementCircle () {
                this.$g.setMode('addElement');
                this.$g.clickAddNode('task-node');
            },
            //切换模式(添加方形元素)
            addElementRect () {
                this.$g.setMode('addElement');
                this.$g.clickAddNode('rect');
            },
            //切换模式(添加直线)
            addLine () {
                this.$g.setMode('addLine');
            },
            //切换模式(添加曲线)
            addCurve () {
                this.$g.setMode('addCurve');
            },
            //删除节点
            deleteItem () {
                this.$g.setMode('deleteItem');
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
        align-items: center;
    }
    .items {
        margin:0 4px;
        display: flex;
        color: #b3b3b3;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
    }
    .items:hover{
        color: #333;
    }
</style>

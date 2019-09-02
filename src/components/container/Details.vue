<template>
    <div class="panel_right">
        <div class="edit">
            <div class="edit-head">
                <span>Node</span>
            </div>
            <div class="edit-body" v-if="showView">
                <a-form>
                    <!--编辑-->
                    <a-form-item label="label">
                        <!--<span>label</span>-->
                        <a-input id="label" v-model="labelData" @change="changeLabel" />
                    </a-form-item>

                    <!--宽度-->
                    <a-form-item label="width" v-if="showVH">
                        <a-input id="width" v-model="widthData"   />
                    </a-form-item>

                    <!--高度-->
                    <a-form-item label="height" v-if="showVH">
                        <a-input id="height" v-model="heightData"  />
                    </a-form-item>

                    <!--半径-->
                    <a-form-item label="radius" v-if="showRadius">
                        <a-input type="number" id="radius" v-model="radiusData" />
                    </a-form-item>

                    <a-form-item label="color">
                        <colorPicker style="z-index: 999;" v-model="color" />
                    </a-form-item>


                    <!--添加下一个节点-->
                    <a-button @click="addNode">下一节点</a-button>

                    <!--复制节点-->
                    <a-button @click="copyNode">复制节点</a-button>

                    <!--删除节点-->
                    <a-button @click="deleteNode">删除节点</a-button>

                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        data(){
            return {
                labelData : '', //文本内容
                color : '', //背景颜色
                radiusData : 0, //圆形半径
                widthData : 0, //矩形宽度
                heightData : 0, //矩形高度
            }
        },
        updated(){
            //文本内容
            this.labelData = this.$store.getters.itemNode._cfg.model.label;
            //背景颜色
            this.color = this.$store.getters.itemNode._cfg.model.color;
            // 圆形半径
            this.radiusData = this.$store.getters.itemNode._cfg.model.r;
            //矩形宽度
            this.widthData = this.$store.getters.itemNode._cfg.model.size[0];
            //矩形高度
            this.heightData = this.$store.getters.itemNode._cfg.model.size[1];
        },
        computed : {
            //是否展示编辑框
            showView(){
                return this.$store.getters.showEditor;
            },
            //是否展示宽高
            showVH(){
                return this.$store.getters.showVH;
            },
            //是否展示半径
            showRadius(){
                return this.$store.getters.showRadius;
            }
        },
        methods : {
            //改变内容
            changeLabel(){
                this.$g.updateItem(this.$store.getters.itemNode,{label:this.labelData});
            }
        }

    }
</script>

<style scoped>
    .panel_right {
        display: flex;
        flex-direction: column;
        width: 300px;
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
        /*text-align: center;*/
        /*display: none;*/
    }
    .m-colorPicker .box{
        left: -90px;
    }
    .ant-btn{
        margin: 5px 5px;
    }


</style>

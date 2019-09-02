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
                    <a-form-item label="width">
                        <a-input id="width" v-model="widthData"   />
                    </a-form-item>

                    <!--高度-->
                    <a-form-item label="height">
                        <a-input id="height" v-model="heightData"  />
                    </a-form-item>

                    <!--半径-->
                    <a-form-item label="radius">
                        <a-input type="number" id="radius" v-model="radiusData" />
                    </a-form-item>

                    <a-form-item label="color">
                        <colorPicker style="z-index: 999;" v-model="color" />
                    </a-form-item>


                    <!--&lt;!&ndash;添加下一个节点&ndash;&gt;-->
                    <!--<a-button @click="addNode">下一节点</a-button>-->

                    <!--&lt;!&ndash;复制节点&ndash;&gt;-->
                    <!--<a-button @click="copyNode">复制节点</a-button>-->

                    <!--&lt;!&ndash;删除节点&ndash;&gt;-->
                    <!--<a-button @click="deleteNode">删除节点</a-button>-->

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
                radiusData : 0,
                labelData : '',
            }
        },
        mounted(){
            //圆形半径
            this.radiusData =  this.$store.getters.circleRadius;
            //文本内容
            this.labelData =  this.$store.getters.defaultText;
        },
        computed : {
            // //文本内容
            // labelData(){
            //     return this.$store.getters.defaultText;
            // },
            //矩形宽度
            widthData(){
                return this.$store.getters.polygonWidth;
            },
            //矩形高度
            heightData(){
                return this.$store.getters.polygonHeight;
            },
            //背景颜色
            color(){
                return this.$store.getters.defaultBckColor;
            },
            //是否展示编辑框
            showView(){
                return this.$store.getters.showEditor;
            }
        },
        methods : {
            //改变内容
            changeLabel(){
                this.$store.commit('SET_DEFAULTTEXT',);
                this.$g.updateItem(this.$store.getters.defaultText,{label:this.labelData});
                this.$g.refresh();
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

<template>
    <div class="panel_right">
        <div class="edit">
            <div class="edit-head">
                <span>Node</span>
            </div>
            <div class="edit-body" v-if="showView">
                <a-form layout="horizontal">
                    <!--编辑-->
                    <a-form-item label="说明文本" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <!--<span>label</span>-->
                        <a-input id="label" v-model="label" @change="changeLabel"/>
                    </a-form-item>

                    <!--宽度-->
                    <a-form-item label="宽度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input id="width" v-model="widthData"/>
                    </a-form-item>

                    <!--高度-->
                    <a-form-item label="高度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input id="height" v-model="heightData"/>
                    </a-form-item>

                    <!--半径-->
                    <a-form-item label="半径" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input type="number" id="radius" v-model="radiusData"/>
                    </a-form-item>

                    <a-form-item label="填充颜色" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <colorPicker style="z-index: 9;" v-model="fillColor" />
                    </a-form-item>

                    <a-form-item label="边框颜色" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <colorPicker style="z-index: 9;" v-model="borderColor" />
                    </a-form-item>
                    <!--&lt;!&ndash;添加下一个节点&ndash;&gt;-->
                    <a-button @click="addNode">下一节点</a-button>

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
        data () {
            return {
                label: '', //文本内容
                fillColor: '', //背景颜色
                borderColor: '',
                radiusData: 0, //圆形半径
                widthData: 0, //矩形宽度
                heightData: 0, //矩形高度
            }
        },
        watch: {
            selectedItem (val) {
                // 复制一份，防止污染源数据
                const item  = Object.assign({},val._cfg);
                this.label = item.model.label;
                this.fillColor = item.keyShape._attrs.fill;
                this.radiusData = item.keyShape._attrs.r;
                this.widthData = item.keyShape._attrs.width;
                this.heightData = item.keyShape._attrs.height;
            },
        },
        computed: {
            selectedItem () {
                return this.$store.state.selectedItem;
            },
            //是否展示编辑框
            showView () {
                return this.$store.getters.showEditor;
            },
        },
        methods: {
            addNode () {
                this.$g.addItem('edge', {
                    source: 'g1',
                    target: 'g2',
                    shape: 'flow-polyline-round'
                })
            },
            //改变内容
            changeLabel () {
                // 正在考虑如何修改样式填充颜色，边框颜色等
                this.$g.updateItem(this.$store.state.selectedItem, {label: this.label,styles:{fill:'#333333'}});
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

    .edit-head {
        padding: 5px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }

    .edit-body {
        margin-top: 20px;
        /*text-align: center;*/
        /*display: none;*/
    }

    .m-colorPicker .box {
        left: -90px;
    }

    .ant-btn {
        margin: 5px 5px;
    }


</style>

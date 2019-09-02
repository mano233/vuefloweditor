<!--左侧画板-->

<template>
    <div class="panel_left">
        <a-collapse defaultActiveKey="1" :bordered="false">
            <a-collapse-panel header="基础图形" key="1">
                <div class="item_box">
                    <div class="item">1</div>
                    <div class="item">2</div>
                    <div class="item">3</div>
                    <div class="item">4</div>
                    <div class="item">5</div>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
    export default {
        name: "ItemPanel",
        data () {
            return {
                text: 'sssss',
            }
        },
        mounted () {
            this.$refs.circle.ondragstart = this.dragstartHandler;
        },
        methods: {
            dragstartHandler () {
                console.log("开始拖动");
            }
        },
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .panel_left {
        width: 220px;
        background: #fafafa;
        border-right: 1px solid #d0d0d0;
    }

    .item_box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .item {
        width: 40px;
        height: 40px;
        margin:4px;
        display: flex;
        flex-direction: column;
    }


    .item:hover{
        border: 1px solid #b0b0b0;

    }
</style>

<!--左侧画板-->

<template>
    <div class="panel_left">
        <a-collapse defaultActiveKey="1" :bordered="false">
            <a-collapse-panel header="基础图形" key="1">
                <div class="item_box">
                    <div class="item" v-for="item in items" :key="item.id" :class="itemClass(item)" @click="itemClick(item)">{{item.name}}</div>
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
                items:[
                    {id:1,name:'圆形'},
                    {id:2,name:'矩形'},
                    {id:3,name:'菱形'},
                ]
            }
        },
        computed:{
            selected(){
                return this.$store.state.panelSelected;
            }
        },
        methods:{
            itemClick(item){
               if(this.selected && item.id === this.selected.id) {
                   this.$store.commit('setPanelSelected',null);
               }else{
                   this.$store.commit('setPanelSelected',item);
               }
            },
            itemClass(item){
                return this.selected &&this.selected.id===item.id?'active':'';
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

    .active{
        background-color: coral;
        color:white;
    }

</style>

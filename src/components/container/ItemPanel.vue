<!--左侧画板-->

<template>
    <div class="panel_left">
       <ul>
           <li>
               <div id="circle" ref="circle" draggable="true">circle</div>
           </li>
           <li><div id="rect">rect</div></li>
       </ul>
   </div>
</template>

<script>
    export default {
        name: "ItemPanel",
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
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
ul{
    margin: 0;
    padding: 0;
}

.panel_left {
    width: 220px;
    background: #fafafa;
    border-right: 1px solid #d0d0d0;
}
ul{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#circle,#rect{
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin: 10px 0px;
    cursor: pointer;
    user-select:none;
}

#circle{
    border-radius:50%;
    background-color: orange;
    opacity: 0.5;
    color: #fff;
}
#rect{
    width: 90px;
    height: 90px;
    background-color: lightskyblue;
    color: #fff;
    line-height: 90px;
    border-color: deepskyblue;
}


</style>

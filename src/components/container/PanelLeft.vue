<!--左侧画板-->

<template>
   <div class="PanelLeft">
       <ul>
           <li><div id="circle">circle</div></li>
           <li><div id="rect">rect</div></li>
       </ul>
   </div>
</template>

<script>
    export default {
        name: "PanelLeft"
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
.PanelLeft{
    position: absolute;
    width:20%;
    height:100vh;
    /*border: 1px solid green;*/
    background: #fafafa;
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
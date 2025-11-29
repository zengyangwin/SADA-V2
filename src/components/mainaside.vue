<script lang="ts" setup>
  // 版本号
  const version='v2.1.0'

  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
// 以下为路由新增内容
  const emit = defineEmits(['menu-selected'])   
  const handleMenuSelect = (index:string,keyPath:string[]) => {
    emit('menu-selected', index)
  }
</script>


<template >
  <div id="mainaside-container">
  <el-row >
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        @select="handleMenuSelect"
      >
        <el-menu-item index="/main/gailan">
          <el-icon><icon-menu /></el-icon>
          <span >运行概览</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><HomeFilled /></el-icon>
            <span >厂站运行详览</span>
          </template>
            <el-menu-item index="/main/gsxianglan" >城市（农村）供水厂</el-menu-item>
            <el-menu-item index="/main/csjingshuichang">城市净水厂</el-menu-item>
            <el-menu-item index="/main/xzpaishui">乡镇排水</el-menu-item>
        </el-sub-menu>     
 
        
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span> 厂外压力信息</span>
          </template>
          <el-menu-item index="/main/csyali">城市区域</el-menu-item>
          <el-menu-item index="3-2" disabled >农村区域</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4" disabled>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>监控画面</span>
          </template>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon><document /></el-icon>
            <span>辅助功能</span>
          </template>
          <el-menu-item index="5-1">天气预警</el-menu-item>           <!-- 出入MSN的天气预警图   -->
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
  <div id="version">
    <p>©版本号{{version}}</p>
  </div>
  </div>
</template>


<style scoped>
  span{
    font-family:"微软雅黑", "Microsoft YaHei", sans-serif;
    font-weight: bold;
    font-size:1vw;
    letter-spacing: 10%;
  }
.el-menu-item{
  font-family:'微软雅黑', 'Microsoft YaHei', 'sans-serif';
  font-size:0.9vw;
  font-weight: bold;
  letter-spacing: 10%;
}
#mainaside-container{
    height: 100%; 
    position: relative; 
}  
#version{
  position:absolute;
  bottom:0;
  font-size: 1vw;
  font-family:'times new roman', 微软雅黑;
  font-weight: bold;
  left: 50%;                /* 将左边定位到50% */
  transform: translateX(-50%); /* 向左移动自身宽度的一半 */
  width: 100%;              /* 确保容器宽度足够 */
  text-align: center;       /* 文字居中 */
  }
</style>
<script setup>
  import { ref,markRaw} from 'vue';
  import mainaside from './components/mainaside.vue';
  import gailan from './components/gailan-AMap.vue';
  import gsxianglan from './components/xianglan/gs-xianglan.vue';
  import xzpaishui from './components/xianglan/xzpaishui.vue';
  import csjingshuichang from './components/xianglan/csjingshuichang.vue';
  import csyali from './components/yali/csyali.vue';

  //以下为路由
  const routes = {
    '/main/gailan': markRaw(gailan),
    '/main/xzpaishui': markRaw(xzpaishui),
    '/main/gsxianglan': markRaw(gsxianglan),
    '/main/csyali': markRaw(csyali),
    '/main/csjingshuichang': markRaw(csjingshuichang),

  }
  import { shallowRef } from "vue";
  const currentComponent = shallowRef(routes['/main/gailan']); // 默认显示gailan组件
  const handleMenuSelected = (path) => {
    currentComponent.value = routes[path] || shallowRef(routes['/main/gailan'])// 如果路由不存在则默认显示gailan
  }
</script>


<template>
  <div class="common-layout">
    <el-container >
      <el-header >雅安国润供水/弘润排水有限公司生产管理平台</el-header>
      <el-container>
        <el-aside >
          <mainaside @menu-selected="handleMenuSelected" />
        </el-aside>
        <el-container>
          <el-main > <component v-bind:is="currentComponent" /></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
  .el-header {
    position: relative;
    background-color:#295681;
    color: white;
    width: 100vw;
    height:13vh;
    display: flex;
    font-family: "华文新魏";
    font-weight: bold;
    font-size: 4vw;  /* 视窗宽度，分成了50分 */
    white-space: nowrap; /* 强制不换行 */
    letter-spacing: 10%;
    align-items: center;
    justify-content: center;
  }

  .el-aside{
    width:13vw;
    height:87vh;
    background-color:#545c64;
  }
  .el-main{
    width:87vw;
    height:87vh;
  }
  .el-container,
  .el-main{
    padding: 0;
    margin: 0
  }
</style>

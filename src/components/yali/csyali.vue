<script setup>
import { onMounted, onUnmounted, ref, createApp,markRaw  } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import ldq from "./csyali/ldq.vue";
import lyl from "./csyali/lyl.vue";
import myz from "./csyali/myz.vue";
import wyj from "./csyali/wyj.vue";
import yqdd from "./csyali/yqdd.vue";
import yss from "./csyali/yss.vue"; 
import tgl from "./csyali/tgl.vue";

const map = ref(null);
const updateTimer = ref(null);
const ldqmarker=ref(null);
const lylmarker = ref(null);
const myzmarker = ref(null);
const wyjmarker = ref(null);
const yqddmarker = ref(null);
const yssmarker = ref(null);
const tglmarker = ref(null);

const LoadingState = {
  template: `<div style="padding: 8px; background: white; border-radius: 4px; border: 1px solid #ccc;">加载中...</div>`
};
 
// 渲染工具函数（带样式隔离）
const renderComponent = (component, props) => {
  const div = document.createElement('div');
  const shadowRoot = div.attachShadow({ mode: 'open' }); // 使用Shadow DOM隔离样式
  const style = document.createElement('style');
  shadowRoot.appendChild(style);
  const app = createApp(markRaw(component), props);
  app.mount(shadowRoot);
  return shadowRoot.innerHTML;
};


onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "dbd43806a8bb744c75f17aa4bff5bb14",
  };

  AMapLoader.load({
    key: "e3e3d54de29653c79e747691197ba933",
    version: "2.0",
  })
    .then((AMap) => {
      map.value = new AMap.Map("csyl_container", {
        zoom: 14,
        center:[103.114203, 30.069500],
        resizeEnable: true,
      });

// 龙殿桥
      ldqmarker.value = new AMap.Marker({
        position: [103.089112,30.059168],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(ldqmarker.value);
// 麓源路
      lylmarker.value = new AMap.Marker({ 
        position: [103.11838,30.055071],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(lylmarker.value);  
      
// 名一中
      myzmarker.value = new AMap.Marker({
        position: [103.110864,30.08798],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' }),
          direction: 'left'
        },
      });
      map.value.add(myzmarker.value);  
// 望月街
      wyjmarker.value = new AMap.Marker({
        position: [103.110966,30.092991],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' }),
          direction: 'left'
        },
      });
      map.value.add(wyjmarker.value);  
// 同贯路
      tglmarker.value = new AMap.Marker({
        position: [103.120257,30.086775],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(tglmarker.value);  
// 园区大道
      yqddmarker.value = new AMap.Marker({
        position: [103.104724,30.063008],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image:"./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' }),          
        },
      });
      map.value.add(yqddmarker.value);  
// 源山墅
      yssmarker.value = new AMap.Marker({
        position: [103.079751,30.05465],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image:"./WF1.png",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(yssmarker.value);  

      //更新数据
      function updateDatacsyali(){
        fetch("http://182.132.164.178:3000/csyl")
        .then(response=>response.json())
        .then(data =>{
          ldqmarker.value.setLabel({
            content: renderComponent(ldq, { data }),          
          });
          lylmarker.value.setLabel({
            content: renderComponent(lyl, { data }),          
          });
          myzmarker.value.setLabel({
            content: renderComponent(myz, { data }),          
          });
          wyjmarker.value.setLabel({
            content: renderComponent(wyj, { data }),          
          });
          tglmarker.value.setLabel({
            content: renderComponent(tgl, { data }),          
          });
          yqddmarker.value.setLabel({
            content: renderComponent(yqdd, { data }),          
          });
          yssmarker.value.setLabel({
            content: renderComponent(yss, { data }),          
          });
        });
      }
      updateDatacsyali();
      updateTimer.value = setInterval(updateDatacsyali, 30000);
    });
});

  onUnmounted(() => {
    clearInterval(updateTimer.value);
    if (map.value) {
      ldqmarker.value && map.value.remove(ldqmarker.value);
      lylmarker.value && map.value.remove(lylmarker.value);
      myzmarker.value && map.value.remove(myzmarker.value);
      wyjmarker.value && map.value.remove(wyjmarker.value);
      yqddmarker.value && map.value.remove(yqddmarker.value);
      yssmarker.value && map.value.remove(yssmarker.value);
      tglmarker.value && map.value.remove(tglmarker.value);
      map.value.destroy();
    }
  });
</script>

<template>
  <div id="csyl_container"></div>
</template>

<style scoped>
#csyl_container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
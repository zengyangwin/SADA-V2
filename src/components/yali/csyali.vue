<script setup>
import { onMounted, onUnmounted, ref, createApp,markRaw  } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";


const map = ref(null);
const updateTimer = ref(null);
const cscMarker = ref(null);
const clMarker = ref(null);
const mhMarker = ref(null);
const hyMarker = ref(null);
const zcMarker = ref(null);
const jzpMarker = ref(null);
const yqMarker = ref(null);
const hjgMarker = ref(null);

 
// 渲染工具函数（带样式隔离）
const renderComponent = (component, props) => {
const div = document.createElement('div');
const shadowRoot = div.attachShadow({ mode: 'open' }); // 使用Shadow DOM隔离样式
  
  // 创建样式元素
  const style = document.createElement('style');
  // style.textContent = ` `;
  
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
      map.value = new AMap.Map("container", {
        zoom: 14,
        center:[103.114203, 30.069500],
        resizeEnable: true,
      });

      
      // 添加行政区划图层
      // const distProvince = new AMap.DistrictLayer.Province({
      //   zIndex: 10,
      //   zooms: [8, 20],
      //   adcode: "511803", 
      //   depth: 2,
      // });

      // distProvince.setStyles({
      //   fill: function (data) {
      //     return "rgba(0, 255, 0, 0.05)";
      //   },
      //   stroke: "rgb(255, 255, 255)",
      //   "stroke-width": 1,
      // });
      // map.value.add(distProvince);
      
      // 城市厂
      cscMarker.value = new AMap.Marker({
        position: [103.109146, 30.041211],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WWTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(cscMarker.value);

      function updateDatacsc(){
        fetch("http://115.190.14.165:3000/csc")
        .then(response=>response.json())
        .then(data =>{
          cscMarker.value.setLabel({
            content: renderComponent(csc, { data }),          
          });
        });
      }
      updateDatacsc();
      updateTimer.value = setInterval(updateDatacsc, 30000);

      //车岭厂
      clMarker.value = new AMap.Marker({
        position: [103.24178, 30.077951],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WWTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(clMarker.value);  

      function updateDatacl(){
        fetch("http://115.190.14.165:3000/xzps")
        .then(response=>response.json())
        .then(data =>{
          clMarker.value.setLabel({
            content: renderComponent(cl, { data }),          
          });
        });
      }
      updateDatacl();
      updateTimer.value = setInterval(updateDatacl, 30000);
      
      //茅河污水厂
      mhMarker.value = new AMap.Marker({
        position: [103.358339, 30.22728],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WWTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(mhMarker.value);  

      function updateDatamh(){
        fetch("http://115.190.14.165:3000/xzps")
        .then(response=>response.json())
        .then(data =>{
          mhMarker.value.setLabel({
            content: renderComponent(mh, { data }),          
          });
        });
      }
      updateDatamh();
      updateTimer.value = setInterval(updateDatamh, 30000);
      
      //红岩
      hyMarker.value = new AMap.Marker({
        position: [103.181374, 29.983694],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WWTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(hyMarker.value);  

      function updateDatahy(){
        fetch("http://115.190.14.165:3000/xzps")
        .then(response=>response.json())
        .then(data =>{
          hyMarker.value.setLabel({
            content: renderComponent(hy, { data }),          
          });
        });
      }
      updateDatahy();
      updateTimer.value = setInterval(updateDatahy, 30000);


      //总厂
      zcMarker.value = new AMap.Marker({
        position: [103.164656, 30.123269],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(zcMarker.value);  

      function updateDatazc(){
        fetch("http://115.190.14.165:3000/zongchang")
        .then(response=>response.json())
        .then(data =>{
          zcMarker.value.setLabel({
            content: renderComponent(zc, { data }),          
          });
        });
      }
      updateDatazc();
      updateTimer.value = setInterval(updateDatazc, 30000);
      //箭竹坪
      jzpMarker.value = new AMap.Marker({
        position: [103.108395, 30.092783],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(jzpMarker.value);  
      

      function updateDatajzp(){
        fetch("http://115.190.14.165:3000/fengongsi")
        .then(response=>response.json())
        .then(data =>{
          jzpMarker.value.setLabel({
            content: renderComponent(jzp, { data }),          
          });
        });
      }
      updateDatajzp();
      updateTimer.value = setInterval(updateDatajzp, 30000);
      //园区
      yqMarker.value = new AMap.Marker({
        position: [103.102034, 30.050664],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WTP.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' }),
        },
      });
      map.value.add(yqMarker.value);  3

      function updateDatayq(){
        fetch("http://115.190.14.165:3000/fengongsi")
        .then(response=>response.json())
        .then(data =>{
          yqMarker.value.setLabel({
            content: renderComponent(yq, { data }),  
            direction: 'left',
          });
        });
      }
      updateDatayq();
      updateTimer.value = setInterval(updateDatayq, 30000);
      //黄家岗
      hjgMarker.value = new AMap.Marker({
        position: [103.1410684,30.1359471],
        zooms: [10, 20],
        anchor: "bottom-center",
        icon: new AMap.Icon({
          image: "WQMS.svg",
        }),        
        label: {
          content: renderComponent(LoadingState, { text: '加载中...' })
        },
      });
      map.value.add(hjgMarker.value);  

      function updateDatahjg(){
        fetch("http://115.190.14.165:3000/hjg")
        .then(response=>response.json())
        .then(data =>{
          hjgMarker.value.setLabel({
            content: renderComponent(hjg, { data }),   
            direction: 'left',
          });
        });
      }
      updateDatahjg();
      updateTimer.value = setInterval(updateDatahjg, 30000);

    });
});

onUnmounted(() => {
  clearInterval(updateTimer.value);
  if (map.value) {
    cscMarker.value && map.value.remove(cscMarker.value);
    map.value.destroy();
  }
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
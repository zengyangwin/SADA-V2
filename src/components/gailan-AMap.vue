<script setup>
import { onMounted, onUnmounted, ref, createApp, markRaw } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import csc from './gailan-AMap/csc.vue';
import cl from './gailan-AMap/cl.vue';
import mh from './gailan-AMap/mh.vue';
import hy from './gailan-AMap/hy.vue';
import zc from './gailan-AMap/zc.vue';
import jzp from './gailan-AMap/jzp.vue';
import yq from './gailan-AMap/yq.vue';
import hjg from './gailan-AMap/hjg.vue';
import LoadingState from './LoadingState.vue';

const updateTimers = ref([]);
const map = ref(null);
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

// 数据更新函数
const updateDatacsc = () => {
  fetch("http://115.190.14.165:3000/csc")
    .then(response => response.json())
    .then(data => {
      if (cscMarker.value) {
        cscMarker.value.setLabel({
          content: renderComponent(csc, { data }),          
        });
      }
    })
    .catch(error => console.error('更新城市厂数据失败:', error));
};

const updateDatacl = () => {
  fetch("http://115.190.14.165:3000/xzps")
    .then(response => response.json())
    .then(data => {
      if (clMarker.value) {
        clMarker.value.setLabel({
          content: renderComponent(cl, { data }),          
        });
      }
    })
    .catch(error => console.error('更新车岭厂数据失败:', error));
};

const updateDatamh = () => {
  fetch("http://115.190.14.165:3000/xzps")
    .then(response => response.json())
    .then(data => {
      if (mhMarker.value) {
        mhMarker.value.setLabel({
          content: renderComponent(mh, { data }),          
        });
      }
    })
    .catch(error => console.error('更新茅河污水厂数据失败:', error));
};

const updateDatahy = () => {
  fetch("http://115.190.14.165:3000/xzps")
    .then(response => response.json())
    .then(data => {
      if (hyMarker.value) {
        hyMarker.value.setLabel({
          content: renderComponent(hy, { data }),          
        });
      }
    })
    .catch(error => console.error('更新红岩数据失败:', error));
};

const updateDatazc = () => {
  fetch("http://115.190.14.165:3000/zongchang")
    .then(response => response.json())
    .then(data => {
      if (zcMarker.value) {
        zcMarker.value.setLabel({
          content: renderComponent(zc, { data }),          
        });
      }
    })
    .catch(error => console.error('更新总厂数据失败:', error));
};

const updateDatajzp = () => {
  fetch("http://115.190.14.165:3000/fengongsi")
    .then(response => response.json())
    .then(data => {
      if (jzpMarker.value) {
        jzpMarker.value.setLabel({
          content: renderComponent(jzp, { data }),          
        });
      }
    })
    .catch(error => console.error('更新箭竹坪数据失败:', error));
};

const updateDatayq = () => {
  fetch("http://115.190.14.165:3000/fengongsi")
    .then(response => response.json())
    .then(data => {
      if (yqMarker.value) {
        yqMarker.value.setLabel({
          content: renderComponent(yq, { data }),  
          direction: 'left',
        });
      }
    })
    .catch(error => console.error('更新园区数据失败:', error));
};

const updateDatahjg = () => {
  fetch("http://115.190.14.165:3000/hjg")
    .then(response => response.json())
    .then(data => {
      if (hjgMarker.value) {
        hjgMarker.value.setLabel({
          content: renderComponent(hjg, { data }),   
          direction: 'left',
        });
      }
    })
    .catch(error => console.error('更新黄家岗数据失败:', error));
};

// 初始化定时器
const initTimers = () => {
  updateTimers.value.push(setInterval(updateDatacsc, 30000));
  updateTimers.value.push(setInterval(updateDatacl, 30000));
  updateTimers.value.push(setInterval(updateDatamh, 30000));
  updateTimers.value.push(setInterval(updateDatahy, 30000));
  updateTimers.value.push(setInterval(updateDatazc, 30000));
  updateTimers.value.push(setInterval(updateDatajzp, 30000));
  updateTimers.value.push(setInterval(updateDatayq, 30000));
  updateTimers.value.push(setInterval(updateDatahjg, 30000));
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
        zoom: 11.8,
        center: [103.232646, 30.108],
        resizeEnable: true,
      });

      // 添加行政区划图层
      const distProvince = new AMap.DistrictLayer.Province({
        zIndex: 10,
        zooms: [8, 20],
        adcode: "511803", // 雅安市名山区行政区划代码
        depth: 2,
      });

      distProvince.setStyles({
        fill: function (data) {
          return "rgba(0, 255, 0, 0.05)";
        },
        stroke: "rgb(255, 255, 255)",
        "stroke-width": 1,
      });
      map.value.add(distProvince);
      
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

      // 车岭厂
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

      // 茅河污水厂
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

      // 红岩
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

      // 总厂
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

      // 箭竹坪
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

      // 园区
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
      map.value.add(yqMarker.value);

      // 黄家岗
      hjgMarker.value = new AMap.Marker({
        position: [103.1410684, 30.1359471],
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

      // 初始化数据并启动定时器
      updateDatacsc();
      updateDatacl();
      updateDatamh();
      updateDatahy();
      updateDatazc();
      updateDatajzp();
      updateDatayq();
      updateDatahjg();
      
      initTimers();
    })
    .catch(error => {
      console.error('地图加载失败:', error);
    });
});

onUnmounted(() => {
  // 清理定时器
  const cleanupTimers = () => {
    if (updateTimers.value && updateTimers.value.length > 0) {
      updateTimers.value.forEach(timer => timer && clearInterval(timer));
      updateTimers.value = [];
    }
  };

  // 清理地图
  const cleanupMap = () => {
    if (!map.value) return;
    
    const markers = [cscMarker, clMarker, mhMarker, hyMarker, zcMarker, jzpMarker, yqMarker, hjgMarker];
    markers.forEach(marker => {
      if (marker.value) {
        map.value.remove(marker.value);
        marker.value = null;
      }
    });
    
    map.value.destroy();
    map.value = null;
  };

  cleanupTimers();
  cleanupMap();
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
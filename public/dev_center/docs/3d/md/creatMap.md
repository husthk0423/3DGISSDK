### 引入API


```html
  <script src="../../libs/CustomCesiumSDK/Cesium/Cesium.js"></script>
  <script src="../../libs/CustomCesiumSDK/CustomCesiumSDK.js"></script>
```

### 创建地图容器
    
```html
<div id="cesiumContainer" class="fullSize"></div>
``` 

### 指定地图容器

```javascript
// 使用 id 为 cesiumContainer 的 div 容器
var viewer = new Cesium.Viewer('cesiumContainer', {
  selectionIndicator: false, // 是否获取选择周指示器
  useBrowserRecommendedResolution: false, // 是否以浏览器建议的分辨率渲染
  animation: false, // 是否显示动画控件
  baseLayerPicker: false, // 是否显示图层选择控件
  geocoder: false, // 是否显示地名查找控件
  timeline: false, // 是否显示时间线控件
  sceneModePicker: true, // 是否显示投影方式控件
  navigationHelpButton: false, // 是否显示帮助信息控件
  imageryProvider: false, //不加载cesium提供的图层
  infoBox: false, // 是否显示点击要素之后显示的信息
})

// 设置相机视角
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(109.947146, 40.619721, 30000.0), //设置位置
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-90.0),
    roll: 0
  }
});
```

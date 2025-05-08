### 快速开始

本文将带你迅速了解 Cesium SDK 的基本使用，学习如何基于 Cesium SDK
开始地图应用的开发，使您在最短时间内成为 webgis 的开发者。

### 第一个示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>加载天地图影像</title>
  <link rel="stylesheet" href="../../css/style.css" />
  <script src="../../libs/CustomCesiumSDK/Cesium/Cesium.js"></script>
  <script src="../../libs/CustomCesiumSDK/CustomCesiumSDK.js"></script>
</head>

<body onload="init()">
  <div id="cesiumContainer" class="fullSize"></div>
</body>
<script>
  function init() {
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
    viewer.scene.globe.preloadAncestors = false
    viewer.scene.primitives.destroyPrimitives = false
    viewer.scene.globe.depthTesAgainstTerrain = false

    var tiandituImageLayer = new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=609c9ee0f9ff33b13c7a92cb51b636f4",
      layer: "tdtImg_c",
      style: "default",
      format: "tiles",
      tileMatrixSetID: "c",
      subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",
        "17", "18", "19"
      ],
      maximumLevel: 17,
    }));
    viewer.imageryLayers.add(tiandituImageLayer);

    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(109.947146, 40.619721, 30000.0), //设置位置
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0
      }
    });
  }
</script>

</html>
```
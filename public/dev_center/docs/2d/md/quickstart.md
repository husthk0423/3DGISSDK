### 快速开始

本文将带你迅速了解 leaflet SDK 的基本使用，学习如何基于 leaflet SDK
开始地图应用的开发，使您在最短时间内成为 webgis 的开发者。

### 第一个示例

```html
<!DOCTYPE html>
<html  style="overflow : hidden; ">
<head>
    <title>地图示例</title>
    <meta name="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="/example/css/leaflet.css" />
    <link rel="stylesheet" href="/example/css/rarefont.css" />
</head>

<body onload="init()"  style="margin : 0; ">
    <div id="map" class="map" style ="position:absolute;bottom:0px;top:0px;width:100%">
        <span id="jwd"  style ="position:absolute;bottom:10px;left:5px;z-index: 1000"></span>
    </div>

    <script src="/example/js/leaflet/leaflet.js"></script>
    <script src="/lib/jquery/jquery-1.11.1.js"></script>
    <script src="/example/js/leaflet/CustomWebSDK.min.js"></script>
    <script>
        function init(){
            var map = L.map('map',{
                crs:L.CRS.CustomEPSG4326,
                center: {lon:120.09215287988154,  lat:30.277052933991797},
                zoom:12
            });
            //添加底图
            var layer = new L.GXYZ('http://ditu.zjzwfw.gov.cn/mapserver/vmap/zjvmap/getMAP?x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017',{tileSize:512});
            map.addLayer(layer);
        }
    </script>
</body>
</html>
```

### 示例展示 <p align="right"><a href="/example/2d/html/dtsl.html" target="_blank">Demo</a></p>

<iframe width="100%" height="430" src="/example/2d/html/dtsl.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 分步剖析上面示例

- leaflet SDK 入口脚本和样式外链

```html
<link rel="stylesheet" href="/example/css/leaflet.css" />
<link rel="stylesheet" href="/example/css/rarefont.css" />
<script src="/example/js/leaflet/leaflet.js"></script>
<script src="/example/js/leaflet/CustomWebSDK.min.js"></script>
```

- 创建地图容器

注意：容器必须存在

```html
<div id="map"></div>
```


- 创建地图

> 默认需要传入两个参数，第一个为上面创建的容器 id，第二个参数为地图参数配置，配置详细说明见[配置选项](/md/options.md?#options)

```javascript
var map = L.map('map',{
    crs:L.CRS.CustomEPSG4326,
    center: {lon:120.09215287988154,  lat:30.277052933991797},
    zoom:12
});
```
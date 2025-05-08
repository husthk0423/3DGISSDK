### 如何创建一个地图

> 我们在创建一个地图之前虽然我们不需要深厚的GIS知识，但是至少
我们应该了解一个地图应该包含那些东西。

*核心组成部分：*

- 视图(`View`): 主要用于控制地图中心`center`、投影 `projection`、显示范围 `extent`、分辨率 `resolution`、
  旋转角度 `rotation`和默认显示层级 `zoom`。

- 图层(`Layer`)：图层类是一个很重要的概念，不管是叠加的底图还是叠加的影像或者矢量图层都属于一个图层。在HMap里面一定要有层的概念，
  所有图层都可以看成一张画布，按规则叠放起来的。而且一般我们业务系统会有不同的业务图层，所以分层管理是一种图形显示和管理的有效方式。
  应用这种方式能有效处理地图数据来源的多样性和复杂性问题。
  
- 数据源(`Source`): 图层数据源，使用在图层Layer的内置实现上。渲染引擎支持多种多样在线
  或离线的数据源；可以是静态图或者瓦片图；也可以是栅格化的或者矢量的。如果你想在地图上
  加载某种格式的数据，或者某种服务提供的数据必须提供对应的数据源实现。

- 控件(`Control`)：本api提供了工具条、比例尺、视图旋转、鹰眼、基本图层切换等常用的控件。 
  它为用户提供了和地图交互的入口。所有内置控件可以通过配置开启，也可以自定义添加，同样支持
  leaflet原生控件使用。

- 交互(`Interaction`): 交互功能是一个地图基本的功能，这些功能是直接面向用户，如果没有交互你就没法完成地图漫游，放大缩小等基础
  操作。控件的相关实现也是基于交互的层级之上实现的，相关交互的可以通过配置开启，也可以自定义添加，同样支持
  leaflet原生实现的交互类的调用。


### 引入API


```html
<link rel="stylesheet" href="/example/css/leaflet.css" />
<link rel="stylesheet" href="/example/css/rarefont.css" />
<script src="/example/js/leaflet/leaflet.js"></script>
<script src="/example/js/leaflet/CustomWebSDK.min.js"></script>
```

### 创建地图容器
    
```html
<div id="map"></div>
``` 

### 指定地图容器

```javascript
// 使用 id 为 map 的 div 容器初始化地图，同时指定地图的中心点和缩放级别
var Map = L.map('map'{
    center: [51.505, -0.09],
    zoom: 13
});
```

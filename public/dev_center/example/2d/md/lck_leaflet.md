>## 	概述

?> 矢量瓦片Web端leaflet SDK是基于leaflet 1.0以上扩展开发而来，本章节主要对矢量瓦片web端SDK接口进行相关说明。


>## 	接口列表


SDK主要提供的接口如表所示:

| 名称            | 描述                          | 继承自               |
| --------------- | ----------------------------- | ---------------------|
|L.GXYZ                 | 后端绘制矢量瓦片底图图层     | Leaflet的L.TileLayer |
|L.GVMapGrid            | 前端绘制矢量瓦片底图图层     | Leaflet的L.TileLayer |
|L.GLabelGrid           | 后端注记避让前端绘制注记图层 | Leaflet的L.Layer     |
|L.GWVTAnno             | 前端注记避让前端绘制注记图层 | Leaflet的L.Layer     |
|L.CRS.CustomEPSG4326    | 支持经纬度投影从1级开始请求 | Leaflet的L.CRS.Earth  |



## L.GXYZ

描述：后端绘制矢量瓦片底图图层 。继承自Leaflet的L.TileLayer, 它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |String,Json                                           | 无                  |构造函数                  |
|setFilter(filter)                       | Custom.FilterLayer                                           | 无              | 给底图数据设置过滤条件     |
|getFeatureByXY(x,y,callback)            |int,int,function                                              | JSON             |根据屏幕坐标拾取要素        |
|getFeatureByLonlat(latLng,callback)     |L.latLng,function                                             | JSON             |根据地理坐标拾取要素        |
|highlightFeatures(layerFeatures,style)  |拾取返回的Json对象,样式json对象如：{color:"red",opacity:0.8}  | 无              |高亮拾取到的要素               |
|highlightByFilter(filter)              |Custom.FilterLayer                                             | 无              |根据过滤条件高亮要素            |
|cancelHighlight()                       |无                                                             | 无              |取消高亮                    |

它的扩展属性如下：

| 属性名            | 类型                          | 默认值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|urlArray                 |Array                 | []                  |支持多个域名 , 如：[http://t0.tianditu.gov.cn,http://t1.tianditu.gov.cn]                |


##  L.GVMapGrid

描述：前端绘制矢量瓦片底图图层。继承自Leaflet的L.TileLayer, 它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |String,Json                                           | 无                  |构造函数                  |
|setFilter(filter)                       | Custom.FilterLayer                                           | 无              | 给底图数据设置过滤条件     |
|getFeatureByXY(x,y,callback)            |int,int,function                                              | JSON             |根据屏幕坐标拾取要素        |
|getFeatureByLonlat(latLng,callback)     |L.latLng,function                                             | JSON             |根据地理坐标拾取要素        |
|highlightFeatures(layerFeatures,style)  |拾取返回的Json对象,样式json对象如：{color:"red",opacity:0.8}  | 无              |高亮拾取到的要素               |
|highlightByFilter(filter)              |Custom.FilterLayer                                             | 无              |根据过滤条件高亮要素            |
|cancelHighlight()                       |无                                                             | 无              |取消高亮                    |

它的扩展属性如下：

| 属性名            | 类型                          | 默认值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|urlArray                 |Array                 | []                  |支持多个域名 , 如：[http://t0.tianditu.gov.cn,http://t1.tianditu.gov.cn]                |

##	L.GWVTAnno
描述：前端注记避让前端绘制注记图层。继承自Leaflet的L.Layer图层，它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |String,Json                                           | 无                  |构造函数                  |
|addDataSource(dataSource)          | Custom.DataSource   | 无                   | 给注记图层增加数据源,没有数据源将无法显示 |
|removeDataSourceById(dataSourceId) | string              | 无                   | 通过dataSourceId移除数据源                |
|redraw()                           |                     | 无                   | 重新绘制当前图层                          |
|getFeatureByXY()                   |                     | Custom.Feature       | 根据屏幕坐标获取要素                      |
|setOpacity(opacity)          | Number 0-1之间的小数  | 无                   | 给注记图层设置透明度 |
|addToMap(map)          | L.Map  | 无                   | 将注记图层加入到Map中 |
|setHasImportant(b)          | boolean  | 无                   | 是否支持isImportant属性,默认为true |

它的扩展属性如下：

| 属性名            | 类型                          | 默认值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|hitDetection                 |boolean                 | true                  |注记是否允许被拾取，为false时，能提升绘制性能    |


##  L.GLabelGrid

描述：后端注记避让前端绘制注记图层。继承自Leaflet的L.Layer图层，它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|setFilter(filter)   |Custom.FilterLayer  | 无                  |给注记数据设置过滤条件     |
|getFeatureByXY(x,y) | int,int            | Custom.Feature      | 根据屏幕坐标获取要素      |

它的扩展属性如下：

| 属性名            | 类型                          | 默认值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|hitDetection                 |boolean                 | true                  |注记是否允许被拾取，为false时，能提升绘制性能    |
|urlArray                 |Array                 | []                  |支持多个域名 , 如：[http://t0.tianditu.gov.cn,http://t1.tianditu.gov.cn]              


##  L.CRS.CustomEPSG4326

描述：支持经纬度投影从1级开始请求。继承自Leaflet的L.CRS.Earth图层，它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|scale(zoom)   |Number  | 无                  |重写父类的方法，支持缩放级别从第1级开始，父类是从第0级开始     |


## Leaflet 官方API
[https://leafletjs.com/reference-1.3.4.html](https://leafletjs.com/reference-1.3.4.html)
## 3.1	概述

?> 矢量瓦片Web端SDK是基于leaflet扩展开发而来，本章节主要对矢量瓦片web端SDK接口进行相关说明。


## 3.2	接口列表


矢量瓦片Web端SDK主要提供的接口如表所示:

| 名称            | 描述                          | 继承自               |
| --------------- | ----------------------------- | ---------------------|
|L.GXYZ                 | 后端绘制矢量瓦片底图图层     | Leaflet的L.TileLayer |
|L.GVMapGrid            | 前端绘制矢量瓦片底图图层     | Leaflet的L.TileLayer |
|L.GLabelGrid           | 后端注记避让前端绘制注记图层 | Leaflet的L.Layer     |
|L.GWVTAnno             | 前端注记避让前端绘制注记图层 | Leaflet的L.Layer     |
|Custom.DataSource      | 数据源基类                   | 无                   |
|Custom.URLDataSource   | 远程数据源                   | Custom.DataSource    |
|Custom.LocalDataSource | 本地数据源                   | Custom.DataSource    |
|Custom.Feature         | 本地要素                     | 无                   |
|Custom.Filter          | 过滤                         | 同移动端             |
|Custom.FilterLayer     | 图层过滤                     | 同移动端             | 


### 3.2.1	L.GXYZ

描述：后端绘制矢量瓦片底图图层 。继承自Leaflet的L.TileLayer, 它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|setFilter(filter)                       | Custom.FilterLayer| 无              | 给底图数据设置过滤条件     |
|getFeatureByXY(x,y,callback)            |int,int,object     | Custom.Feature  |根据屏幕坐标拾取要素        |
|highlightFeatures(layerFeatures,style)  |Features[],String  | 无              |根据指定的样式高亮要素      |
|highlightFeatures(layerFeatures,opacity)|Features[],int     | 无              |根据指定的透明度高亮要素    |
|cancelHighlight()                       |无                 | 无              |取消高亮                    |

### 3.2.2   L.GVMapGrid

描述：前端绘制矢量瓦片底图图层。继承自Leaflet的L.TileLayer, 它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|setFilter(filter)                     |Custom.FilterLayer  | 无               |给底图数据设置过滤条件 |
|getFeatureByXY(x,y,callback)          | int,int,object     | Custom.Feature   |根据屏幕坐标拾取要素   |
|highlightFeatures(layerFeatures,style)|layerFeatures[]     |无                |根据指定的样式高亮要素 |
|cancelHighlight()                     |无                  |无                |取消高亮               |

### 3.2.3   L.GLabelGrid

描述：后端注记避让前端绘制注记图层。继承自Leaflet的L.Layer图层，它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|setFilter(filter)   |Custom.FilterLayer  | 无                  |给注记数据设置过滤条件     |
|getFeatureByXY(x,y) | int,int            | Custom.Feature      | 根据屏幕坐标获取要素      |

### 3.2.4	L.GWVTAnno
描述：前端注记避让前端绘制注记图层。继承自Leaflet的L.Layer图层，它的扩展方法如下：

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|addDataSource(dataSource)          | Custom.DataSource   | 无                   | 给注记图层增加数据源,没有数据源将无法显示 |
|removeDataSourceById(dataSourceId) | string              | 无                   | 通过dataSourceId移除数据源                |
|redraw()                           |                     | 无                   | 重新绘制当前图层                          |
|getFeatureByXY()                   |                     | Custom.Feature       | 根据屏幕坐标获取要素                      |


### 3.2.5	Custom.DataSource
描述：数据源基类，具体属性如下：

| 名称            | 是否必须  | 默认值            | 类型                 | 含义            |
| --------------- | ----------|------------------ | ---------------------|-----------------|
|id               | 是        | 默认是随机生成的uuid | String | 数据源id，移除，查找数据源时，需要通过id来进行操作|


### 3.2.6	Custom.URLDataSource
描述：继承Custom.DataSource. 它是请求url远程的数据源，属性如下：

| 属性名          | 是否必须  | 默认值            | 类型                 | 含义          |
| --------------- | ----------|------------------ | ---------------------|-----------------|
| url             | 是        | null              | String               | 请求注记数据的url接口 |
| styleUrl        | 是        | null              | String               | 请求注记样式文件的url接口 |
| styleId         | 是        | style             | String               | 配合styleUrl一起使用，styleId指定了要取哪个样式文件 |

方法如下:

| 方法名          | 参数             | 返回值            |含义          |
| --------------- | -----------------|------------------ | -------------|
|setFilter(filter)| Custom.FilterLayer | 无              | 给数据源设置过滤条件 |


### 3.2.7	Custom.LocalDataSource

描述：继承Custom.DataSource。 它的扩展方法如下:

| 方法名          | 参数             | 返回值            |含义          |
| --------------- | -----------------|------------------ | -------------|
|addFeature(feature) | Custom.Feature | 无|  添加Feature对象|
|removeFeatureById(featureId) | String | 无 | 通过featureId移除Feature |
|addTextureUrl(name,url) | 1、name是注记图标的名称。<br /> 2、url为注记图标的url地址。| 无 | 添加图标纹理 |


### 3.2.8	Custom.Feature

描述：表示本地要素，具体属性如下:

|属性名     |是否必须  | 默认值            | 类型           | 含义           |
|-----------|----------|-------------------|----------------|----------------|
|id         | 是        | 默认自动生成uid   | String         | Feature的id    |
|type       | 是        | 0                 | Int            | 0代表点，1代表线.。（没有面注记）|
|sourceData | 是        | []                | array          | 地理坐标数组。 如：[120,30,121,31] |
|style      | 是        |  | key,value的object对象 | 单个注记要素的样式。如：feature.style = {show:true,labelfield:'name', avoidField:'avoidWeight',avoidWeight:0, chinaLabelWidth:16, otherLabelWidth:16,gap:3, angle:30,pointHashOutline:true,pointHashBackground:false,graphicYOffset:-7,graphicXOffset:-7,graphicHeight:14, graphicDistance:0, pointFillStyle:'#ff00ff',pointFillFont:'12px Arial',pointFillAlpha:1, pointLineWidth:2,pointStrokeStyle:'#ffffff',pointStrokeFont:'12px Arial',pointStrokeAlpha:1,pointHeight:12,pointBackgroundColor:'#ff0000',pointBackgroundAlpha:1,pointBackgroundLineWidth:1,pointBackgroundLineColor:'#ff0000',pointBackgroundRadius:3,pointBackgroundGap:0,texture:'150101.png'}; |


本地要素Custom.Feature方法：

|方法名        | 参数     | 返回值       | 含义          |
|--------------|----------|--------------|---------------|
|addAttribute(key,value) | key为String，value为object | 无 | 给Feature增加属性数据如：feature.addAttribute('name','本地测试数据2') |
|removeAttributeByKey(key) | String | 无 | 通过属性名移除属性feature.removeAttributeByKe('name') |


### 3.2.9	Custom.Filter

Custom.Filter属性：

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|otherDisplay | 否 | true | boolean | 控制其他图层显隐|

Custom.Filter方法:

|方法名        | 参数     | 返回值     | 含义             |
|--------------|----------|------------|------------------|
|addFilterLayer(filterLayer) | Custom.FilterLayer | 无 | 添加图层过滤条件 |
|removeFilterLayerById(filterLayerId) | string | 无 | 通过图层id移除过滤条件 |


### 3.2.10	Custom.FilterLayer

Custom.FilterLayer属性

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|id         | 是        | null              | String         | 图层的名称     |
|idFilter   | 否        | null              | String         | 要过滤要素的主键id。 默认为null时，不通过该值过滤 |
|display    | 否        | true              | boolean        | 该过滤图层中的要素是否保留显示 |


Custom.FilterLayer方法

|方法名             | 参数            | 返回值        | 含义        |
|-------------------|-----------------|---------------|-------------|
|addFilterField(key,value) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。Value为obejct类型 | 无 | 添加过滤字段|
| removeFilterField(key) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。 | 无 | 通过过滤条件key移除过滤字段 |


## 3.3	注记样式属性列表

描述：样式注记主要是对于地图注记样式的定义，例如注记的字体、颜色、大小、符号、权重等等，具体属性如下表所示：

|属性名          | 是否必须  | 默认值   | 类型   | 含义    |
|----------------|-----------|----------|--------|---------|
|show            | 是        | true     | boolean| 注记是否显示 |
|labelfield      | 是        | name     | String | 注记显示的文字，对应的属性字段 |
|avoidField      | 是        | avoidWeight | String | 避让权重字段，如果数据中有权重字段，请指定权重字段 |
|avoidWeight     | 是        | 0        | Int    | 如果数据中没有权重字段，请在这设置权重 |
|chinaLabelWidth | 是        | 16       | int    | 单位像素，线注记的文字宽度 |
|gap             | 是        | 3        | int    | 单位像素，线注记字间距 |
|angle           | 是        | 30       | Int    | 单位 度。线状注记中任意两个字之间，旋转角度差多少度时不显示 |
|pointHashOutline | 是       | true     | boolean | 点注记，文字是否有描边 |
|pointHashBackground | 是 | false | boolean | 点注记是否有底部面填充 |
|texture | 否 | “” | String | 点注记图标的id |
|graphicYOffset | 是         | -7       | Int    | 单位像素，点图片往下偏移的距离 |
|graphicXOffset  | 是        | -7       | Int    | 单位像素，点图片往右偏移的距离 |
|graphicHeight | 是          | 14       | Int    | 单位像素，图片制作时，需让图片的宽度和高度相等 |
|graphicDistance | 是        | 3        | Int    | 点图片与点注记的距离  |
|isFourDirections | 是       | False    | Boolean | 点注记是否开启四宫格避让 |
|pointFillStyle | 是         | #000000  | 16进制颜色值 | 点注记文字的颜色 |
|pointFillFont | 是          | 12px Arial | String | 点注记的字体大小，字体类型 |
|pointFillAlpha | 是 | 1 | Number | 点注记的文字透明度 |
|pointLineWidth | 是 | 2 | Int | 点注记文字的线宽度 |
|pointStrokeStyle | 是 | # ffffff | 16进制颜色值 | 点注记描边的颜色 |
|pointStrokeFont | 是 | 12px Arial | String | 点注记描边文件的字体大小，字体类型 |
|pointStrokeAlpha | 是 | 1 | Number | 点注记描边文件的透明度 | 
|pointHeight | 是 | 12 | Int | 点注记文字宽度，通常设置时需比字体大两个像素，主要用于算避让box的高度 | 
|pointBackgroundColor | 是 | #ff0000 | 16进制颜色值 | 点注记背景矩形框的填充色 |
|pointBackgroundAlpha | 是 | 1 | Number | 点注记背景矩形框的透明度 |
|pointBackgroundLineWidth | 是 | 1 | Int | 点注记背景矩形框的边框宽度 |
|pointBackgroundLineColor | 是 | #ff0000 | 16进制颜色值 | 点注记背景矩形框的边框颜色 |
|pointBackgroundRadius | 是 | 3 | Int | 点注记背景矩形框的圆角 | 
|pointBackgroundGap | 是 | 3 | Int | 点注记背景矩形边缘与里面文字的间距 |
|lineTextRotate | 否 | 0 | Number | 线注记旋转的角度，当开启此属性了，线注记将不会沿线旋转，而是使用该固定角度 |
|lineHashOutline | 是 | True | Boolean | 线注记是否有描边 |
|lineHashBackground | 是 | False | Boolean | 线注记是否有底部矩形填充 |
| lineFillStyle | 是 | #000000 | 16进制颜色值 | 线注记文字的颜色 | 
|lineFillFont | 是 | 12x Arial | String | 线注记的字体大小，字体类型 |
|lineFillFont | 是 | 12x Arial | String | 线注记的字体大小，字体类型 |
|lineFillAlpha | 是 | 1 | Number | 线注记问自己的透明度 |
|lineLineWidth | 是 | 2 | Int | 线注记文字的线度 |
|lineStrokeStyle | 是 | #ffffff | 16进制颜色值 | 线注记描边的颜色 |
|lineStrokeFont | 是 | 12px Arial | String | 线注记描边的字体大小，字体类型 |
|lineStrokeAlpha | 是 | 1 | Number | 线注记文字的透明度 |
|backgroundColor | 是 | #ff0000 | 16进制颜色值 | 线注记背景矩形框的填充颜色 |
|backgroundAlpha | 是 | 1 | Number | 线注记背景矩形框的透明度 |
|backgroundLineWidth | 是 | #ff0000 | 16进制颜色值 | 线注记背景矩形框的边线宽度 |
|lineBackgroundRadius | 是 | 3 | Int | 线注记背景矩形框的圆角 |
|lineBackgroundGap | 是 | 3 | int | 单位像素，缘与里面文字的间距 |
|lineHeight | 是 | 12 | Int | 单位像素，线注记文字的高度 |
|codeLineHashOutline | 是 | False | boolean | 线编码注记是否有文字描边 |
|codeLineHashBackground | 是 | False | boolean | 线编码注记是否有背景填充框 |
|showRoadCode | 是 | False | boolean | 是否显示线编码注记 |
|showArrow | 是 | False | boolean | 是否显示道路箭头 |
|roadCodeLabel | 是 | “” | String | 道路编号的字段名 |
|codeLineFillStyle | 是 | #000000 | 16进制颜色值 | 线编码注记的文字颜色 |
|codeLineFillFont | 是 | 16px Arial | String | 线编码注记的字体大小，字体类型 |
|codeLineFillAlpha | 是 | 1 | Number | 线编码的文字透明度 |
|codeLineLineWidth | 是 | 2 | Numbe | 线编码的文字线宽度 |
|codeLineStrokeStyle | 是 | #ffffff | 16进制颜色值 | 线编码注记的描边颜色 |
|codeLineStrokeFont | 是 | 12px Arial | String | 线编码注记的描边字体大小，字体类型 |
|codeLineStrokeAlpha | 是 | 1 | Number | 线编码注记描边的透明度 |
|codeBackgroundColor | 是 | #ff0000 | 16进制颜色值 | 线编码注记背景矩形框填充色 |
|codeBackgroundAlpha | 是 | 1 | Number | 线编码注记背景矩形框透明度 |
|codeLineBackgroundGap | 是 | 3 | Int | 线编码注记背景矩形框与文字的间距 |
|codeBackgroundLineWidth | 是 | #ff0000 |16进制颜色值 | 线编码注记背景矩形边线 |
|codeLineBackgroundRadius | 是 | 3 | Int | 线编码注记背景矩形圆角 |
| codeLineHeight | 是 | 12 | Int | 线编码注记文字高度 |
|arrowDirectionValue | 是 | 0 | Int | 道路箭头的方向, 0为沿线的正方向，1为沿线的反方向 |


##	3.4	底图要素属性列表

描述：样式注记主要是对于地图注记样式的定义，例如注记的字体、颜色、大小、符号、权重等等，具体属性如下表所示。

|属性名      | 是否必须    | 默认值    | 类型      | 含义     |
|------------|-------------|-----------|-----------|----------|
|fill | 是 | True | Boolean | 是否有填充色 |
|fillColor | 否 | 无 | 16进制颜色值 | 底图要素填充色 |
|fillOpacity | 否 | 无 | Number | 底图要素填充透明度 |
|texture | 否 | 无 | String | 要素填充纹理id |
|stroke | 是 | False | Boolean | 是否有边框 |
|strokeWidth | 否 | 无 | Boolean | 边框宽度 |
|strokeColor | 否 | 无 | 16进制颜色值 | 边框颜色值 |
|strokeOpacity | 否 | 无 | Number | 边框透明度 |
|dash | 否 | 无 | Array | 虚线线段数据。如：[10,10]每隔10个像素，画10像素长的线 |
|lineCap | 否 | butt | String | Butt：向线条的每个末端添加平直的边缘 <br /> Round：向线条的每个末端添加圆形线帽 <br />Square：向线条的每个末端添加正方形线帽 |




##	3.5	SDK示例

### 3.5.1	接入底图图层

#### 3.5.1.1	描述
本示例将介绍如何通过web端矢量瓦片 sdk进行矢量瓦片注记服务的接入

####  3.5.1.2	调用示例
    var map = L.map('map',{crs:L.CRS.GeowayEPSG4326,center: {lon:120.15, lat:30.268},zoom: 8}); 
    var layer = new L.GXYZ('http://ditu.zjzwfw.gov.cn/mapserver/vmap/china/getMAP?x={x}&y={y}&l={z}');
    map.addLayer(layer);


### 3.5.2	接入注记图层
#### 3.5.2.1	描述
本示例将介绍如何通过web端矢量瓦片 sdk进行矢量瓦片注记服务的接入。
#### 3.5.2.2	调用示例
    var map = L.map('map',{crs:L.CRS.GeowayEPSG4326,center: {lon:120.15, lat:30.268},zoom: 8}); 
    var labelLayer = new L.GWVTAnno("GWVTAnno");
    var dataSource = new Custom.URLDataSource(); 
    dataSource.url = 'http://ditu.zjzwfw.gov.cn/mapserver/label/china/getDatas?x=${x}&y=${y}&l=${z}';
    dataSource.styleUrl ='http:// ditu.zjzwfw.gov.cn:8080/mapserver/server/style';
    dataSource.styleId = 'styleLabel';
    labelLayer.addDataSource(dataSource);
    map.addLayer(labelLayer); 


### 3.5.3	添加marker
#### 3.5.3.1	描述
本示例将介绍如何通web端矢量瓦片 sdk进行marker的接入，图标的设置等。

####  3.5.3.2	调用示例
    var customIcon = L.icon({ 
	    iconUrl: './js/theme/default/img/marker.png', 
	    //以下都是可选参数 
	    iconSize: [38, 95], // 自定义图标size 
	    iconAnchor:   [22, 94], // 自定义锚点去适应icon的位置
    }); 
    var marker = L.marker( 
	    [36.52,120.31], 
	    { 
	    draggable: true,// 使图标可拖拽
	    title: 'Text',// 添加一个标题
	    opacity: 0.5,
	    icon: customIcon//添加自定义的图标
	    }
    ).addTo(map);


### 3.5.4	添加几何图形
####  3.5.4.1	描述
本示例将介绍：如何通过web端矢量瓦片 sdk进行几何图形的绘制接入、填充等属性设置。

#### 3.5.4.2	调用示例
    var map = L.map(
	    'map',{crs:L.CRS.GeowayEPSG4326,easeLinearity:0.6,center:
	    {lon:120.15, lat:30.268},zoom: 8}
	);
    
    var circle = L.circle([36.52,120.31], {
	    color: 'green',
	    fillColor: '#f03',
	    fillOpacity: 0.5,
	    radius: 10000
    }).addTo(map);
    
    // add a polygon   
    var polygon = L.polygon([
	    [36, 121],
	    [37, 121],
	    [36.5, 122],
	    [36.5, 122.2]
    ]).addTo(map);

### 3.5.5	添加浮云框
#### 3.5.5.1	描述
本示例将介绍如何通过web矢量瓦片 sdk进行浮云框的添加与定义。

#### 3.5.5.2	调用示例
    var options = { 
	    maxWidth:200, 
	    maxHeight:50, 
	    autoPan:false,//关闭自动平移 
	    closeButton:true,//是否使用popup的关闭按钮
	    offset:10//设置偏移量，适用于自定义popup 
    }; 
    var popup = L.popup(options).setLatLng([35,120]).setContent('< div>'这是一个Popup图层'< /div>').addTo(map);


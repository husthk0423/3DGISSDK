>## 	概述

?> GeowaySDK为javascript实现的三维地图sdk ，本章节主要对geowaySDK接口进行相关说明。


>## 	接口列表


SDK主要提供的接口如表所示:

| 名称            | 描述                          |
| --------------- | ----------------------------- |
|Geoway.Map                 | 地图类     | 
|Geoway.XYZ                 | XYZ图层类| 
|Geoway.WMSLayer            | WMS图层类 | 
|Geoway.LabelLayer          | 注记图层类 | 
|Geoway.VectorLayer         | 矢量地图图层类 | 
|Geoway.MixLayer            | 矢量混合图层类，包括底图，注记，和3d房屋 | 
|Geoway.GeoSourceLayer      | 本地矢量地图图层类 | 
|Geoway.Popup               | 气泡类 | 
|Geoway.Marker              | 图标或者div标注类 | 
|Geoway.ScaleControl        | 比例尺控件 | 
|Geoway.MousePositionControl| 鼠标位置控件 | 
|Geoway.LevelControl        | 地图层控件 | 
|Geoway.MeasureLengthControl| 测距控件 | 
|Geoway.MeasureAreaControl  | 测面积控件 | 
|Geoway.LngLat              | 经纬度 | 
|Geoway.LngLatBounds        | 经纬度范围 | 
|Geoway.Filter              | 过滤器类 | 
|Geoway.FilterLayer         | 图层过滤器类   | 



## Geoway.Map

描述：地图类，支持地图的缩放，平移，旋转等操作。

| 名称            | 参数说明                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(options)                 |options：Json格式,{container:地图容器，div的id值,center:中心点、如：[120.14597,30.27377],zoom:层级，pitch:倾斜角度，bearing：旋转角度，<br> maxZoom:最大层级，minZoom：最小层级，glyphUrl：字体文件路径、如： '../fonts/{fontstack}/{range}.pbf'，fontName：字体名称，_showTileBoundaries:是否显示瓦片网格线，默认不显示}                                           | 无                  |构造函数                  |
|flyTo(options)                       | options：Json格式，{center:飞到指定的中心点，zoom：飞到指定的层级，speed：飞行速度，1.2}                                          | 无              | 飞刀指定坐标     |
|fitBounds(bounds,options)            |bounds：范围、如：[[120, 43], [121, 45]]，options：Json格式，{center:飞到指定的中心点，zoom：飞到指定的层级，speed：飞行速度，1.2}                                    | JSON             |地图缩放到指定范围        |
|addControl(control,position)       |control:控件对象，position:控件在地图中的位置，默认为‘top-right’右上角                                             | JSON             |添加控件到地图中        |
|removeControl(control)            |control：控件对象                                                                                                    | 无              |移除控件               |
|addLayer(layer)                  |layer：图层对象     | 无              |添加图层            |
|removeLayer(layer)               |layer:图层对象      | 无              |移除图层                    |
|removeAllLayer()                 |无      | 无              |移除所有图层                    |
|resize()                       |无     | 无              |更新地图大小,修改了map的div容器大小后，需要调用本函数                    |
|getBounds()                       |无     | LngLat Bounds对象              |获取地图当前的视口范围                    |
|project(lnglat)                       |LngLat对象     | 屏幕坐标数组              |将地理坐标转换为当前屏幕坐标                    |
|unproject(point)                       |屏幕坐标数组   | LngLat对象              |将当前屏幕坐标，转换为地理坐标                    |
|on(type, listener)                       |type, listener：事件回调函数                                                     | 无              |地图监听指定类型的事件                    |
|off(type, listener)                       |type, listener：事件回调函数                                                   | 无              |地图移除指定类型的事件                    |
|getCenter()                       |无     | LngLat对象               |获取地图中心点                    |
|getZoom()                       |无       | Number              |获取地图层级                    |
|getBearing()                       |无       | Number              |获取地图旋转角度                    |
|getPitch()                       |无      | Number              |移除地图倾斜角度                    |
|setCenter(center)                  |center：中心点    | 无              |设置地图中心点                    |
|setZoom(zoom)                       |zoom:地图层级             | 无              |设置地图层级                    |
|setBearing(bearing)                       |bearing：旋转角度                  | 无              |设置地图旋转角度                    |
|setPitch(pitch)                       |pitch：倾斜角度                             | 无              |设置地图倾斜角度                    |


##  Geoway.GridLayer

描述：格网图层的基类，负责计算需要请问的瓦片行列号，和实现一些公共的图层方法

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(options)                 |options：Json格式，{tileSize:瓦片大小、默认512，minZoom：最小层级、默认值为0，<br>maxZoom：最大层级、默认值为22,tileFaceTime：瓦片显示的渐变时间、透明度从0到1、<br>默认值为300毫秒，visibility：图层是否可见，默认为true}                                           | 无                  |构造函数                  |
|redraw()                            | 无                                                   | 无                  | 重新绘制图层     |
|setVisibility(visiblity)            |Number                                                | 无                  |设置图层是否可见        |

##  Geoway.XYZ 

描述：继承自Geoway.GridLayer,根据层行列号获取瓦片的图层，瓦片为png或者jpg

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |url:服务地址,options:与GridLayer图层构造函数的options值相同                                        | 无                  |构造函数                  |
|setFilter(filte,callback)                | filte:Geoway.Filter对象,callback:回调函数                                           | 无              | 给图层设置过滤条件     |
|setUrl(url)            |url:服务地址                                                 | JSON             |重新设置url        |


##	Geoway.WMSLayer

描述：WMS图层，继承自Geoway.GridLayer, 根据瓦片的范围从服务端获取瓦片。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |url:服务地址,options:与GridLayer图层构造函数的options值相同                                        | 无                  |构造函数                  |
|setFilter(filte,callback)                | filte:Geoway.Filter对象,callback:回调函数                                           | 无              | 给图层设置过滤条件     |
|setUrl(url)            |url:服务地址      

##  Geoway.LabelLayer

描述：注记图层，继承自Geoway.GridLayer。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |url:服务地址,options:与GridLayer图层构造函数的options值相同                                        | 无                  |构造函数                  |
|setFilter(filte,callback)                | filte:Geoway.Filter对象,callback:回调函数                                           | 无              | 给图层设置过滤条件     |
|setUrl(url,callback)            |url:服务地址,callback:回调函数，当新的url解析，获取样式等完成后，执行本回调函数                                               | JSON             |重新设置url        |


##  Geoway.VectorLayer

描述：显示矢量底图图层和3d房屋，继承自Geoway.GridLayer。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |url:服务地址,options:与GridLayer图层构造函数的options值相同                                        | 无                  |构造函数                  |
|setFilter(filte,callback)                | filte:Geoway.Filter对象,callback:回调函数                                           | 无              | 给图层设置过滤条件     |
|setUrl(url,callback)            |url:服务地址,callback:回调函数，当新的url解析，获取样式等完成后，执行本回调函数                                               | JSON             |重新设置url        |

##  Geoway.MixLayer

描述：显示矢量底图图层，注记和3d房屋，继承自Geoway.GridLayer。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(url, options)                 |url:服务地址,options:与GridLayer图层构造函数的options值多两个参数:<br> useFbo:是否使用贴图模式、默认false， needDecode：是否需要对数据进行偏移量解码、默认为true                                        | 无                  |构造函数                  |
|setFilter(filte,isLabel,callback)                | filte:Geoway.Filter对象,isLabel:是否为注记层设置过滤，callback:回调函数                                           | 无              | 给图层设置过滤条件     |
|setUrl(url,callback)            |url:服务地址,callback:回调函数，当新的url解析，获取样式等完成后，执行本回调函数                                              | JSON             |重新设置url        |


##  Geoway.GeoSourceLayer

描述：本地矢量图层，绘制点，线，面需要用到本图层。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(map)                 |Geoway.Map对象                                           | 无                  |构造函数                  |
|addFeature(feature)                |object对象，参考添加点，线，面示例                                          | 无              | 往图层中添加要素     |
|queryFeature(propertyValue,propertyName)            |propertyValue：数值值， propertyName：属性名称                                           | JSON             |根据属性名和属性值，查询要素       |


##  Geoway.Popup

描述：气泡类。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(options)                 |options:Json对象，{closeButton:是否显示关闭按钮、默认值为true，<br>closeOnClick：是否点击地图的其它地方、就关闭气泡。 默认值为true}                                           | 无                  |构造函数                  |
|addTo(map)                | Geoway.Map                                           | 无              | 将气泡添加到地图中     |
|remove()            |无                                             | 无             |将气泡从地图中移除       |
|setLngLat(lnglat)                 |Geoway.Lnglat                                           | 无                  |设置气泡的位置                  |
|setHTML(html)                | html对象                                           | 无              | 设置气泡显示的内容     |


##  Geoway.Marker

描述：Marker类，用于在地图上显示小图标，或者是html内容。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(element, options)                 |Geoway.Map对象                                           | 无                  |构造函数                  |
|addTo(map)                | Geoway.Map                                           | 无              | 将气泡添加到地图中     |
|remove()            |无                                             | 无             |将气泡从地图中移除       |
|setLngLat(lnglat)                 |Geoway.Lnglat                                           | 无                  |设置气泡的位置                  |


##  Geoway.ScaleControl

描述：比例尺控件。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(options)                 | options：Json对象, {maxWidth:最大宽度、默认100像素}                                          | 无                  |构造函数                  |

##  Geoway.MousePositionControl

描述：鼠标位置控件，实时显示鼠标位置在地图上的地理坐标。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize()                 |无                                           | 无                  |构造函数                  |


##  Geoway.LevelControl

描述：地图层级控件，实时显示地图的当前层级。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize()                 |无                                           | 无                  |构造函数                  |


##  Geoway.MeasureLengthControl

描述：测距控件。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize()                 |无                                           | 无                  |构造函数                  |
|enable()                 |无                                           | 无                  |开启测量                  |
|disable()                 |无                                           | 无                  |停止测量                  |


##  Geoway.MeasureAreaControl

描述：测面积控件。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize()                 |无                                           | 无                  |构造函数                  |
|enable()                 |无                                           | 无                  |开启测量                  |
|disable()                 |无                                           | 无                  |停止测量                  |


##  Geoway.LngLat

描述：经纬度类。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(lng,lat)                 |经度，纬度                                          | 无                  |构造函数                  |


##  Geoway.LngLatBounds

描述：经纬度类。

| 名称            | 参数                          | 返回值               | 含义                |
| --------------- | ----------------------------- | ---------------------|---------------------|
|initialize(sw, ne)                 |sw: 右下角经度度， ne：左上角经度度                                     | 无                  |构造函数                  |


##	Geoway.Filter

Geoway.Filter属性：

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|otherDisplay | 否 | true | boolean | 除本类中layers,其他图层的显隐|

Geoway.Filter方法:

|方法名        | 参数     | 返回值     | 含义             |
|--------------|----------|------------|------------------|
|addFilterLayer(filterLayer) | Custom.FilterLayer | 无 | 添加图层过滤条件 |
|removeFilterLayerById(filterLayerId) | String | 无 | 通过图层id移除过滤条件 |


##	Geoway.FilterLayer

Geoway.FilterLayer属性:

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|id         | 是        | null              | String         | 图层的名称     |
|idFilter   | 否        | null              | String         | 要过滤要素的主键id。 默认为null时，不通过该值过滤 |
|filterStr    | 否        | null              | String        | 过滤条件Json格式，如果同时也有filters，会优先使用filterStr |
|color    | 否        | null              | Object        | 高亮对象,默认为null时，使用配图的默认样式。 示例：{"color":"%23f00fff","opacity":0.9}， 其中颜色值必须用%23开头 |
|display    | 否        | true              | boolean        | 该过滤图层中的要素是否保留显示 |


Geoway.FilterLayer方法:

|方法名             | 参数            | 返回值        | 含义        |
|-------------------|-----------------|---------------|-------------|
|addFilterField(key,value) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。Value为obejct类型 | 无 | 添加过滤字段|
| removeFilterField(key) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。 | 无 | 通过过滤条件key移除过滤字段 |

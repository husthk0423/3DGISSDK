## 	概述

?> 本章节主要对leaflet sdk 和openlayers sdk 公共的api接口，以及注记和底图样式属性进行说明。


## 	接口列表

矢量瓦片Web端SDK主要提供的接口如表所示:

| 名称            | 描述                          | 继承自               |
| --------------- | ----------------------------- | ---------------------|
|Custom.DataSource      | 数据源基类                   | 无                   |
|Custom.URLDataSource   | 远程数据源                   | Custom.DataSource    |
|Custom.LocalDataSource | 本地数据源                   | Custom.DataSource    |
|Custom.Feature         | 本地要素                     | 无                   |
|Custom.Filter          | 过滤                         | 同移动端             |
|Custom.FilterLayer     | 图层过滤                     | 同移动端             | 

##	Custom.DataSource
描述：数据源基类，具体属性如下：

| 名称            | 是否必须  | 默认值            | 类型                 | 含义            |
| --------------- | ----------|------------------ | ---------------------|-----------------|
|id               | 是        | 默认是随机生成的uuid | String | 数据源id，移除，查找数据源时，需要通过id来进行操作|


##	Custom.URLDataSource
描述：继承Custom.DataSource. 它是请求url远程的数据源，属性如下：

| 属性名          | 是否必须  | 默认值            | 类型                 | 含义          |
| --------------- | ----------|------------------ | ---------------------|-----------------|
| url             | 是        | null              | String               | 请求注记数据的url接口 |
| urlArray        | 否        | []              | Array               | 支持多个域名 , 如：[http://t0.tianditu.gov.cn,http://t1.tianditu.gov.cn] |

方法如下:

| 方法名          | 参数             | 返回值            |含义          |
| --------------- | -----------------|------------------ | -------------|
|setFilter(filter)| Custom.FilterLayer | 无              | 给数据源设置过滤条件 |


##	Custom.LocalDataSource

描述：继承Custom.DataSource。 它的扩展方法如下:

| 方法名          | 参数             | 返回值            |含义          |
| --------------- | -----------------|------------------ | -------------|
|addFeature(feature) | Custom.Feature | 无|  添加Feature对象|
|removeFeatureById(featureId) | String | 无 | 通过featureId移除Feature |
|addTextureUrl(name,url) | 1、name是注记图标的名称。<br /> 2、url为注记图标的url地址。| 无 | 添加图标纹理 |


##	Custom.Feature

描述：表示本地要素，具体属性如下:

|属性名     |是否必须  | 默认值            | 类型           | 含义           |
|-----------|----------|-------------------|----------------|----------------|
|id         | 是        |自动生成uid   | String         | Feature的id    |
|type       | 是        | 0                 | Int            | 1代表点，2代表线.。（没有面注记）|
|sourceData | 是        | []                | array          | 地理坐标数组。 如：[120,30,121,31] |
|style      | 是        |  | key,value的object对象 | 单个注记要素的样式。如：feature.style = {show:true,labelfield:'name', avoidField:'avoidWeight',avoidWeight:0,  chinaLabelWidth:16, otherLabelWidth:16,gap:3,angle:30,pointHashOutline:true,pointHashBackground:false,  graphicYOffset:-7,graphicXOffset:-7,graphicHeight:14, graphicDistance:0, pointFillStyle:'#ff00ff',  pointFillFont:'12px Arial',pointFillAlpha:1, pointLineWidth:2,pointStrokeStyle:'#ffffff',  pointStrokeFont:'12px Arial',pointStrokeAlpha:1,pointHeight:12,pointBackgroundColor:'#ff0000',  pointBackgroundAlpha:1,pointBackgroundLineWidth:1,pointBackgroundLineColor:'#ff0000',  pointBackgroundRadius:3,pointBackgroundGap:0,texture:'150101.png'}; |


本地要素Custom.Feature方法：

|方法名        | 参数     | 返回值       | 含义          |
|--------------|----------|--------------|---------------|
|addAttribute(key,value) | key为String，value为object | 无 | 给Feature增加属性数据如：feature.addAttribute('name','本地测试数据2') |
|removeAttributeByKey(key) | String | 无 | 通过属性名移除属性feature.removeAttributeByKe('name') |


##	Custom.Filter

Custom.Filter属性：

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|otherDisplay | 否 | true | boolean | 除本类中layers,其他图层的显隐|

Custom.Filter方法:

|方法名        | 参数     | 返回值     | 含义             |
|--------------|----------|------------|------------------|
|addFilterLayer(filterLayer) | Custom.FilterLayer | 无 | 添加图层过滤条件 |
|removeFilterLayerById(filterLayerId) | String | 无 | 通过图层id移除过滤条件 |


##	Custom.FilterLayer

Custom.FilterLayer属性:

|属性名     | 是否必须  | 默认值            | 类型           | 含义           |
|-----------|-----------|-------------------|----------------|----------------|
|id         | 是        | null              | String         | 图层的名称     |
|idFilter   | 否        | null              | String         | 要过滤要素的主键id。 默认为null时，不通过该值过滤 |
|filterStr    | 否        | null              | String        | 过滤条件Json格式，如果同时也有filters，会优先使用filterStr |
|color    | 否        | null              | Object        | 高亮对象,默认为null时，使用配图的默认样式。 示例：{"color":"%23f00fff","opacity":0.9}， 其中颜色值必须用%23开头 |
|display    | 否        | true              | boolean        | 该过滤图层中的要素是否保留显示 |


Custom.FilterLayer方法:

|方法名             | 参数            | 返回值        | 含义        |
|-------------------|-----------------|---------------|-------------|
|addFilterField(key,value) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。Value为obejct类型 | 无 | 添加过滤字段|
| removeFilterField(key) | key的值参考“条件表达式柜则.xlsx”文档中的条件表达式。 | 无 | 通过过滤条件key移除过滤字段 |


##	注记样式属性列表

描述：主要是对于地图注记样式的定义，例如注记的字体、颜色、大小、符号、权重等等，具体属性如下表所示：

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
|distance | 否 | undefined | Number | 点注记去重的间距 |
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
|lineTextDistance | 否 | undefined | Number | 线注记文字去重间距 |
|backgroundColor | 是 | #ff0000 | 16进制颜色值 | 线注记背景矩形框的填充颜色 |
|backgroundAlpha | 是 | 1 | Number | 线注记背景矩形框的透明度 |
|backgroundLineWidth | 是 | #ff0000 | 16进制颜色值 | 线注记背景矩形框的边线宽度 |
|lineBackgroundRadius | 是 | 3 | Int | 线注记背景矩形框的圆角 |
|lineBackgroundGap | 是 | 3 | int | 单位像素，缘与里面文字的间距 |
|lineHeight | 是 | 12 | Int | 单位像素，线注记文字的高度 |
|isTransverse | 是 | false | boolean | 线注记只有一个点时，是否横摆 |
|extendedNum | 是 | 3 | int | 线注记需要延长的字等于或超过几个字时，不显示 |
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
| lineCodeDistance | 否 | undefined | Number | 线编码注记去重间距 |
|arrowDirectionValue | 是 | 0 | Int | 道路箭头的方向, 0为沿线的正方向，1为沿线的反方向 |


##	底图要素属性列表

描述：主要是对于底图要素属性的定义，具体属性如下表所示:

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

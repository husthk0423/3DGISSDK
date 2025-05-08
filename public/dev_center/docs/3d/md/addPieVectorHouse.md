### 功能介绍

   加载宏图白膜房屋图层，需要先发布白膜房屋服务。

### 关键代码
```javascript
var zoneHouseLayer = new Cesium.ImageryLayer(new Custom.HouseTileServiceImageryProvider(viewer, {
  url: "http://10.110.205.2:28021/mapserver/data/waikuo4m/getData?x={x}&y={y}&l={z}&styleId=waikuo4m&tilesize=512",
  tileMatrixLabels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
    "18", "19", "20", "21", "22"
  ],
  maximumLevel: 18,
  tileWidth: 512,
  tileHeight: 512,
  dataType: 'binary',
  tilingScheme: new Cesium.GeographicTilingScheme(),
  //是否需要数据解码
  needDecode: false,
  translucent: false,
  //房屋颜色
  // fillColor: '#005FC5',
  //房屋透明度
  // opacity: 1.0,
  //房屋图层
  filterLayerId: ['waikuo4m'],
  //房屋高度字段
  heightProperty: 'zcs',
  //高度缩放比例,即每层高3.2米
  heightScale: '3',
  showLevel: 13
}));
viewer.imageryLayers.add(zoneHouseLayer);

```

### 参数说明
HouseTileServiceImageryProvider
 
<table>
<tr>
    <td rowspan="10"> 参数说明：<br/>
    <td>url</td>
    <td width="40%">白膜房屋服务的地址</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>tileMatrixLabels</td>
    <td>ileMatrix中用于WMTS请求的标识符列表，每个TileMatrix级别一个</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>maximumLevel</td>
    <td>图像提供者支持的最大详细程度，如果没有限制，则未定义</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>tileWidth</td>
    <td>瓦片宽度</td>
	<td>可选参数</td>
	<td>缺省值:256</td>
</tr>
<tr>
    <td>tileHeight</td>
    <td>瓦片高度</td>
	<td>可选参数</td>
	<td>缺省值:256</td>
</tr>
<tr>
    <td>dataType</td>
    <td>数据类型</td>
	<td>可选参数</td>
	<td>缺省值:json</td>
</tr>
<tr>
    <td>tilingScheme</td>
    <td>切片方案，与TileMatrixSet中的切片组织相对应</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>needDecode</td>
    <td>是否需要数据解码</td>
	<td>可选参数</td>
	<td>缺省值:false</td>
</tr>
<tr>
    <td>translucent</td>
    <td>是否透明</td>
	<td>可选参数</td>
	<td>缺省值:false</td>
</tr>
<tr>
    <td>filterLayerId</td>
    <td>房屋过滤图层</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>heightProperty</td>
    <td>房屋高度图层</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>heightScale</td>
    <td>房屋缩放比例</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>showLevel</td>
    <td>显示层级</td>
	<td>可选参数</td>
	<td>缺省值:16</td>
</tr>
</table>

### 
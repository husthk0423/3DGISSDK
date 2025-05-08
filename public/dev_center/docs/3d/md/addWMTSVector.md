### 功能介绍

   加载天地图矢量图层。

### 关键代码
```javascript
var tiandituImageLayer = new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
  url: "http://t0.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
    "&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
    "&style=default&format=tiles&tk=609c9ee0f9ff33b13c7a92cb51b636f4",
  layer: "vec",
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

```

### 参数说明
WebMapTileServiceImageryProvider
 
<table>
<tr>
    <td rowspan="10"> 参数说明：<br/>
    <td>url</td>
    <td width="40%">矢量服务的地址</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>layer</td>
    <td>矢量服务请求的图层名称，天地图矢量图层名称为vec</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>style</td>
    <td>WMTS请求的样式名称</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>format</td>
    <td>要从服务器检索的图像的MIME类型</td>
	<td>可选参数</td>
	<td>缺省值:'image/jpeg'</td>
</tr>
<tr>
    <td>tileMatrixSetID</td>
    <td>用于WMTS请求的TileMatrixSet的标识符</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>subdomains</td>
    <td>URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域</td>
	<td>可选参数</td>
	<td>缺省值:4.0</td>
</tr>
<tr>
    <td>tilingScheme</td>
    <td>切片方案，与TileMatrixSet中的切片组织相对应</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
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
</table>

### 
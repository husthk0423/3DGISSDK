### 功能介绍

   加载3dtiels。

### 关键代码
```javascript
var tile3d = new Cesium.Cesium3DTileset({
  url: 'http://124.70.104.88:9069/tile/hb3dtiles/tileset.json',
  dynamicScreenSpaceError : true,
  dynamicScreenSpaceErrorDensity : 0.00278,
  dynamicScreenSpaceErrorFactor : 4.0,
  dynamicScreenSpaceErrorHeightFalloff: 0.25
});
viewer.scene.primitives.add(tile3d);
```

### 参数说明

<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>url</td>
    <td width="40%">3dtiels的地址</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>show</td>
    <td>是否显示模型</td>
	<td>可选参数</td>
	<td>缺省值:true</td>
</tr>
<tr>
    <td>modelMatrix</td>
    <td>一个4x4变换矩阵，用于变换根节点</td>
	<td>可选参数</td>
	<td>缺省值:Matrix4.IDENTITY</td>
</tr>
<tr>
    <td>dynamicScreenSpaceError</td>
    <td>优化选项。减少远离相机的平铺的屏幕空间误差</td>
	<td>可选参数</td>
	<td>缺省值:false</td>
</tr>
<tr>
    <td>dynamicScreenSpaceErrorDensity</td>
    <td>优化选项。用于调整动态屏幕空间误差</td>
	<td>可选参数</td>
	<td>缺省值:0.00278</td>
</tr>
<tr>
    <td>dynamicScreenSpaceErrorFactor</td>
    <td>优化选项。用于增加计算的动态屏幕空间误差的系数</td>
	<td>可选参数</td>
	<td>缺省值:4.0</td>
</tr>
<tr>
    <td>dynamicScreenSpaceErrorHeightFalloff</td>
    <td>优化选项。密度开始下降时瓦片高度的比值</td>
	<td>可选参数</td>
	<td>缺省值:0.25</td>
</tr>
</table>

### 
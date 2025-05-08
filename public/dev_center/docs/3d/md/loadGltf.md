### 功能介绍

   加载gltf或者glb数据，glb二进制的gltf文件，加载方式相同。

### 关键代码
```javascript
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(109.946956, 40.685478, 1000.0));
var model = new Cesium.Model.fromGltf({
  url: '../../data/Box-Color.gltf',
  scale: 1000,
  modelMatrix: modelMatrix
});
viewer.scene.primitives.add(model);
```

### 参数说明
Model是基于glTF的3D模型，使用Model.fromGltf创建一个外部glTF资产。
 
<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>url</td>
    <td width="40%">gltf的地址</td>
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
    <td>将模型从模型坐标转换为世界坐标的4x4变换矩阵</td>
	<td>可选参数</td>
	<td>缺省值:Matrix4.IDENTITY</td>
</tr>
<tr>
    <td>scale</td>
    <td>适用于该模型的统一比例尺</td>
	<td>可选参数</td>
	<td>缺省值:1</td>
</tr>
</table>

### 
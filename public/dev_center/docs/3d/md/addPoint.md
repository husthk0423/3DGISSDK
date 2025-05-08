### 功能介绍

   描述图形点。

### 关键代码
```javascript
const pointPrimitives = viewer.scene.primitives.add(
  new Cesium.PointPrimitiveCollection()
);
pointPrimitives.add({
  position: Cesium.Cartesian3.fromDegrees(109.947246, 40.619421),
  show: true, // default
  color: Cesium.Color.SKYBLUE, // default: WHITE
  pixelSize: 10, // default: 1
  outlineColor: Cesium.Color.YELLOW, // default: TRANSPARENT
  outlineWidth: 3, // default: 0
});
```

### 参数说明

<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>position</td>
    <td width="40%">点的位置</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>show</td>
    <td>是否显示点</td>
	  <td>可选参数</td>
	  <td>缺省值:true</td>
</tr>
<tr>
    <td>color</td>
    <td>点的颜色</td>
	  <td>可选参数</td>
	  <td>缺省值: Cesium.Color.WHITE</td>
</tr>
<tr>
    <td>pixelSize</td>
    <td>点的大小</td>
	  <td>可选参数</td>
	  <td>缺省值:1</td>
</tr>
<tr>
    <td>outlineColor</td>
    <td>点的轮廓颜色</td>
	  <td>可选参数</td>
	  <td>缺省值:Cesium.Color.BLACK</td>
</tr>
<tr>
    <td>outlineWidth</td>
    <td>点轮廓宽度</td>
	  <td>可选参数</td>
	  <td>缺省值:0</td>
</tr>
</table>

### 
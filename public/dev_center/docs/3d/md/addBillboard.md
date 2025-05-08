### 功能介绍

   描述在3D场景中定位的视口对齐图像。

### 关键代码
```javascript
const billboards = viewer.scene.primitives.add(
  new Cesium.BillboardCollection()
);

billboards.add({
  position: Cesium.Cartesian3.fromDegrees(110.010453, 40.590484),
  image: "../../img/marker-icon.png",
  scale: 1
});
```

### 参数说明

<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>position</td>
    <td width="40%">图标点的位置</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>image</td>
    <td>此图标点的图片地址</td>
	  <td>可选参数</td>
	  <td>缺省值:无</td>
</tr>
<tr>
    <td>scale</td>
    <td>缩放比例</td>
	  <td>可选参数</td>
	  <td>缺省值: 1</td>
</tr>
</table>

### 
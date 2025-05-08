### 功能介绍

   描述标签，可绘制在3D场景中与视口对齐的文本。

### 关键代码
```javascript
const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());
labels.add({
  position: Cesium.Cartesian3.fromDegrees(109.933355, 40.644138),
  text: '测试注记',
  showBackground: true,
  font: "14px monospace",
  horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  disableDepthTestDistance: Number.POSITIVE_INFINITY,
});
```

### 参数说明

<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>position</td>
    <td width="40%">标签的位置</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>text</td>
    <td>标签上显示的文字</td>
	  <td>可选参数</td>
	  <td>缺省值:无</td>
</tr>
<tr>
    <td>showBackground</td>
    <td>是否显示背景</td>
	  <td>可选参数</td>
	  <td>缺省值: false</td>
</tr>
<tr>
    <td>font</td>
    <td>绘制此标签的字体。使用与CSS'font'属性相同的语法指定字体</td>
	  <td>可选参数</td>
	  <td>缺省值:'30px sans-serif'</td>
</tr>
<tr>
    <td>horizontalOrigin</td>
    <td>标签的水平原点，确定标签是否绘制在其锚定位置的左侧，中心或右侧</td>
	  <td>可选参数</td>
	  <td>缺省值:Cesium.HorizontalOrigin.LEFT</td>
</tr>
<tr>
    <td>verticalOrigin</td>
    <td>标签的垂直原点，以确定标签是否为到其锚定位置的上方，下方或中心</td>
	  <td>可选参数</td>
	  <td>缺省值:Cesium.VerticalOrigin.BASELINE</td>
</tr>
<tr>
    <td>disableDepthTestDistance</td>
    <td>在与相机的距离深度处禁用深度测试</td>
	  <td>可选参数</td>
	  <td>缺省值:无</td>
</tr>
</table>

### 
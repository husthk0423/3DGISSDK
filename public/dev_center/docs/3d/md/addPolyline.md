### 功能介绍

   描述线。

### 关键代码
```javascript
var positions = [Cesium.Cartesian3.fromDegrees(109.830025, 40.70525), Cesium.Cartesian3.fromDegrees(109.808826,
  40.615042)];
viewer.scene.primitives.add(
  new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        width: 5.0,
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
        colorsPerVertex: true,
        colors: [Cesium.Color.YELLOW, Cesium.Color.BLUE],
      }),
    }),
    appearance: new Cesium.PolylineColorAppearance(),
  })
);
```

### 参数说明
GeometryInstance，几何实例化允许一个 Geometry 对象在多个对象中的位置不同的位置和独特的颜色
<table>
<tr>
    <td rowspan="2"> 参数说明：<br/>
    <td>geometry</td>
    <td width="40%">要实例化的几何</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>attributes</td>
    <td>每个实例的属性</td>
	  <td>可选参数</td>
	  <td>缺省值:无</td>
</tr>
</table>

###

PolylineGeometry，折线的一种描述，它被建模为一条线带;前两个位置定义一条线段，每一个附加位置从前一个位置定义一条线段
<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>positions</td>
    <td width="40%">线的坐标</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>width</td>
    <td>线的宽度</td>
	  <td>可选参数</td>
	  <td>缺省值:1</td>
</tr>
<tr>
    <td>vertexFormat</td>
    <td>要计算的顶点属性</td>
	  <td>可选参数</td>
	  <td>缺省值: Cesium.VertexFormat.DEFAULT</td>
</tr>
<tr>
    <td>colorsPerVertex</td>
    <td>用于确定颜色是在直线的每一段上是还是在顶点上插值</td>
	  <td>可选参数</td>
	  <td>缺省值:false</td>
</tr>
<tr>
    <td>colors</td>
    <td>定义逐顶点或逐段颜色的颜色数组</td>
	  <td>可选参数</td>
	  <td>缺省值:无</td>
</tr>
</table>

### 
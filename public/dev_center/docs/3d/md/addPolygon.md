### 功能介绍

   描述面。

### 关键代码
```javascript
var polygonHierarchy = {
  //外圈
  positions: Cesium.Cartesian3.fromDegreesArray([
    109.816731, 40.572307,
    109.816318, 40.50202,
    109.933878, 40.505952,
    109.915353, 40.574299
  ]),
  //内圈
  holes: [{
    positions: Cesium.Cartesian3.fromDegreesArray([
      109.851303, 40.555168,
      109.849823, 40.532635,
      109.882847, 40.53534,
      109.878832, 40.553284
    ]),
  }, ],
};
var extrudedPolygon = new Cesium.GeometryInstance({
  geometry: new Cesium.PolygonGeometry({
    polygonHierarchy: polygonHierarchy,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,,
  }),
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.fromRandom({
        alpha: 1.0
      })
    ),
  },
});

viewer.scene.primitives.add(
  new Cesium.Primitive({
    geometryInstances: [
      extrudedPolygon
    ],
    appearance: new Cesium.PerInstanceColorAppearance({
      translucent: false,
      closed: true,
    }),
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

PolygonGeometry，椭球上多边形的描述
<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>polygonHierarchy</td>
    <td width="40%">面的坐标，可以包含孔的多边形层次结构</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>vertexFormat</td>
    <td>要计算的顶点属性</td>
	  <td>可选参数</td>
	  <td>缺省值:Cesium.VertexFormat.DEFAULT</td>
</tr>
</table>

### 
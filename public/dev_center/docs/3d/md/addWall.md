### 功能介绍

   描述墙，墙是由一系列向下延伸到地面的点定义的。

### 关键代码
```javascript
var positions = Cesium.Cartesian3.fromDegreesArrayHeights([
  109.9193, 40.700628, 3000,
  109.986004, 40.714756, 3000,
  110.028085, 40.676558, 3000
]);

var wallInstance = new Cesium.GeometryInstance({
  geometry: new Cesium.WallGeometry({
    positions: positions,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
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
    geometryInstances: wallInstance,
    appearance: new Cesium.PerInstanceColorAppearance({
      translucent: false,
      closed: false,
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

WallGeometry，墙的描述
<table>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>positions</td>
    <td width="40%">线的坐标</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>vertexFormat</td>
    <td>要计算的顶点属性</td>
	  <td>可选参数</td>
	  <td>缺省值: Cesium.VertexFormat.DEFAULT</td>
</tr>
</table>

### 
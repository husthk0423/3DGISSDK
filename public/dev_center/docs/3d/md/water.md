### 功能介绍

   水面流动效果材质。

### 关键代码
```javascript
//水面范围几何图形
var polygonInstance = new Cesium.GeometryInstance({
  geometry: Cesium.PolygonGeometry.fromPositions({
    positions: Cesium.Cartesian3.fromDegreesArray([
      109.892039, 40.794153,
      109.843372, 40.732968,
      109.870553, 40.669694,
      109.918149, 40.650347,
      109.948475, 40.676591,
      109.975574, 40.72495,
      109.984578, 40.765651
    ]),
    height: 0,
    extrudedHeight: 0,
    vertexFormat: Cesium.VertexFormat.ALL
  })
});

viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances: [polygonInstance],
  undisplayable: true,
  appearance: new Cesium.EllipsoidSurfaceAppearance({
    material: Cesium.Material.fromType(Custom.FlowWaterMaterialType, {
      WaveImage: "../../img/water.jpg",
    })
  })
}));
```

### 参数说明
Custom.ReflexWaterMaterialType，sdk中描述流动水面的材质。
<table>
<tr>
    <td rowspan="6"> 参数说明：<br/>
    <td>WaveImage</td>
    <td width="40%">水面材质图片</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
</table>

### 

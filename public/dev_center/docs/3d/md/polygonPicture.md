### 功能介绍

   图片贴图效果材质。

### 关键代码
```javascript
var polygonHierarchy = {
  //外圈
  positions: Cesium.Cartesian3.fromDegreesArray([
    109.880759, 40.638397,
    109.88383, 40.56245,
    110.032453, 40.562432,
    110.004988, 40.641455
  ]),
};
var extrudedPolygon = new Cesium.GeometryInstance({
  geometry: new Cesium.PolygonGeometry({
    polygonHierarchy: polygonHierarchy,
  }),
});

viewer.scene.primitives.add(
  new Cesium.Primitive({
    geometryInstances: [
      extrudedPolygon
    ],
    appearance: new Cesium.MaterialAppearance({
      material: Cesium.Material.fromType('Image', {
        image: '../../img/grass.jpg'
      })
    })
  })
);
```

### 参数说明
Cesium中内置图片材质，设置Cesium.Material.fromType第一个参数为Image即可使用图片材质。
<table>
<tr>
    <td rowspan="6"> 参数说明：<br/>
    <td>image</td>
    <td width="40%">图片材质的地址</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>repeat</td>
    <td>图片平铺方式</td>
	  <td>可选参数</td>
	  <td>缺省值: Cesium.Cartesian2(1.0, 1.0)</td>
</tr>
</table>

### 

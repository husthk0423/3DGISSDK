### 功能介绍

   动态线材质贴图。

### 关键代码
```javascript
let linePositions = {
  positions: [
    Cesium.Cartesian3.fromDegrees(109.947146, 40.619721),
    Cesium.Cartesian3.fromDegrees(109.918875, 40.50633)
  ],
  width: 6.
};

let geometryInstance = new Cesium.GeometryInstance({
  geometry: new Cesium.PolylineGeometry(linePositions),
  attributes: {
    //线段长度,单位米
    length: new Cesium.GeometryInstanceAttribute({
      componentDatatype: Cesium.ComponentDatatype.FLOAT,
      componentsPerAttribute: 1,
      normalize: true,
      value: new Float32Array([500])
    }),
  }
});

let materialOption = {
  type: 'RunLineShader1', //动态线
  odColor: new Cesium.Color(1., 1., 0.1, 1.5), //线颜色
  rate: 0.4, //控制动态线显示比例,1.代表全部显示
  t_rate: 60, //控制动态线移动速度
  glint: true, //控制是否闪烁
};

var primitiveType = 'Primitive';
var line = Custom.LineGlow.createLines(geometryInstance, materialOption, primitiveType);
viewer.scene.primitives.add(line);
```

### 参数说明
Custom.LineGlow.createLines，sdk中创建动态线材质贴图的方法。
<table>
<tr>
    <td rowspan="3"> 参数说明：<br/>
    <td>geometryInstance</td>
    <td width="40%">动态线的几何描述</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>materialOption</td>
    <td>动态线的材质</td>
	  <td>必填参数</td>
	  <td>缺省值:无</td>
</tr>
<tr>
    <td>primitiveType</td>
    <td>动态线图元类型</td>
	  <td>可选参数</td>
	  <td>缺省值: 无</td>
</tr>
</table>

### 

materialOption，动态线的材质对象。
<table>
<tr>
    <td rowspan="5"> 参数说明：<br/>
    <td>type</td>
    <td width="40%">动态线的类型</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>odColor</td>
    <td>动态线的颜色</td>
	  <td>可选参数</td>
	  <td>缺省值:Cesium.Color.YELLOW</td>
</tr>
<tr>
    <td>rate</td>
    <td>动态线显示比例,1.0代表全部显示</td>
	  <td>可选参数</td>
	  <td>缺省值: 0.05</td>
</tr>
<tr>
    <td>t_rate</td>
    <td>控制动态线移动速度</td>
	  <td>可选参数</td>
	  <td>缺省值:120</td>
</tr>
<tr>
    <td>glint</td>
    <td>是否闪烁</td>
	  <td>可选参数</td>
	  <td>缺省值: false</td>
</tr>
</table>

### 
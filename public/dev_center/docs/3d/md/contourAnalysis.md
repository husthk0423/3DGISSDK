### 功能介绍

   等高线，此分析是CustomSDK中的功能。

### 关键代码
```javascript
// 开始分析
viewer.scene.globe.terrainExaggeration = 1;
var elevationPolygon;
var elevationAnalysis;
var elevationObj = {
  contourShow: true,
  minHeight: 1350,
  maxHeight: 1550
};
elevationAnalysis = new Custom.ElevationAnalysis(viewer, elevationObj);

elevationPolygon = elevationAnalysis.addPolygon(
  [
    Cesium.Cartesian3.fromDegrees(109.939141, 40.858458, 1352.52),
    Cesium.Cartesian3.fromDegrees(109.941109, 40.834592, 1456),
    Cesium.Cartesian3.fromDegrees(109.950963, 40.83296, 1478.4),
    Cesium.Cartesian3.fromDegrees(109.959622, 40.862644, 1387.84)
  ],
);

// 清除分析
elevationAnalysis.removePolygon(elevationPolygon);
```

### 参数说明

elevationObj，等高线分析对象。
<table>
<tr>
    <td rowspan="3"> 参数说明：<br/>
    <td>minHeight</td>
    <td width="40%">最低高度</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>maxHeight</td>
    <td width="40%">最高高度</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>contourShow</td>
    <td width="40%">是否显示等高线</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:true</td>
</tr>
</table>

### 
<table>
<tr>
    <td rowspan="3"> Methods：<br/>
    <td>addPolygon</td>
    <td width="15%">参数:多边形坐标数组</td>
    <td width="40%">添加等高线分析多边形</td>
</tr>
<tr>
    <td>removePolygon</td>
    <td width="15%">参数:等高线分析对象</td>
    <td width="40%">清除分析</td>
</tr>
</table>

###
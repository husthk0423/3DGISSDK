### 功能介绍

   坡向分析，此分析是CustomSDK中的功能。

### 关键代码
```javascript
var aspectPolygon;
var aspectAnalysis;
var toolTip;

if (!toolTip) {
  toolTip = new Custom.ToolTip(viewer);
  toolTip.start();
}

// 开始分析
viewer.scene.globe.terrainExaggeration = 1;
var aspectAnalysisObj = {
  minHeight: 1350,
  maxHeight: 1550
};
aspectAnalysis = new Custom.AspectAnalysis(viewer, aspectAnalysisObj);

aspectPolygon = aspectAnalysis.addPolygon(
  [
    Cesium.Cartesian3.fromDegrees(109.939141, 40.858458, 1352.52),
    Cesium.Cartesian3.fromDegrees(109.941109, 40.834592, 1456),
    Cesium.Cartesian3.fromDegrees(109.950963, 40.83296, 1478.4),
    Cesium.Cartesian3.fromDegrees(109.959622, 40.862644, 1387.84)
  ],
);

// 清除分析
aspectAnalysis.removePolygon(aspectPolygon);
```

### 参数说明
Custom.ToolTip，坡向分析的提示框。
<table>
<tr>
    <td rowspan="2"> Methods：<br/>
    <td>start</td>
    <td width="40%">开启提示框</td>
</tr>
</table>

###
aspectAnalysisObj，坡向分析对象。
<table>
<tr>
    <td rowspan="2"> 参数说明：<br/>
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
</table>

### 
<table>
<tr>
    <td rowspan="3"> Methods：<br/>
    <td>addPolygon</td>
    <td width="15%">参数:多边形坐标数组</td>
    <td width="40%">添加坡向分析多边形</td>
</tr>
<tr>
    <td>removePolygon</td>
    <td width="15%">参数:坡向分析对象</td>
    <td width="40%">清除分析</td>
</tr>
</table>

###
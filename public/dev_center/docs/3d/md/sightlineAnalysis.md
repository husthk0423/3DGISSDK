### 功能介绍

   通视分析，此分析是CustomSDK中的功能。

### 关键代码
```javascript
// 开始通视分析
var sightLineAnalysis = new Custom.SightLineAnalysis(viewer);

// 移除通视分析
sightLineAnalysis.clear();
```

### 参数说明

elevationObj，等高线分析对象。
<table>
<tr>
    <td rowspan="3"> 参数说明：<br/>
    <td>visibleColor</td>
    <td width="40%">可视区域颜色</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:Cesium.Color(0, 1, 0, 1)</td>
</tr>
<tr>
    <td>hiddenColor</td>
    <td width="40%">不可视区域颜色</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:Cesium.Color(1, 0, 0, 1)</td>
</tr>
<tr>
    <td>depthFailColor</td>
    <td width="40%">当线位于地形或被遮挡时的区域颜色</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
</table>

### 
<table>
<tr>
    <td rowspan="3"> Methods：<br/>
    <td>clear</td>
    <td width="40%">清除分析</td>
</tr>
</table>

###
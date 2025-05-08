### 功能介绍

   可视域分析，此分析是CustomSDK中的功能。

### 关键代码
```javascript
// 开始分析
var viewObj = {
  showFrustum: true,
  enabled: true,
  horizontalAngle: 120,
  verticalAngle: 90
};
var viewShed = new Custom.ViewShedAnalysis(viewer, viewObj);

// 移除分析
viewShed.remove();
```

### 参数说明

viewObj，可视域分析对象。
<table>
<tr>
    <td rowspan="8"> 参数说明：<br/>
    <td>horizontalAngle</td>
    <td width="40%">水平张角</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:120</td>
</tr>
<tr>
    <td>verticalAngle</td>
    <td width="40%">垂直张角</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:90</td>
</tr>
<tr>
    <td>visibleAreaColor</td>
    <td width="40%">可见区域颜色</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:Cesium.Color(0, 1, 0)</td>
</tr>
<tr>
    <td>hiddenAreaColor</td>
    <td width="40%">不可见区域颜色</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:Cesium.Color(0, 1, 0)</td>
</tr>
<tr>
    <td>offsetHeight</td>
    <td width="40%">高度偏移值</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:1.5</td>
</tr>
<tr>
    <td>showFrustum</td>
    <td width="40%">是否显示视椎体</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:true</td>
</tr>
<tr>
    <td>showFrustum</td>
    <td width="40%">是否可见enabled</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:true</td>
</tr>
<tr>
    <td>maximumDistance</td>
    <td width="40%">最大距离</td>
	  <td width="15%">可选参数</td>
	  <td width="15%">缺省值:5000</td>
</tr>
</table>

### 
<table>
<tr>
    <td rowspan="3"> Methods：<br/>
    <td>remove</td>
    <td width="40%">清除分析</td>
</tr>
</table>

###
### 功能介绍

   鼠标事件，需要注意在功能完成之后要销毁事件，避免消耗性能。

### 关键代码
```javascript
// 绑定事件
var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function leftClick(movement) {
  alert('鼠标左键点击了');
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

handler.setInputAction(function leftClick(movement) {
  alert('鼠标右键点击了');
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

handler.setInputAction(function leftClick(movement) {
  alert('鼠标中键点击了');
}, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);

handler.setInputAction(function leftClick(movement) {
  console.log('鼠标移动了');
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function leftClick(movement) {
  alert('鼠标滚动了');
}, Cesium.ScreenSpaceEventType.WHEEL);

// 解绑事件
handler.destroy();
handler = null;
```

### 参数说明

<table>
<tr>
    <td rowspan="5"> 参数说明：<br/>
    <td>Cesium.ScreenSpaceEventType.LEFT_CLICK</td>
    <td width="40%">鼠标左键事件</td>
	  <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>Cesium.ScreenSpaceEventType.RIGHT_CLICK</td>
    <td>鼠标右键事件</td>
    <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>Cesium.ScreenSpaceEventType.MIDDLE_CLICK</td>
    <td>鼠标中键事件</td>
    <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>Cesium.ScreenSpaceEventType.MOUSE_MOVE</td>
    <td>鼠标移动事件</td>
    <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>Cesium.ScreenSpaceEventType.WHEEL</td>
    <td>鼠标滚动事件</td>
    <td width="15%">必填参数</td>
	  <td width="15%">缺省值:无</td>
</tr>
</table>

### 
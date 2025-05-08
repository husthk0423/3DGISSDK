- **服务介绍**

   图元要素拾取服务依据前端请求输入地图层级和经纬度，提供图元要素的在线拾取功能。

- **参数说明**

<table>
<tr>
    <td>服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{styleId}/pickup?level={level}&lon={lon}&lat={lat}</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">图元要素拾取服务依据前端请求输入地图层级和经纬度，提供图元要素的在线拾取功能。</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
</tr>
<tr>
    <td rowspan="7">参数说明<br/>
    <td>参数名</td>
    <td>描述</td>
    <td>是否必要</td>
</tr>
<tr>
    <td>serviceName</td>
    <td>服务名称</td>
    <td>是</td>
</tr>
<tr>
    <td>styleId</td>
    <td>矢量瓦片电子地图样式id，可以为同一个服务提供多个样式</td>
    <td>是</td>
</tr>
<tr>
    <td>level</td>
    <td>层级</td>
    <td>是</td>
</tr>
<tr>
    <td>lon</td>
    <td>经度</td>
    <td>是</td>
</tr>
<tr>
    <td>lat</td>
    <td>纬度</td>
    <td>是</td>
</tr>
<tr>
    <td>includelabel</td>
    <td>是否包含注记  true/false 默认为false</td>
    <td>否</td>
</tr>
<tr>
    <td width="20%">返回值类型<br/>
    <td colspan="3">json</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">
        {<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;"省级行政区划面": {<br/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"18": {<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"gid": 18,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"省代码": 420000,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"省": "湖北省",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"类型": "省"<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}</td>
</tr>
<tr>
    <td>请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/默认/pickup?level=8&lon=112.8955078125&lat=30.95464595265627">http://10.1.102.52:8021/mapserver/全国行政区划/默认/pickup?level=8&lon=112.8955078125&lat=30.95464595265627</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3"></td>
</tr>
</table>




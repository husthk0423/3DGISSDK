- **服务介绍**

  导出指定服务、样式、范围的地图图片

- **参数说明**

<table>
<tr>
    <td>服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/vmap/{serviceName}/export</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">导出指定服务、样式、范围的地图图片</td>
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
    <td>瓦片层级</td>
    <td>是</td>
</tr>
<tr>
    <td>bbox</td>
    <td>导出范围，minx,miny,maxx,maxy,如119,29,121,30</td>
    <td>是</td>
</tr>
<tr>
    <td>width</td>
    <td>返回图片宽度，单位：px像素</td>
    <td>是</td>
</tr>
<tr>
    <td>height</td>
    <td>返回图片高度，单位：px像素</td>
    <td>是</td>
</tr>
<tr>
    <td>withlabel</td>
    <td>是否包括注记，0/1，默认为0（不包括）</td>
    <td>否</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">返回json格式数据</td>
</tr>
<tr>
    <td>请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/vmap/全国行政区划/export?styleId=默认&level=8&bbox=119,29,121,30&width=128&height=64&withlabel=1">http://10.1.102.52:8021/mapserver/vmap/全国行政区划/export?styleId=默认&level=8&bbox=119,29,121,30&width=128&height=64&withlabel=1</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3">导出范围bbox不能过大或过小，导出的图片最大长、宽不能超过20000像素，最小不能小于1像素</td>
</tr>
</table>




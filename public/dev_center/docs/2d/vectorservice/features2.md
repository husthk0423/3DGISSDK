- **服务介绍**

   查询指定服务、指定图层的原始数据(区别于切片数据)的元数据信息

- **参数说明**

<table>
<tr>
    <td rowspan="2">服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/getInfo.json</td>
</tr>
<tr>
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/level/getInfo.json</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">查询指定服务、指定图层的原始数据(区别于切片数据)的元数据信息</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
</tr>
<tr>
    <td rowspan="4">参数说明<br/>
    <td>参数名</td>
    <td>描述</td>
    <td>是否必要</td>
</tr>
<tr>
    <td>serviceName</td>
    <td>服务名称，如浙江矢量电子地图服务名称为zjvmap</td>
    <td>是</td>
</tr>
<tr>
    <td>layerName</td>
    <td>图层id</td>
    <td>是</td>
</tr>
<tr>
    <td>level</td>
    <td>瓦片层级</td>
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
&nbsp;&nbsp;&nbsp;&nbsp;"idType": "integer",//主键类型<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"id": "gid", //主键字段名<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"spatial": "geom", //空间字段名<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"fields": [<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "gid", //字段名<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type": "Integer" //字段类型<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"name": "省代码","type": "Long"},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"name": "省","type": "String"},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"name": "类型","type": "String"},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"name": "geom","type": "Geometry"}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;]<br/>
}</td>
</tr>
<tr>
    <td rowspan="2">请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/getInfo.json">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/getInfo.json</a></td>
</tr>
<tr>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/10/getInfo.json">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/10/getInfo.json</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3">此接口为数据库查询接口，因此要求服务必须包含原始切片信息，用于切片的原始数据库能正常访问</td>
</tr>
</table>




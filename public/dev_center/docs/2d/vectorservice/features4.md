- **服务介绍**

  查询指定服务、指定图层的原始数据(区别于切片数据)的元数据信息,参数与元数据查询接口(2.11)一致

- **参数说明**

<table>
<tr>
    <td>服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/count</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">查询指定服务、指定图层的原始数据(区别于切片数据)的元数据信息,参数与元数据查询接口(2.11)一致</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
</tr>
<tr>
    <td rowspan="3">参数说明<br/>
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
    <td>layerName</td>
    <td>图层id</td>
    <td>是</td>
</tr>
<tr>
    <td width="20%">返回值类型<br/>
    <td colspan="3">json</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">{"count": 35}</td>
</tr>
<tr>
    <td>请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/count">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/count</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3">此接口为数据库查询接口，因此要求服务必须包含原始切片信息，用于切片的原始数据库能正常访问</td>
</tr>
</table>




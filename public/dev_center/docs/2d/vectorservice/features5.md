- **服务介绍**

  查询指定服务、指定图层的数据

- **参数说明**

<table>
<tr>
    <td rowspan="4">服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/{ids}.json</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/query</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/{level}/{ids}.json</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/{serviceName}/{layerName}/{level}/query</td>
</tr>
<tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">查询指定服务、指定图层的数据</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET，POST</td>
</tr>
<tr>
    <td rowspan="14">参数说明<br/>
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
    <td>level</td>
    <td>瓦片层级</td>
    <td>否</td>
</tr>
<tr>
    <td>ids</td>
    <td>要素id，多个id以英文逗号间隔，如123,124</td>
    <td>否</td>
</tr>
<tr>
    <td>filter</td>
    <td>过滤条件，如Q_code_S_EQ=1001</td>
    <td>否</td>
</tr>
<tr>
    <td>sqlFilter</td>
    <td>sqlFilter会覆盖filter</td>
    <td>否</td>
</tr>
<tr>
    <td>spatialFilter</td>
    <td>空间过滤条件，格式为wkt字符串</td>
    <td>否</td>
</tr>
<tr>
    <td>fields</td>
    <td>需要返回的字段，字段以英文逗号间隔，如fid,name,code</td>
    <td>否</td>
</tr>
<tr>
    <td>withGeometry</td>
    <td>是否返回空间字段，true/false，默认为false，当已经指定fields参数时，此参数无效</td>
    <td>否</td>
</tr>
<tr>
    <td>withExtent</td>
    <td>是否返回四至范围，true/false，默认为false，当已经指定fields参数并且不包含空间字段时，此参数无效</td>
    <td>否</td>
</tr>
<tr>
    <td>withCenter</td>
    <td>是否返回中心点坐标，true/false，默认为false，当已经指定fields参数并且不包含空间字段时，此参数无效</td>
    <td>否</td>
</tr>
<tr>
    <td>start</td>
    <td>起始游标</td>
    <td>否</td>
</tr>
<tr>
    <td>limit</td>
    <td>返回数据的最大条目数 默认为10</td>
    <td>否</td>
</tr>
<tr>
    <td width="20%">返回值类型<br/>
    <td colspan="3">json</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">[{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"省": "北京市",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"gid": 1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"@extent": "POLYGON ((115.41682666500023 39.44208675000001, 115.41682666500023 41.058964250000066, 117.50825136000026 41.058964250000066, 117.50825136000026 39.44208675000001, 115.41682666500023 39.44208675000001))",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"@center": "POINT (116.41228425837818 40.18554310283736)",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"省代码": 110000,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"geom": "POLYGON ((116.67527401500018 41.0401020050001, 116.67616419500011 41.040061720000054, …, 116.67527401500018 41.0401020050001))",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"类型": "直辖市"}]
    </td>
</tr>
<tr>
    <td rowspan="3">请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/query?withGeometry=true&withExtent=true&withCenter=true&limit=1" target="_blank">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/query?withGeometry=true&withExtent=true&withCenter=true&limit=1</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/1,2.json" target ="_blank">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/1,2.json</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/8/query" target ="_blank">http://10.1.102.52:8021/mapserver/全国行政区划/省级行政区划面/8/query</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3">此接口为数据库查询接口，因此要求服务必须包含原始切片信息，用于切片的原始数据库能正常访问</td>
</tr>
</table>






- **服务介绍**

  WMTS（Web Map Tile Service）地图服务提供满足OGC标准的restful注记服务获取接口，包括服务元数据、瓦片和要素信息。

- **参数说明**

<table>
<tr>
    <td rowspan="3">服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/{type}/WMTS/{version}/{serviceName}/{style}?Request={Request}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/{type}/WMTS/{version}/{serviceName}/{style}/{Request}/{TileMatrix}/{TileRow}/{TileCol}</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/{type}/WMTS/{version}/{serviceName}/{style}/{Request}</td>
</tr>
<tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">WMTS（Web Map Tile Service）地图服务提供满足OGC标准的restful注记服务获取接口，包括服务元数据、瓦片和要素信息。</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
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
    <td>styleId</td>
    <td>矢量瓦片电子地图样式id，可以为同一个服务提供多个样式</td>
    <td>是</td>
</tr>
<tr>
    <td>type</td>
    <td>服务类型，底图/注记，layer/label/all</td>
    <td>是</td>
</tr>
<tr>
    <td>version</td>
    <td>1.0</td>
    <td>是</td>
</tr>
<tr>
    <td>Request</td>
    <td>getCapabilities/getTile</td>
    <td>是</td>
</tr>
<tr>
    <td>TileMatrix</td>
    <td>层级</td>
    <td>否</td>
</tr>
<tr>
    <td>TileRow</td>
    <td>瓦片行号</td>
    <td>否</td>
</tr>
<tr>
    <td>TileCol</td>
    <td>瓦片列号</td>
    <td>否</td>
</tr>
<tr>
    <td>tilesize</td>
    <td>瓦片大小  256/512，默认为256</td>
    <td>否</td>
</tr>
<tr>
    <td>ratio</td>
    <td>是否高清，其中：1为非高清版本，2为高清版本，默认为1</td>
    <td>否</td>
</tr>
<tr>
    <td>control</td>
    <td>图层、要素的过滤、高亮设置，详情参见3.1</td>
    <td>否</td>
</tr>
<tr>
    <td>controlId</td>
    <td>图层、要素的过滤、高亮设置，用于解决control过长导致请求url超长问题，若与control同时设置，以controlId为准</td>
    <td>否</td>
</tr>
<tr>
    <td>mask</td>
    <td>要素裁剪设置，详情参见3.2</td>
    <td>否</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3"> Xml/Png,Request为getCapabilities，返回xml，getTile返回png</td>
</tr>
<tr>
    <td rowspan="4">请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/layer/WMTS/1.0/全国行政区划/默认/getTile/8/42/210" target="_blank">http://10.1.102.52:8021/mapserver/layer/WMTS/1.0/全国行政区划/默认/getTile/8/42/210</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/layer/WMTS/1.0/全国行政区划/默认/getCapabilities" target ="_blank">http://10.1.102.52:8021/mapserver/layer/WMTS/1.0/全国行政区划/默认/getCapabilities</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/label/WMTS/1.0/全国行政区划/默认/getTile/8/42/210" target ="_blank">http://10.1.102.52:8021/mapserver/label/WMTS/1.0/全国行政区划/默认/getTile/8/42/210</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/label/WMTS/1.0/全国行政区划/默认/getCapabilities" target ="_blank">http://10.1.102.52:8021/mapserver/label/WMTS/1.0/全国行政区划/默认/getCapabilities</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3"></td>
</tr>
</table>





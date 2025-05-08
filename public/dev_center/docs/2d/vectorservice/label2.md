- **服务介绍**

  前端注记数据服务接口根据应用终端发送的http协议请求，将对应地图的注记数据返回给用户终端的服务；前端注记数据服务支持256和512的标准格网请求。

- **参数说明**

<table>
<tr>
    <td rowspan="2">服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/label/{serviceName}/getData?x={x}&y={y}&l={l}&styleId={styleId}&ratio={ratio}&tilesize={tilesize}</td>
</tr>
<tr>  
    <td colspan="3">http://ip:port/mapserver/label/{serviceName}/{styleId}/getData/{l}/{y}/{x}/{tilesize}/{ratio}?control={control}&controlId={controlId}&mask={mask}</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">前端注记数据服务接口根据应用终端发送的http协议请求，将对应地图的注记数据返回给用户终端的服务；前端注记数据服务支持256和512的标准格网请求。</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
</tr>
<tr>
    <td rowspan="11">参数说明<br/>
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
    <td>x</td>
    <td>瓦片行号</td>
    <td>是</td>
</tr>
<tr>
    <td>y</td>
    <td>瓦片列号</td>
    <td>是</td>
</tr>
<tr>
    <td>l</td>
    <td>瓦片层级</td>
    <td>是</td>
</tr>
<tr>
    <td>tilesize</td>
    <td>瓦片大小  256/512，默认为512</td>
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
    <td width="20%">返回值类型<br/>
    <td colspan="3"> 二进制数据</td>
</tr>
<tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3"> 需使用配套前端的二三维SDK解析显示</td>
</tr>
<tr>
    <td rowspan="2">请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/label/全国行政区划/getData?x=105&y=21&l=8&styleId=默认&tilesize=512" target="_blank">http://10.1.102.52:8021/mapserver/label/全国行政区划/getData?x=105&y=21&l=8&styleId=默认&tilesize=512</a></td>
</tr>
<tr>  
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/label/全国行政区划/默认/getData/8/21/105/512/1" target ="_blank">http://10.1.102.52:8021/mapserver/label/全国行政区划/默认/getData/8/21/105/512/1</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3"></td>
</tr>
</table>



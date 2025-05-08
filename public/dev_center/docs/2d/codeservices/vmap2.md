- [**服务介绍**](/Summary)
 -  -  - 
   前端底图数据服务接口根据应用终端发送的http协议请求，将对应地图的底图数据返回给用户终端的服务；
   前端底图数据服务支持256和512的标准格网请求。
   
- [**参数说明**](/Summary)
 -  -  - 
 
<table>
<tr>
    <td width="20%"> 服务描述：<br/>
    <td colspan="2"> 前端底图数据服务接口根据应用终端发送的http协议请求，将对应地图的底图数据返回给用户终端的服务；前端底图数据服务支持256和512的标准格网请求。</td>
</tr>
<tr>
    <td rowspan="2"> 服务地址：<br/>
    <td> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/data/zjvmap/getData?x={x}&y={y}&l={z}&styleId={style}&ratio={r}&titlesize={titlesize} </td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/data/zjvmap/getData?x={x}&y={y}&l={z}&styleId={style}&ratio={r}&titlesize={titlesize}</td>
</tr>

<tr>
    <td rowspan="6"> 参数说明：<br/>
    <td>•serverName</td>
    <td>服务名称:如浙江矢量电子地图服务名称为zjvmap；</td>
</tr>
<tr>
    <td>•x</td>
    <td>瓦片行号；</td>
</tr>
<tr>
    <td>• y</td>
    <td>瓦片列号；</td>
</tr>
<tr>
    <td>•styleId</td>
    <td>服务样式；</td>
</tr>
<tr>
    <td>•ratio</td>
    <td>渲染模式：ratio：是否高清，其中：1为非高清版本，2为高清版本；</td>
</tr>
<tr>
    <td>•tilesize</td>
    <td>格网类型：支持512和256,默认为512；</td>
</tr>
<tr>
    <td width="20%"> 返回值说明：<br/>
    <td colspan="2"> 返回json格式数据</td>
</tr>
<tr>
    <td rowspan="2"> 请求示例：<br/>
    <td> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/data/zjvmap/getData?x=853&y=172&l=11&styleId=tdt_biaozhunyangshi_2017&ratio=1</td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/data/zjvmap/getData?x=853&y=172&l=11&styleId=tdt_biaozhunyangshi_2017&ratio=1</td>
</tr>
<tr>
    <td width="20%"> 备注说明：<br/>
    <td colspan="2"> 无</td>
</tr>
</table>








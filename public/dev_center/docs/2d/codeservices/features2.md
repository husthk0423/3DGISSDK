- [**服务介绍**](/Summary)
 -  -  - 
   图元要素高亮服务依据前端请求输入的坐标点和过滤条件对所对应的图元要素进行高亮显示;支持用户自定义设置高亮颜色、透明度等参数。

- [**参数说明**](/Summary)
 -  -  - 
 
<table>
<tr>
    <td width="30%"> 服务描述：<br/>
    <td colspan="2"> 图元要素拾取服务依据前端请求输入的坐标点和过滤条件提供图元要素的在线拾取功能。</td>
</tr>
<tr>
    <td rowspan="2"> 服务地址：<br/>
    <td> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/vmap/{serverName}/getMAP?x={x}&y={y}&l={l}&styleId={styleId}&control={control}</td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/vmap/{serverName}/getMAP?x={x}&y={y}&l={l}&styleId={styleId}&control={control}</td>
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
    <td>• l</td>
    <td>地图层级；</td>
</tr>
<tr>
    <td>•styleId</td>
    <td>服务样式；</td>
</tr>
<tr>
    <td>•control</td>
    <td>过滤参数；</td>
</tr>
<tr>
    <td width="30%"> 返回值说明：<br/>
    <td colspan="2"> 返回地图瓦片png；</td>
</tr>
<tr>
    <td rowspan="2"> 请求示例：<br/>
    <td> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/vmap/zjvmap/getMAP?x=109287&y=21750&l=17&styleId=tdt_biaozhunyangshi_2017&control={otherDisplay:false,layers:[{id:"居民地_面状居民地",color:{color:"red",opacity:0.8}}]}</td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/vmap/zjvmap/getMAP?x=109287&y=21750&l=17&styleId=tdt_biaozhunyangshi_2017&control={otherDisplay:false,layers:[{id:"居民地_面状居民地",color:{color:"red",opacity:0.8}}]}</td>
</tr>
<tr>
    <td width="30%"> 备注说明：<br/>
    <td colspan="2"> 无</td>
</tr>
</table>








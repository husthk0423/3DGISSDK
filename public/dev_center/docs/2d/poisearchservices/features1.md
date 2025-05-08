- **服务介绍**
 -  -  - 
   图元要素拾取服务依据前端请求输入的坐标点和过滤条件提供图元要素的在线拾取功能。

- **参数说明**
 -  -  - 
 
<table>
<tr>
    <td width="25%"> 服务描述：<br/>
    <td colspan="2"> 图元要素拾取服务依据前端请求输入的坐标点和过滤条件提供图元要素的在线拾取功能。        </td>
</tr>
<tr>
    <td rowspan="2"> 服务地址：<br/>
    <td> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/pickup/{serverName}/getData?x={x}&y={y}&l={l}&pixelX={pixelX}&pixelY={pixelY}&styleId={styleId}&ratio={r}&control={control} </td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/pickup/{serverName}/getData?x={x}&y={y}&l={l}&pixelX={pixelX}&pixelY={pixelY}&styleId={styleId}&ratio={r}&control={control}</td>
</tr>

<tr>
    <td rowspan="8"> 参数说明：<br/>
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
    <td>• pixelX</td>
    <td>瓦片内屏幕坐标，x坐标；</td>
</tr>
<tr>
    <td>• pixelY</td>
    <td>瓦片内屏幕坐标，y坐标；</td>
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
    <td width="40%"> 返回值说明：<br/>
    <td colspan="2"> 返回json格式数据；
	示例：{"居民地_面状居民地":{"36419085":{"objectid":36419085,"fcode":"3103011500","floor":1,"fscale":16}}}</td>
</tr>
<tr>
    <td rowspan="4"> 请求示例：<br/>
    <td rowspan="2"> •http地址</td>
    <td>http://ditu.zjzwfw.gov.cn/mapserver/pickup/zjvmap/getData?x=437197.60379340395&y=86925.22296006992&l=20&pixelX=309.1422228217125&pixelY=114.15555579960346&styleId=tdt_biaozhunyangshi_2017&control={cmdAll:false,layers:[{id:"面状水系",filters:{Q_fcode_S_EQ:2101010500},idFilter:"818009",display:false}],order:[]} </td>
</tr>
<tr>
    <td> http://118.178.118.176:6627/mapserver/vmap/zjvmap/getMAP?x=214&y=42&l=9&styleId=tdt_biaozhunyangshi_2017&ratio=2&tilesize=512&clientVersion=jssdk_bate@1%20openLayers%201.3.1&control={"otherDisplay":false,"layers":[{"id":"水系_水系_面状水系","filterStr":"Q_objectid_S_EQ=772570 or Q_objectid_S_EQ=740586","display":true,"color":{"color":"red","opacity":0.6}}],"order":[]}<br/>
</tr>
<tr>  
    <td rowspan="2">•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/pickup/zjvmap/getData?x=437197.60379340395&y=86925.22296006992&l=20&pixelX=309.1422228217125&pixelY=114.15555579960346&styleId=tdt_biaozhunyangshi_2017&control={cmdAll:false,layers:[{id:"面状水系",filters:{Q_fcode_S_EQ:2101010500},idFilter:"818009",display:false}],order:[]}</td>
</tr>
<tr>
    <td> https://118.178.118.176:6627/mapserver/vmap/zjvmap/getMAP?x=214&y=42&l=9&styleId=tdt_biaozhunyangshi_2017&ratio=2&tilesize=512&clientVersion=jssdk_bate@1%20openLayers%201.3.1&control={"otherDisplay":false,"layers":[{"id":"水系_水系_面状水系","filterStr":"Q_objectid_S_EQ=772570 or Q_objectid_S_EQ=740586","display":true,"color":{"color":"red","opacity":0.6}}],"order":[]}<br/>
</tr>
<tr>
    <td width="40%"> 备注说明：<br/>
    <td colspan="2"> 无</td>
</tr>
</table>








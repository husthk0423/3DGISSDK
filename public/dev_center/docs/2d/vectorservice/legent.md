- **服务介绍**

   动态图例获取服务是结合当前服务层级和渲染样式，前端动态获取地图图例基本信息的服务接口。
   
- **参数说明**

 
<table>
<tr>
    <td width="30%"> 服务描述：<br/>
    <td colspan="2"> 动态图例获取服务结合当前服务层级和渲染样式，提供前端动态获取地图图例基本信息的服务。</td>
</tr>
<tr>
    <td rowspan="2"> 服务地址：<br/>
    <td> •http地址</td>
    <td> http://ditu.zjzwfw.gov.cn/mapserver/styleInfo/{severName}/{styleId}/{level}/legend.json </td>
</tr>
<tr>  
    <td>•https地址</td>
    <td> https://ditu.zjzwfw.gov.cn/mapserver/styleInfo/{severName}/{styleId}/{level}/legend.json</td>
	</tr>

<tr>
    <td rowspan="3"> 参数说明：<br/>
    <td>•serverName</td>
    <td>服务名称:如浙江矢量电子地图服务名称为zjvmap；</td>
</tr>
<tr>
    <td>•styleId</td>
    <td>服务样式；</td>
</tr>
<tr>
    <td>•l</td>
    <td>地图层级</td>
</tr>
<tr>
    <td width="30%"> 返回值说明：<br/>
    <td colspan="2"> 返回json格式数据</td>
</tr>
<tr>
    <td rowspan="2"> 请求示例：<br/>
    <td> •http地址</td>
    <td> <a href ="http://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/biaozhunyangshi_2017/11/legend.json" target ="_blank">http://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/biaozhunyangshi_2017/11/legend.json</a></td>
</tr>
<tr>  
    <td>•https地址</td>
    <td><a href ="https://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/biaozhunyangshi_2017/11/legend.json" target ="_blank">https://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/biaozhunyangshi_2017/11/legend.json</a></td>
</tr>
<tr>
    <td width="30%"> 备注说明：<br/>
    <td colspan="2"> 限单图层专题服务、全注记服务，不支持多图层电子地图服务</td>
</tr>
</table>








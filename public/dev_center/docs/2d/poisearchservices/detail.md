- **服务介绍**

   根据ID获取文档详情服务是通过POI ID，查询某个POI详情。

- **参数说明**

 
<table>
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 根据ID获取文档详情服务是通过POI ID，查询某个POI详情。        </td>
</tr>
<tr>
    <td > 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3">http://ditu.zjzwfw.gov.cn/ime-server/rest/{servicename}/place/search??parameters <br/>
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td rowspan="4"> 参数说明：<br/>
    <td>•serverName</td>
    <td width="40%">发布的服务名称，必须为英文；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•id</td>
    <td>POI ID，如果为空，查询所有；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•format</td>
    <td>结果返回格式，json或xml；</td>
	<td>可选参数</td>
	<td>缺省值:json</td>
</tr>
<tr>
    <td>•callback</td>
    <td>fomat为json时，指定callback返回jsonp；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td> 返回值说明：<br/>
    <td>• status</td>
    <td colspan="3">返回值为false或ok，false 表示请求失败；ok 表示请求成功。</td>
</tr>
<tr>
    <td > 请求示例：<br/>
    <td > •http地址</td>
    <td colspan="3" ><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/search?id=placesearch-new_DM_POI_71676&format=json&callback=callbackfunction" target = "_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/search?id=placesearch-new_DM_POI_71676&format=json&callback=callbackfunction</a></td>
</tr>
<tr>
    <td > 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








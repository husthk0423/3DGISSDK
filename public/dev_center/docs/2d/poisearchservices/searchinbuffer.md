- **服务介绍**
 
   基于关键字查询做缓冲查询是在用户传入经纬度坐标点附近，在设定的缓冲区半径范围内，按照关键字搜索。

- **参数说明**

 
<table>
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">    基于关键字查询做缓冲查询是在用户传入经纬度坐标点附近，在设定的缓冲区半径范围内，按照关键字搜索。        </td>
</tr>
<tr>
    <td > 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3">http://ditu.zjzwfw.gov.cn/ime-server/rest/{servicename}/place/search?parameters <br/>
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。</td>
	</tr>

<tr>
    <td rowspan="6"> 参数说明：<br/>
  <td>•serverName</td>
    <td width="40%">发布的服务名称，必须为英文；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
<tr>	
    <td>•sq_type</td>
    <td>sq_type固定为buffer；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•location</td>
    <td>中心点坐标，逗号分隔，(y,x)；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•radius</td>
    <td>缓冲半径，单位为米；</td>
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
    <td>format为json时，指定callback返回jsonp；</td>
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
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/search?q=学校&page_num=0&page_size=200&sq_type=buffer&location=30.304823513,120.156791525&radius=1000&format=json&callback=callbackfunction" target = "_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/search?q=学校&page_num=0&page_size=200&sq_type=buffer&location=30.304823513,120.156791525&radius=1000&format=json&callback=callbackfunction/a></td>
</tr>
<tr>
    <td> 备注说明：<br/>
    <td  colspan="5"> 无</td>
</tr>
</table>








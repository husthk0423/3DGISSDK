- **服务介绍**

   最近的POI查询是根据输入的经纬度坐标点查找距离该点最近的POI点。

- **参数说明**

 
<table>
<tr>
    <td width="25%"> 服务描述：<br/>
    <td colspan="5">    最近的POI查询是根据输入的经纬度坐标点查找距离该点最近的POI点。       </td>
</tr>
<tr>
    <td > 服务地址：<br/>
    <td width="25%"> •http地址</td>
    <td colspan="3">http://ditu.zjzwfw.gov.cn/ime-server/rest/{servicename}/place/nearest??parameters <br/>
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td rowspan="7"> 参数说明：<br/>
    <td>•serverName</td>
    <td width="30%">发布的服务名称，必须为英文；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•location</td>
    <td>中心点坐标，逗号分隔，(y,x)；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•province</td>
    <td>poi所在省编码；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•city</td>
    <td>poi所在市编码；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>•county</td>
    <td>poi所在区县编码；</td>
	<td>可选参数</td>
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
    <td colspan="3"><a href = "http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/nearest?location=30.2274997850001,120.111649704&format=json&callback=callbackfunction" target ="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/placesearch-new/place/nearest?location=30.2274997850001,120.111649704&format=json&callback=callbackfunction</a></td>
</tr>
<tr>
    <td width="25%"> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>






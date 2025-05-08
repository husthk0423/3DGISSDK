- **服务介绍**

    获取批量编码结果是将匹配源文件中的地名信息与经纬度坐标信息转换后的结果返回前端。 
    
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">    获取批量编码结果是将匹配源文件中的地名信息与经纬度坐标信息转换后的结果返回前端，用户可以使用C# 、C++、Java等开发语言发送请求且接收JSON、XML的返回数据。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchlist?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	<br />
	</td>
</tr>
<tr>
    <td  rowspan="5"> 参数说明：<br/>
    <td>•batchId</td>
    <td width="40%">批量匹配成功后返回的全局唯一性id，代表匹配结果文件；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•pageNum</td>
    <td>分页页码，分页大小内置为6；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>• batchType</td>
    <td>返回的结果类型，0表示所有，1表示只返回匹配成功的数据，2表示只返回匹配失败的数据；</td>
	<td>可选参数</td>
	<td>缺省值:0</td>
</tr>
<tr>
    <td>• format</td>
    <td>结果返回格式，json或xml；</td>
	<td>可选参数</td>
	<td>缺省值:json</td>
</tr>
<tr>
    <td>• callback</td>
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
    <td> 请求示例：<br/>
    <td> •http地址</td>
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchlist?batchId=b3021dec386c4a4bb416634bbdf25f02_P&pageNum=1&batchType=0&format=json" target ="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchlist?batchId=b3021dec386c4a4bb416634bbdf25f02_P&pageNum=1&batchType=0&format=json</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








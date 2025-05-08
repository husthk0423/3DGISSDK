- **服务介绍**

    批量编码结果源数据查看是对正逆向批量匹配的结果数据进行查看，包括匹配结果及源文件数据内容。	
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">  批量编码结果源数据查看是对正逆向批量匹配的结果数据进行查看，包括匹配结果及源文件数据内容，用户可以使用C# 、C++、Java等开发语言发送请求且接收JSON、XML的返回数据。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSourceList?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
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
    <td width="40%">分页页码，内置分页大小为7；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:1</td>
</tr>
<tr>
    <td>•batchType</td>
    <td width="40%">0表示返回所有源数据，1表示只返回编码匹配成功的源数据，2表示只返回编码匹配失败的源数据；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:1</td>
</tr>
<tr>
    <td>•format</td>
    <td>结果返回格式，json或xml；</td>
	<td>可选参数</td>
	<td>缺省值:JSON</td>
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
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSourceList?batchId=b3021dec386c4a4bb416634bbdf25f02_P&pageNum=2" target ="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSourceList?batchId=b3021dec386c4a4bb416634bbdf25f02_P&pageNum=2</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








- **服务介绍**
   
    获取源文件数据是对已上传成功的匹配文件内容进行解析并通过json或xml形式将请求数据内容返回前端。 
    
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 获取源文件数据接口是应用终端通过http向服务器发送已成功上传的文件参数，服务器端接收请求以json或xml格式返回解析的数据内容。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/uploadlist?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	<br />
	</td>
</tr>
<tr>
    <td  rowspan="5"> 参数说明：<br/>
    <td>•uploadId</td>
    <td width="40%">源文件上传成功后返回的全局唯一性id；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•pageNum</td>
    <td> 分页页码；</td>
	<td> 必填参数</td>
	<td> 缺省值:无</td>
</tr>
<tr>
    <td>•pageSize</td>
    <td>分页大小；</td>
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
    <td rowspan="4"> 返回值说明：<br/>
    <td>•status</td>
    <td colspan="3">返回值为false或ok，false 表示请求失败；ok 表示请求成功。</td>
</tr>
<tr>
    <td>•pageNum</td>
    <td colspan="3">返回值为传入分页页码。</td>
</tr>
<tr>
    <td>•pageSize</td>
    <td colspan="3">返回值为传入分页大小。</td>
</tr>
<tr>
    <td>•value</td>
    <td colspan="3">返回值为请求文件数据内容。</td>
</tr>
<tr>
    <td> 请求示例：<br/>
    <td> •http地址</td>
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/uploadlist?uploadId=53cff77caca643bca65b5bb167903ebc&pageNum=1&pageSize=10" target="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/uploadlist?uploadId=53cff77caca643bca65b5bb167903ebc&pageNum=1&pageSize=10</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








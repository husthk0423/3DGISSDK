- **服务介绍**
   
    批量编码结果删除是将已完成正向或逆向批量匹配结果中的一行或多行纪录进行删除。 
    
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 批量编码结果删除是将已完成正向或逆向批量匹配结果中的一个或多个纪录进行删除。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchDelete?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="4"> 参数说明：<br/>
    <td>•batchId</td>
    <td width="40%">批量匹配成功后返回的全局唯一性id，代表匹配结果文件；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•lineNumbers</td>
    <td width="40%">待删除结果行的索引值，多个以半角逗号分隔；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•format</td>
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
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchDelete?batchId=244b19d178584de29c7c3c3c66ffb266_P&lineNumbers=3&format=json" target =_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchDelete?batchId=244b19d178584de29c7c3c3c66ffb266_P&lineNumbers=3&format=json</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








- **服务介绍**

    批量编码结果重新匹配是根据更新后的地址信息或经纬度坐标信息对源文件重新进行匹配。                                                                                 
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 批量编码结果重新匹配是根据更新后的地址信息或经纬度坐标信息对源文件重新进行匹配。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rebatch?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="6"> 参数说明：<br/>
    <td>•batchId</td>
    <td width="40%">批量匹配成功后返回的全局唯一性id，代表匹配结果文件；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•addressIndex</td>
    <td width="40%">正向编码重新匹配时，需指定此参数，表示待匹配地址索引值；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:0</td>
</tr>
<tr>
    <td>•lonIndex</td>
    <td width="40%">逆向编码重新匹配时，需指定此参数，表示待匹配经度索引值；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:0</td>
</tr>
<tr>
    <td>•latIndex</td>
    <td width="40%">逆向编码重新匹配时，需指定此参数，表示待匹配纬度索引值；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:0</td>
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
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rebatch?batchId=584de29c7c3c3c66ffb266_P&addressIndex=6&lonIndex=120.1363812675&latIndex=30.2446493085001" target = "_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rebatch?batchId=584de29c7c3c3c66ffb266_P&addressIndex=6&lonIndex=120.1363812675&latIndex=30.2446493085001</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








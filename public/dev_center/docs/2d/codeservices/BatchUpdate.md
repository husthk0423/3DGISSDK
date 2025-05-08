- **服务介绍**
   
    批量编码结果更新是对已完成正向或逆向批量匹配结果中的地址信息和经纬度信息进行修改。 
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 批量编码结果更新是对已完成正向或逆向批量匹配结果中的地址信息和经纬度信息进行修改。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchUpdate?parameters<br />
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
    <td>•lineNumber</td>
    <td>结果行索引值；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>• resultAddress</td>
    <td>更新之后的地址信息；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>• resultLon</td>
    <td>更新之后的经度信息；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>• resultLat</td>
    <td>更新之后的纬度信息；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
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
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchUpdate?batchId=244b19d178584de29c7c3c3c66ffb266_P&lineNumber=1&resultAddress=湖州市学士路1号" target ="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchUpdate?batchId=244b19d178584de29c7c3c3c66ffb266_P&lineNumber=1&resultAddress=湖州市学士路1号</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








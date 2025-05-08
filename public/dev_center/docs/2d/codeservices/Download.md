- **服务介绍**

    下载保存是将批量正向或逆向匹配后的源文件进行下载保存，支持保存为txt、excel、csv、shapefile四种类型。 
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">  下载保存是将批量正向或逆向匹配后的源文件进行下载保存，支持保存为txt、excel、csv、shapefile四种类型。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSave?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="3"> 参数说明：<br/>
    <td>•batchId</td>
    <td width="40%">匹配结果ID；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•saveType</td>
    <td>保存类型：1（excel）、2（txt）、3（csv）、4（shpfile）；</td>
	<td>必填参数</td>
	<td>缺省值:2</td>
</tr>
<tr>
    <td>• batchType</td>
    <td>表示保存结果类型，值为0、1、2，0表示所有结果全部返回，1表示只返回匹配成功的结果，2表示只返回匹配失败的结果；</td>
	<td>可选参数</td>
	<td>缺省值:0</td>
</tr>
<tr>
    <td> 返回值说明：<br/>
    <td>• status</td>
    <td colspan="3">返回值为false或ok，false 表示请求失败；ok 表示请求成功。</td>
</tr>
<tr>
    <td> 请求示例：<br/>
    <td> •http地址</td>
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSave?batchId=244b19d178584de29c7c3c3c66ffb266_P&saveType=1" target = "_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/batchSave?batchId=244b19d178584de29c7c3c3c66ffb266_P&saveType=1</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








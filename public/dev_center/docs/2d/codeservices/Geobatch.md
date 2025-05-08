- **服务介绍**
   
    正向批量匹配是将上传成功的匹配源文件中的多个地址信息转换成对应经纬度坐标信息的过程。 
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 正向批量匹配接口根据上传成功的匹配源文件中多个地址信息转换为对应经纬度坐标信息。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="5"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/geobatch?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="2"> 参数说明：<br/>
    <td>•uploadId</td>
    <td width="40%">源文件上传成功后返回的全局唯一性id；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•addressIndex</td>
    <td>正向批量编码时地址字段在上传文件中的索引值；</td>
	<td>必填参数</td>
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
    <td colspan="3">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/geobatch?uploadId=53cff77caca643bca65b5bb167903ebc&addressIndex=??</td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








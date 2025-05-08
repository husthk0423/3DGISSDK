- **服务介绍**
   
    匹配源文件上传是实现用户本地文件上传到服务器的过程。 
    
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">    匹配源文件上传接口是应用终端通过http向服务器发送文件提交请求，服务器端通过对文件内容的解析返回上传状态及上传结果。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/upload?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	<br />
	</td>
</tr>
<tr>
    <td  rowspan="3"> 参数说明：<br/>
    <td>•file</td>
    <td width="40%">上传的文件，支持excel、txt或csv格式；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•sepType</td>
    <td>当文件为txt或csv格式时分隔符类型，可传入的值为1、2、3，分别代表半角逗号、空格符和制表符；</td>
	<td>可选参数</td>
	<td>缺省值:1</td>
</tr>
<tr>
    <td>•sheetIndex</td>
    <td>当文件为excel格式时，工作表位置；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td rowspan="3"> 返回值说明：<br/>
    <td>•status</td>
    <td colspan="3">返回值为false或ok，false 表示请求失败；ok 表示请求成功。</td>
</tr>
<tr>
    <td>•uploadId</td>
    <td colspan="3">源文件上传成功后返回的全局唯一性id；</td>
</tr>
<tr>
    <td>•pageSum</td>
    <td colspan="3">分页页码数量；</td>
</tr>
<tr>
    <td> 请求示例：<br/>
    <td> •http地址</td>
    <td colspan="3">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/upload</td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








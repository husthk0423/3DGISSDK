- **服务介绍**
   
    逆向地理编码匹配是将地理坐标转换为地址信息的过程。 
- **参数说明**

 
<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5"> 逆向地理编码接口根据应用终端发送的http协议请求，将对应地理坐标转换为地名地址信息返回给用户终端，用户可以使用C# 、C++、Java等开发语言发送请求且接收JSON、XML的返回数据。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rgeo??parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="5"> 参数说明：<br/>
    <td>•lon</td>
    <td width="40%">查询坐标的经度，十进制格式，小数位最长是20位；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•lat</td>
    <td>查询坐标的纬度，十进制格式，小数位最长是20位；</td>
	<td>必填参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td>• distance</td>
    <td>经纬度坐标查询距离半径，单位米；</td>
	<td>可选参数</td>
	<td>缺省值:100</td>
</tr>
<tr>
    <td>• format</td>
    <td>结果返回格式，json或xml；</td>
	<td>可选参数</td>
	<td>缺省值:json</td>
</tr>
<tr>
    <td>• callback</td>
    <td>format为json时，指定callback返回jsonp</td>
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
    <td colspan="3"><a href = "http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rgeo?lon=120.1363812675&lat=30.2446493085001&distance=200&fomat=xml" target ="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/rgeo?lon=120.1363812675&lat=30.2446493085001&distance=200&fomat=xml</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








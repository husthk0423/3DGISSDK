- **服务介绍**

    正向地理编码匹配是将中文地址或地名描述映射为地理坐标的过程。
- **参数说明**


<table >
<tr>
    <td width="15%"> 服务描述：<br/>
    <td colspan="5">    正向地理编码接口根据应用终端发送的http协议请求，将对应地址描述转换为经纬度坐标返回给用户终端，用户可以使用C# 、C++、Java等开发语言发送请求且接收JSON、XML的返回数据。</td>
</tr>
<tr>
    <td> 服务地址：<br/>
    <td width="15%"> •http地址</td>
    <td colspan="3"> http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/geo?parameters<br />
	parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。
	</td>
</tr>
<tr>
    <td  rowspan="3"> 参数说明：<br/>
    <td>•address</td>
    <td width="40%">用于匹配的地址，如：湖州市学士路1号；</td>
	<td width="15%">必填参数</td>
	<td width="15%">缺省值:无</td>
</tr>
<tr>
    <td>•format</td>
    <td>结果返回格式，json或xml；</td>
	<td>可选参数</td>
	<td>缺省值:JSON</td>
</tr>
<tr>
    <td>•callback</td>
    <td>format为json时，指定callback返回jsonp；</td>
	<td>可选参数</td>
	<td>缺省值:无</td>
</tr>
<tr>
    <td> 返回值说明：<br/>
    <td>•status</td>
    <td colspan="3">返回值为false或ok，false 表示请求失败；ok 表示请求成功。</td>
</tr>
<tr>
    <td> 请求示例：<br/>
    <td> •http地址</td>
    <td colspan="3"><a href ="http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/geo?address=湖州市学士路1号&fomat=xml" target="_blank">http://ditu.zjzwfw.gov.cn/ime-server/rest/geocode/geo?address=湖州市学士路1号&fomat=xml</a></td>
</tr>

<tr>
    <td> 备注说明：<br/>
    <td colspan="4"> 无</td>
</tr>
</table>








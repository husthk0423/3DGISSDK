- **服务介绍**

  注册 control 筛选条件，避免使用 control 的请求超长引起的参数丢失问题

- **参数说明**

<table>
<tr>
    <td>服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/control/{serviceName}/setControl</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">注册control筛选条件，避免使用control的请求超长引起的参数丢失问题</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3">POST</td>
</tr>
<tr>
    <td rowspan="3">参数说明<br/>
    <td>参数名</td>
    <td>描述</td>
    <td>是否必要</td>
</tr>
<tr>
    <td>serviceName</td>
    <td>服务名称</td>
    <td>是</td>
</tr>
<tr>
    <td>control</td>
    <td>矢量瓦片电子地图样式id，可以为同一个服务提供多个样式</td>
    <td>是</td>
</tr>
<tr>
    <td width="20%">返回值类型<br/>
    <td colspan="3">json</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"success":true, //是否注册成功<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"id":"cb9dd0894eaa1eab96cddb6478ba809d" //controlId<br/>
}</td>
</tr>
<tr>
    <td rowspan="2">请求示例<br/>
    <td colspan="3"><a href ="http://10.1.102.52:8021/mapserver/control/全国行政区划/setControl
请求体body：">http://10.1.102.52:8021/mapserver/control/全国行政区划/setControl<br/>
	</td>
</tr>
<tr>
    <td colspan="3">
请求体body:<br/>
	{<br/>
       &nbsp;&nbsp;&nbsp;&nbsp;"control": "{\"otherDisplay\":false,\"layers\":[{\"id\":\"区县级行政区注记\",\"sqlFilterStr\":\"name like '%市'\",\"display\":true,\"color\":{\"color\":\"#208D69\",\"opacity\":0.5,\"strokeColor\":\"#15523E\",\"strokeWidth\":2}}]}" <br/>
        }
	</td>
</tr>
<td width="20%">备注<br/>
<td colspan="3"></td>
</tr>
</table>


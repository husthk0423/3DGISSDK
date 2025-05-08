- **服务介绍**

  将指定服务样式转换为移动端样式并导出

- **参数说明**

<table>
<tr>
    <td>服务地址<br/>
    <td colspan="3">http://ip:port/mapserver/MBTiles/{serviceName}</td>
</tr>
    <td width="20%">服务描述<br/>
    <td colspan="3">将指定服务样式转换为移动端样式并导出</td>
</tr>
<tr>
    <td width="20%">请求方式<br/>
    <td colspan="3"> GET</td>
</tr>
<tr>
    <td rowspan="6">参数说明<br/>
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
    <td>startLevel</td>
    <td>开始层级</td>
    <td>是</td>
</tr>
<tr>
    <td>endLevel</td>
    <td>结束层级</td>
    <td>是</td>
</tr>
<tr>
    <td>extent</td>
    <td>导出范围，minx,miny,maxx,maxy,如119,29,121,30</td>
    <td>是</td>
</tr>
<tr>
    <td>path</td>
    <td>导出目标mbtiles文件位置</td>
    <td>是</td>
</tr>
<tr>
    <td width="20%">返回值说明<br/>
    <td colspan="3">返回json格式数据</td>
</tr>
<tr>
    <td>请求示例<br/>
    <td colspan="3"><a href ="http://127.0.0.1/mapserver/MBTiles/79ef7be3ba6a477985d4a2ca91fbff07?startLevel=7&endLevel=16&extent=119,29,121,31&path=D:/tiles/aa.db">http://127.0.0.1/mapserver/MBTiles/79ef7be3ba6a477985d4a2ca91fbff07?startLevel=7&endLevel=16&extent=119,29,121,31&path=D:/tiles/aa.db</a></td>
</tr>
<tr>
    <td width="20%">备注<br/>
    <td colspan="3"></td>
</tr>
</table>




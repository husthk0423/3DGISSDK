| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/detail| 
| 接口描述    | 获取单条数据的详细信息| 
|参数说明     | **callback**： 支持jsonp跨域<br />**token**：用户登录后返回的token，包含用户的信息，非必填项<br />**resourceid**：图层编号，必填项<br />**type**：mod-移动端 ， web-地图栏目， info-报审详情<br />**id**：数据编号，必填项|
|返回值说明   |  **code**： 0:失败   1：成功<br />**count**：数据总数 用于分页<br />**massage**：如果code为0，则返回错误信息<br/>**result**：结果集|
|返回结果子集说明  |  **DISPLAYS**:详情字段数组，如:<br />“DISPLAYS”:[{“FIELDNAME”:”GEO” ,”ALIASNAME”:”位置坐标”},{“FIELDNAME”:”NAME” ,”ALIASNAME”:”名称”} …]<br />其中**FIELDNAME**为字段名称，**ALIASNAME**为字段别名<br />**DATA**:对应详情字段的内容，如: <br />“DATA”:{“NAME”:” 淳安县临岐镇初级中学”, “GEO”: "POINT(119.11512 29.854737)" …} |
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/detail?callback=jQuery18302653724261680148_1500388724017&resourceid=CH0000054&id=4148&token=0&type=mod&_=1500388724201 |
|备注         | 不同的图层返回的详细信息根据图层报送的内容不同 |
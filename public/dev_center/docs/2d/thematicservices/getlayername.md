| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/catalog/info/get| 
| 接口描述    | 该接口用于获取单个图层名称| 
|参数说明     | **callback**： 支持jsonp跨域,必填项<br />**token**：用户登录后返回的token，包含用户的信息，非必填项<br />**resourceid**：图层编号，必填项|
|返回值说明   |  **code**： 0:失败   1：成功<br />**count**：数据总数 用于分页<br />**massage**：如果code为0，则返回错误信息<br/>**result**：结果集|
|返回结果子集说明  |  **resouceid**： 图层编号<br />**name**： 图层名称|
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/catalog/info/get?resourceid=CH0000186&callback=jQuery171022789346833071789_1488414939169 |
|备注         |    无                                     |
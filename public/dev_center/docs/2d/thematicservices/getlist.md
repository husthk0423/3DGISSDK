| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/list| 
| 接口描述    | 该接口用于获取数据的简要列表信息，包括名称、地址、坐标、联系电话、数据id等| 
|参数说明     | **callback**： 支持jsonp跨域,必填项<br />**token**：用户登录后返回的token，包含用户的信息，非必填项<br />**resourceid**：图层编号，必填项<br />**key**：模糊查询参数<br />**areacode**：区域编码,必填项<br />**currentPage**：页码<br />**pageSize**：条数|
|返回值说明   |  **hasNextPage**： 是否有下一页<br />**recordCount**：数据总数 用于分页<br />**totalPages**：页数<br/>**hasPreviousPage**：是否有上一页<br/>**currentPage**：当前页码<br/>**result**：结果集|
|返回结果子集说明  |  **ID**： 数据编号<br />**NAME**：数据名称<br />**DZ**：地址<br/>**LXDH**：联系电话<br/>**GEO**：坐标<br />**AREACODE**： 区域编码|
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/list?callback=jQuery18307671439721595565_1500388640097&areacode=330100&resourceid=CH0000054&key=&token=0&pageSize=8&currentPage=1&_=1500388640200 |
|备注         |    无                                     |
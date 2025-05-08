| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/catalog/tree| 
| 接口描述    | 用于获取资源报送的图层目录| 
|参数说明     | **callback**： 支持jsonp跨域,必填项|
|返回值说明   |  **code**： 0:失败   1：成功<br />**count**：数据总数 用于分页<br />**massage**：如果code为0，则返回错误信息<br/>**result**：结果集|
|返回结果子集说明  |  **CODE_CH**： 测绘图层编码<br />**ID**：编号<br />**LAYERNAME**：对应图层名<br/>**NAME**：目录名称<br/>**PID**：上级编号<br />**AREACODE**： 区域编码<br />**CREATEDATE**： 创建时间<br />**RESOURCE_TYPE**： -1 其它， 0 单位机构， 1 场馆设施|
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/catalog/tree?callback=jQuery23452278934683306543_1488414909876 |
|备注         |    无                                     |
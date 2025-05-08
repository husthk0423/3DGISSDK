| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/web/district/newGet| 
| 接口描述    | 用于根据行政区划编码或政务服务网的站点编号，获取当前行政区划及下级行政区划的名称、区域编码等信息，并判断当前行政区划是否为开发区。| 
|参数说明     | **callback**： 支持jsonp跨域,必填项<br />**token**：用户登录后返回的token，包含用户的信息，非必填<br />**code**：地区编码（AREACODE），如 浙江省 330000000<br/>**webid**：浙江政务服务网站点编号，webid 与 code 两个必填一个|
|返回值说明   |  **code**： 0:失败   1：成功<br />**count**：数据总数 用于分页<br />**massage**：如果code为0，则返回错误信息<br/>**result**：结果集,包括result(本级)、parent(父级,即上级)、children(子级,即下级)、size(子节点条数)|
|返回结果子集说明  |  **CITY**： 站点名称<br />**ISDEVELOP**：是否开发区，0 否，1 是<br />**WEBID**：政务服务网站点id<br/>**AREACODE**：区划编码<br/>**KFQCODE**：开发区编码<br />**PROVINCE**： 所在省<br />**FULLNAME**： 区划详细名称，如"浙江省杭州市余杭区"<br />**COUNTY**： 区县名称<br />**NAME**： 乡镇/街道名称|
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/external/web/district/newGet?callback=jQuery171022789346833071789_1488414939169&webid=2&token=8b7a963d4761497a83fbafc0227f5536&_=1488414941690 |
|备注         |    无                                     |
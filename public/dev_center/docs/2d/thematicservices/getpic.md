| 名称        | 说明                        |
| ------------| --------------------------- |
| 接口地址    | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/reportflow/report/affix/img| 
| 接口描述    | 该接口用于获取图片| 
|参数说明     | **callback**： 支持jsonp跨域<br />**token**：用户登录后返回的token，包含用户的信息，非必填项<br />**type**：0-预览（默认）  1-下载，非必填项<br />**path**：upload-正常尺寸 ，thumbnail-缩略图，必填项|
|返回值说明   | 图片文件|
|请求示例     | http://dlxxbs.zjzwfw.gov.cn/ReportServer/rest/reportflow/report/affix/img?token=&type=0&path=upload/catalog_40/ad812f9d5ec94020b59ac305d1cdec5b_淳安县临岐镇初级中学2.jpg |
|备注         | 不同的图层返回的详细信息根据图层报送的内容不同 |
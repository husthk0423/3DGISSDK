| 名称        | 说明 |
| ------------| --------------------------- |
| 服务地址    | http://ditu.zjzwfw.gov.cn/services/wmts/imgmap/{TIME}/oss?parameters<br />parameters代表的参数包括必填参数和可选参数。所有参数均使用和号字符(&)进行分隔。下面的列表枚举了这些参数及其使用规则。| 
|服务描述     | 提供通过应用终端的http协议请求，把对应影像的瓦片数据(被分割成相同大小如256x256像素的正方形图片)按照应用终端的需要返回给用户终端的服务。|
|参数说明     | **• TIME**： 影像时相：如2014为2014年影像，70s为70年代影像，default为最新影像<br />**• SERVICE**： 服务类型<br />**• REQUEST**：请求的内容<br />**• VERSION**：版本号<br/>**• LAYER**：服务图层名称<br/>**• STYLE**：瓦片样式<br />**• TILEMATRIX**： 瓦片级别<br />**• TILEROW**： 瓦片行号<br />**• TILECOL**： 瓦片列号<br />**• FORMAT**： 瓦片格式<br />**• TILEMATRIXSET**： 瓦片矩阵标示符|
|返回值说明   | 返回地图瓦片 |
|请求示例     | http://ditu.zjzwfw.gov.cn/services/wmts/imgmap/default/oss?service=WMTS&request=GetTile&version=1.0.0&layer=imgmap&tilematrixSet=esritilematirx&format=image%2Fjpgpng&height=256&width=256&tileSize=256&fullExtent=%5Bobject%20Object%5D&tilematrix=10&tilerow=170&tilecol=856 |
|备注         |    无                                     |
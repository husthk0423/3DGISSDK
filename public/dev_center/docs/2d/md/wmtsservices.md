| 名称        | 说明 |
| ------------| --------------------------- |
| 服务地址    | 浙江电子地图：http://ditu.zj.cn/services/wmts/emap/ <br />浙江电子地图注记：http://ditu.zj.cn/services/wmts/emap_lab/ <br />浙江影像地图：http://ditu.zj.cn/services/wmts/imgmap/ <br />浙江影像地图注记：http://ditu.zj.cn/services/wmts/imgmap_lab/ <br />浙江电子地图地貌：http://ditu.zj.cn/services/wmts/zjemap_ter/ <br />浙江电子地图境界：http://ditu.zj.cn/services/wmts/zjemap_bou/ <br />浙江电子地图水系：http://ditu.zj.cn/services/wmts/zjemap_hyd/ <br />浙江电子地图交通：http://ditu.zj.cn/services/wmts/zjemap_tra/ <br />浙江电子地图居民地：http://ditu.zj.cn/services/wmts/zjemap_res/ <br />浙江电子地图兴趣点：http://ditu.zj.cn/services/wmts/zjemap_poi/| 
|服务描述     | 提供通过应用终端的http协议请求，把对应地图的瓦片数据(被分割成相同大小如256x256像素的正方形图片)按照应用终端的需要返回给用户终端的服务。|
|参数说明     | **• SERVICE**： 服务类型<br />**• REQUEST**：请求的内容<br />**• VERSION**：版本号<br/>**• LAYER**：服务图层名称<br/>**• STYLE**：瓦片样式<br />**• TILEMATRIX**： 瓦片级别<br />**• TILEROW**： 瓦片行号<br />**• TILECOL**： 瓦片列号<br />**• FORMAT**： 瓦片格式<br />**• TILEMATRIXSET**： 瓦片矩阵标示符|
|返回值说明   | 返回地图瓦片 |
|请求示例     | 以浙江电子地图为例：<br />http://ditu.zj.cn/services/wmts/zjemap?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=zjemap&STYLE=default&TILEMATRIXSET=esritilematirx&TILEMATRIX=12&TILEROW=677&TILECOL=3414&FORMAT=image%2Fpng |
|备注         |    无                                     |
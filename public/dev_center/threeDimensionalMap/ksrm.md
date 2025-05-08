   &nbsp;&nbsp;&nbsp;&nbsp;**快速入门 · Geoway sdk**

<div style="width:100%;height:100%;overflow:hidden">
	<iframe id="map-iframe" src="./ksrm.html" style="width:70%;position:absolute;left:0;right:0;margin:auto"></iframe>
</div>

	//创建地图
	var map  = new Geoway.Map({
	    container: 'map',//地图容器名
	    zoom: 14,//层级
	    maxTileCacheSize:100,//瓦片最大缓存个数
	    bearing:0,//偏转角
	    pitch:60,//仰角
	    center: [ 120.06, 28.69],//中心点坐标
		fontName:'微软雅黑',//字体样式名
		glyphUrl:'../fonts/{fontstack}/{range}.pbf'//字体路径
	});
	
	//底图图层
	var xyz = new Geoway.XYZLayer(['http://ditu.zjzwfw.gov.cn/mapserver/vmap/zjvmap/getMAP?x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017&tilesize=512&ratio=1'],{tileSize:512});
	//添加底图
	map.addLayer(xyz);
	//注记图层
	var labelLayer = new Geoway.LabelLayer('http://ditu.zjzwfw.gov.cn/mapserver/label/zjvmap/getDatas?x=${x}&y=${y}&l=${z}&styleId=tdt_biaozhunyangshi_2017&tilesize=512',{tileSize:512});
	//添加注记
	map.addLayer(labelLayer);
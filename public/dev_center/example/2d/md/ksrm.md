   &nbsp;&nbsp;&nbsp;&nbsp;**快速入门 · leaflet sdk**

<div style="width:100%;height:100%;overflow:hidden">
	<iframe id="map-iframe" src="html/ksrm.html" style="width:70%;position:absolute;left:0;right:0;margin:auto"></iframe>
</div>

    //创建地图，设置中心点和层级
    var map = L.map('map',{crs:L.CRS.CustomEPSG4326,center: {lon:120.09215287988154,  lat:30.277052933991797},zoom:12});
    //添加底图
    var layer = new L.GXYZ('http://ditu.zjzwfw.gov.cn:8090/mapserver/vmap/zjvmap/getMAP?x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017',{tileSize:512});
    map.addLayer(layer);

    //添加注记
    var labelLayer = new L.GWVTAnno({tileSize:512});
    var dataSource = new Custom.URLDataSource();
    dataSource.url ='http://ditu.zjzwfw.gov.cn:8090/mapserver/label/zjvmap/getDatas?x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017';
    labelLayer.addDataSource(dataSource);
    map.addLayer(labelLayer);



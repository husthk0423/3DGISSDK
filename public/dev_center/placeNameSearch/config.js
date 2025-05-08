window.config = {
    baseURL: 'http://10.254.251.77:9200',
    importUrl: 'http://10.254.251.77:8301',
    mapConfig: {
        //地图显示的默认层级
        level: 13,
        //地图中心点经纬度
        center: {
            lon: 114.41720,
            lat: 30.48659
        },
        //基础矢量图层 (如果不要矢量图层 可以不加)
        baseMapUrl: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=eec8c7ee00d8d62dd60a274aa1a1beb5&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
        //基础影像图层  (不能删除 可以替换)
        baseMapImageUrl: "http://t0.tianditu.gov.cn/img_c/wmts?tk=eec8c7ee00d8d62dd60a274aa1a1beb5&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
        //基础影像的注记
        baseLabelUrl: "http://t1.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=93724b915d1898d946ca7dc7b765dda5"
    }
}
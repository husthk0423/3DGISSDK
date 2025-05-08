/**
 * Created by kongjian on 2017/7/27.
 */
var MapUtil = {
    /**
     * 根据屏幕坐标获取瓦片层列号和瓦片内坐标
     * Parameters :
     * map - map对象
     * x - 屏幕坐标X
     * y - 屏幕坐标Y
     * tileSize - 瓦片大小,默认为256
     */
    screenPointToTilePoint:function(map,x,y,tileSize)
    {
        if(!tileSize){
            tileSize = 256;
        }
        var pc = map.transform.pointCoordinate(new Point(x,y));
        var column = Math.floor(pc.column);
        var row = Math.floor(pc.row);
        var level = Math.floor(pc.zoom);
        var tx = (pc.column - Math.floor(pc.column))*tileSize;
        var ty = (pc.row - Math.floor(pc.row))*tileSize;
        return {level:level,column:column,row:row,x:tx,y:ty};
    },


    /**
     * 根据地理坐标获取瓦片层列号和瓦片内坐标
     * Parameters :
     * map - map对象
     * lngLat - 地理坐对象
     * tileSize - 瓦片大小,默认为256
     */
    LngLatToTilePoint:function(map,lngLat,tileSize)
    {
        if(!tileSize){
            tileSize = 256;
        }
        var pc = map.transform.locationCoordinate(lngLat);
        var column = Math.floor(pc.column);
        var row = Math.floor(pc.row);
        var level = Math.floor(pc.zoom);
        var tx = (pc.column - Math.floor(pc.column))*tileSize;
        var ty = (pc.row - Math.floor(pc.row))*tileSize;
        return {level:level,column:column,row:row,x:tx,y:ty};
    }
};
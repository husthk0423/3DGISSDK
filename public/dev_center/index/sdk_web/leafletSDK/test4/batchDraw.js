


var expArr = [[],[0,1], [1, 7 ], [1, 3 ], [1, 1 ], [2, 8 ], [2, 4 ], [2, 2 ], [2, 1 ], [3, 5 ], [3, 2 ], [3, 1 ], [4, 6 ], [4, 3 ], [4, 1 ], [5, 8 ], [5, 4 ], [5, 2 ], [5, 1 ], [6, 5 ], [6, 2 ], [6, 1 ], [7, 6 ] ]



function scalefun (zoom) {
    return 256 * Math.pow(2, zoom - 1);
}

Transformation = function (a, b, c, d) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
};
Transformation.prototype = {
    // @method transform(point: Point, scale?: Number): Point
    // Returns a transformed point, optionally multiplied by the given scale.
    // Only accepts actual `L.Point` instances, not arrays.

    // destructive transform (faster)
    _transform: function (point, scale) {
        scale = scale || 1;
        var rpoint = {}
        rpoint.x = scale * (this._a * point.x + this._b);
        rpoint.y = scale * (this._c * point.y + this._d);
        return rpoint;
    },

    // @method untransform(point: Point, scale?: Number): Point
    // Returns the reverse transformation of the given point, optionally divided
    // by the given scale. Only accepts actual `L.Point` instances, not arrays.
    /*untransform: function (point, scale) {
        scale = scale || 1;
        return new L.Point(
            (point.x / scale - this._b) / this._a,
            (point.y / scale - this._d) / this._c);
    }*/
};

function createDraw(arr, bounds,level,sp){
    "use strict";

    var t = new Transformation(1 / 180, 1, -1 / 180, 0.5);
    var result = [];
    var res = expArr[level];
    var a = {};

    var scale = scalefun(level);
    if(sp == null) {
        sp = t._transform({x: bounds._southWest.lng, y: bounds._northEast.lat}, scale);
    }
    for (var i = 0; i < arr.length; i++) {
        var point = arr[i];
        var x = point.x;
        var y = point.y;
        var pp = t._transform({x: x, y: y}, scale);
        point.drawX = pp.x - sp.x
        point.drawY = pp.y - sp.y

        result.push(point);
    }
    return result;
}


function boundFilter(arr, bounds,level) {
    console.time("time:filter");

    var result = [];
    var res = expArr[level];
    var a = {};

    for (var i = 0; i < arr.length; i++) {
        var point = arr[i];
        var x = point.x;
        var y = point.y;
        //console.log(x);
        // console.log(y);
        var xMark = x > bounds._southWest.lng && x < bounds._northEast.lng
        var yMark = y > bounds._southWest.lat && y < bounds._northEast.lat
        if (xMark && yMark) {
            var ratio = Math.pow(10,res[0]);
            var newx = parseInt(x / res[1] /1.5 * ratio)/ratio;
            var newy = parseInt(y / res[1] /1.5 * ratio)/ratio;
            var mark = newx + "_" + newy;
            var times = a[mark];
            if(times == null){
                a[mark] = 1;

                result.push(point);

            }else{
                continue;
            }
        }else{
            continue;
        }
    }
    console.log(arr.length);
    console.log(result.length);
    console.timeEnd("time:filter");
    return result;

}





function generateData(baseArr){
    var baseArr = [];
    var time = 300000;
    var x = null;
    var y = null;
    var xmin = 118.871341;
    var xmax = 121.420169;
    var xRange = xmax - xmin;
    var ymin = 27.872490;
    var ymax = 30.333427;
    var yRange = ymax - ymin;
    for (var i = time - 1; i >= 0; i--) {
        baseArr.push({
            x : xmin + Math.random() * xRange,
            y : ymin + Math.random() * yRange
        });
    }

    console.timeEnd("time:generateData");
    return baseArr;
}

function getMapState(type) {
    var p = {};
    p.bounds = map.getBounds();
    p.level = map._zoom;
    if (type == 'zoom') {
        p.fun = null;
        p.bhv = 'zoom';
        p.sp = map.getPixelOrigin();
    }else if (type == 'moveend') {
        p.fun = null;
        p.bhv = 'moveend';
    }else if (type == 'createData-first') {
        p.fun = 'createData';
    }else if (type == 'createData') {
        p.fun = 'createData';
        p.sp = map.getPixelOrigin();
    }
    return p;
}


function producePoint(worker,type) {
    var p = getMapState(type);
    worker.postMessage(p);
}
export default class CesiumUtil {
  constructor(viewer) {
    this._viewer = viewer;
  }

  //坐标转换 笛卡尔转84
  transformCartesianToWGS84(cartesian) {
    if (this._viewer && cartesian) {
      var ellipsoid = Cesium.Ellipsoid.WGS84;
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      return {
        lng: Cesium.Math.toDegrees(cartographic.longitude),
        lat: Cesium.Math.toDegrees(cartographic.latitude),
        alt: cartographic.height
      };
    }
  }
  //坐标数组转换 笛卡尔转84
  transformWGS84ArrayToCartesianArray(WSG84Arr, alt) {
    if (this._viewer && WSG84Arr) {
      var $this = this;
      return WSG84Arr ?
        WSG84Arr.map(function (item) {
          return $this.transformWGS84ToCartesian(item, alt);
        }) :
        [];
    }
  }
  //坐标转换 84转笛卡尔
  transformWGS84ToCartesian(position, alt) {
    if (this._viewer) {
      return position ?
        Cesium.Cartesian3.fromDegrees(
          position.lng || position.lon,
          position.lat,
          position.alt = alt || position.alt,
          Cesium.Ellipsoid.WGS84
        ) :
        Cesium.Cartesian3.ZERO;
    }
  }
  //坐标数组转换 84转笛卡尔
  transformCartesianArrayToWGS84Array(cartesianArr) {
    if (this._viewer) {
      var $this = this;
      return cartesianArr ?
        cartesianArr.map(function (item) {
          return $this.transformCartesianToWGS84(item);
        }) :
        [];
    }
  }
  /**
   *
   * @param {*} position
   * 84坐标转制图坐标
   */
  transformWGS84ToCartographic(position) {
    return position ?
      Cesium.Cartographic.fromDegrees(
        position.lng || position.lon,
        position.lat,
        position.alt
      ) :
      Cesium.Cartographic.ZERO;
  }
  /**
   * 获取鼠标当前的屏幕坐标位置的三维Cesium坐标
   * @param {Cesium.Cartesian2} position 二维屏幕坐标位置
   */
  getCatesian3FromPX(position) {
    var cartesian;
    //在模型上提取坐标
    var pickedObject;
    try {
      pickedObject = this._viewer.scene.pick(position, 5, 5);
    } catch (e) {
      console.log("scene.pick 拾取时异常", e);
    }
    if (this._viewer.scene.pickPositionSupported && Cesium.defined(pickedObject)) {
      //pickPositionSupported :判断是否支持深度拾取,不支持时无法进行鼠标交互绘制
      cartesian = this._viewer.scene.pickPosition(position);
      if (Cesium.defined(cartesian)) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        if (cartographic.height >= 0) return cartesian;
        //不是entity时，支持3dtiles地下
        if (!Cesium.defined(pickedObject.id) && cartographic.height >= -500) return cartesian;
        console.log("scene.pickPosition 拾取模型时 高度值异常：" + cartographic.height);
      } else {
        console.log("scene.pickPosition 拾取模型 返回为空");
      }
    } else {
      console.log("scene.pick 拾取位置 返回为空");
    }

    //s3m数据拾取
    if (Cesium.defined(Cesium.S3MTilesLayer)) {
      cartesian = this._viewer.scene.pickPosition(position);
      if (Cesium.defined(cartesian)) {
        return cartesian;
      }
    }
    //通过 viewer.scene.onlyPickModelPosition 进行修改
    if (this._viewer.scene.onlyPickModelPosition) return cartesian; //只取模型上的时候，不继续读取了

    //测试scene.pickPosition和globe.pick的适用场景 https://zhuanlan.zhihu.com/p/44767866
    //1. globe.pick的结果相对稳定准确，不论地形深度检测开启与否，不论加载的是默认地形还是别的地形数据；
    //2. scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。
    //注意点： 1. globe.pick只能求交地形； 2. scene.pickPosition不仅可以求交地形，还可以求交除地形以外其他所有写深度的物体。
    //提取鼠标点的地理坐标
    if (this._viewer.scene.mode === Cesium.SceneMode.SCENE3D) {
      //三维模式下
      //如果开启了深度检测
      if (this._viewer.scene.globe.depthTestAgainstTerrain) {
        cartesian = this._viewer.scene.pickPosition(position);
      } else {
        //如果没开启深度检测
        var pickRay = this._viewer.scene.camera.getPickRay(position);
        cartesian = this._viewer.scene.globe.pick(pickRay, this._viewer.scene);
      }
    } else {
      //二维模式下
      cartesian = this._viewer.scene.camera.pickEllipsoid(position, this._viewer.scene.globe.ellipsoid);
    }

    if (Cesium.defined(cartesian) && this._viewer.scene.camera.positionCartographic.height < 10000) {
      var _cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      if (_cartographic.height < -5000) return null; //屏蔽无效值
    }
    return cartesian;
  }

  //获取圆（或椭圆）边线上的坐标点数组
  getEllipseOuterPositions(opts) {
    var position = opts.position;
    if (!position) return null;

    var count = Cesium.defaultValue(opts.count, 1); //点的数量，总数为count*4
    var semiMajorAxis = Cesium.defaultValue(opts.semiMajorAxis, opts.radius);
    var semiMinorAxis = Cesium.defaultValue(opts.semiMinorAxis, opts.radius);
    var rotation = Cesium.defaultValue(opts.rotation, 0);

    if (!semiMajorAxis || !semiMinorAxis) return [position, position, position];

    //获取椭圆上的坐标点数组
    var cep = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
      center: position,
      semiMajorAxis: semiMajorAxis, //长半轴
      semiMinorAxis: semiMinorAxis, //短半轴
      rotation: rotation,
      granularity: Math.PI / (16 * count)
    }, true, true);

    var arr = cep.outerPositions;
    var positions = [];
    for (var i = 0, len = arr.length; i < len; i += 3) {
      //长半轴上的坐标点
      var pt = new Cesium.Cartesian3(arr[i], arr[i + 1], arr[i + 2]);
      positions.push(pt);
    }
    return positions;
  }
}
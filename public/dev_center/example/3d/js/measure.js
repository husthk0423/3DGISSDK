/**
 * 量算鼠标交互工具类 fangmm   
 * create date 2022/6/15 13:42:32
 */
import CesiumUtil from "./cesiumUtil.js";
export default class Measure {
  constructor(viewer, options = {}) {
    this._viewer = viewer;
    this._drawLayer = new Cesium.CustomDataSource('drawLayer');
    this._viewer.dataSources.add(this._drawLayer);
    this._handlers = null;
    this.util = new CesiumUtil(viewer);

    // 鼠标提示信息
    this.tooltip = document.createElement('DIV');
    document.body.appendChild(this.tooltip);
    this.tooltip.style = 'position: absolute;background: rgba(0,0,0,0.5); z-index: 999;line-height: 18px;pointer-events: none;';
    this.tooltip.innerHTML =
      '<span class="prompt-text" style="color: #fff; font-size: 12px;padding:4px;">单击开始，双击结束</span>';
    this.tooltip.style.display = 'block';

    // 默认线的样式
    this.polylineStyle = {
      width: 3,
      color: '#7FFF00',
      opacity: 1
    };

    // 默认面的样式
    this.polygonStyle = {
      color: '#7FFF00',
      opacity: 0.4,
      outline: true,
      outlineColor: '#7FFF00'
    };

    // 默认label的样式
    options.label = options.label || {};
    this.labelStyle = this.entity2style('label', {
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(20, -20),
      color: '#fff',
      backgroundColor: '#000',
      showBackground: true,
      fontSize: 12,
      fontFamily: 'sans-serif',
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      ...options.label
    });

    // 默认point的样式
    options.point = options.point || {};
    this.pointStyle = this.entity2style('point', {
      size: 8,
      color: '#f00',
      outlineColor: '#fff',
      outlineWidth: 2,
      // disableDepthTestDistance: Number.POSITIVE_INFINITY,
      ...options.point
    });
    console.log(this.pointStyle);

    // 去掉entity的默认双击追踪，防止双击结束的时候点击到entity上引起视角跳转
    this._viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * 根据类型返回样式
   * @param {*} type 
   */
  entity2style(type, pstyle) {
    let style = {
      ...pstyle
    };
    switch (type) {
      case 'polyline': {
        for (let key in style) {
          switch (key) {
            case 'color': {
              if (style.outlineColor) {
                break;
              }
              if (style.opacity) {
                style['material'] = Cesium.Color.fromCssColorString(style[key]).withAlpha(style.opacity);
              } else {
                style['material'] = Cesium.Color.fromCssColorString(style[key]);
              }
              break;
            }
            case 'outlineColor': {
              if (style.outlineOpacity) {
                style['material'] = Cesium.Color.fromCssColorString(style[key]).withAlpha(style.outlineOpacity);
              } else {
                style['material'] = Cesium.Color.fromCssColorString(style[key]);
              }
              break;
            }
          }
        }
        break;
      }
      case 'polygon': {
        for (let key in style) {
          switch (key) {
            case 'color': {
              if (style.opacity) {
                style['material'] = Cesium.Color.fromCssColorString(style[key]).withAlpha(style.opacity);
              } else {
                style['material'] = Cesium.Color.fromCssColorString(style[key]);
              }
              break;
            }
          }
        }
        break;
      }
      case 'label': {
        for (let key in style) {
          switch (key) {
            case 'color': {
              style['fillColor'] = Cesium.Color.fromCssColorString(style[key]);
              break;
            }
            case 'backgroundColor': {
              style['backgroundColor'] = Cesium.Color.fromCssColorString(style[key]);
              break;
            }
            case 'fontSize': {
              style['font'] = `${style['fontSize']}px sans-serif`;
              break;
            }
            case 'fontFamily': {
              style['font'] = `${style['fontSize']}px ${style['fontFamily']}`;
              break;
            }
          }
        }
        break;
      }
      case 'point': {
        for (let key in style) {
          switch (key) {
            case 'color': {
              style['color'] = Cesium.Color.fromCssColorString(style[key]);
              break;
            }
            case 'outlineColor': {
              style['outlineColor'] = Cesium.Color.fromCssColorString(style[key]);
              break;
            }
            case 'size': {
              style['pixelSize'] = style[key];
              break;
            }
          }
        }
        break;
      }
    }
    return style;
  }

  /**
   * 空间长度
   * @param {*} options 
   */
  distance(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polyline', {
      ...this.polylineStyle,
      ...options.style
    });
    if (this._viewer && options) {

      var positions = [],
        _lineEntity = new Cesium.Entity(),
        $this = this,
        lineObj;
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        // 连续单击或者双击，不处理后面一个点
        if ($this.isNearPoint(movement)) {
          return;
        }
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.position);
        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            positions.push(cartesian.clone());
          }

          _addInfoPoint(cartesian);
          positions.push(cartesian);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态

        // 测量结束触发回调
        var result = Cesium.Measure.formatDistance(Cesium.Measure.getDistance(positions), 'auto');
        if (typeof options.callback === 'function') {
          options.callback(result);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      _lineEntity.polyline = {
        ...options.style
      };
      _lineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
        return positions;
      }, false);

      lineObj = this._drawLayer.entities.add(_lineEntity);

      //添加坐标点
      function _addInfoPoint(position) {
        var result = Cesium.Measure.formatDistance(Cesium.Measure.getDistance(positions), 'auto');
        var _labelEntity = new Cesium.Entity();
        _labelEntity.position = position;
        _labelEntity.point = {
          ...$this.pointStyle,
        };
        _labelEntity.label = {
          text: result,
          ...$this.labelStyle
        };

        $this._drawLayer.entities.add(_labelEntity);
      }
    }
  }

  /**
   * 地表长度
   * @param {*} options 
   */
  distanceSurface(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polyline', {
      ...this.polylineStyle,
      ...options.style
    });

    if (this._viewer && options) {

      var positions = [],
        _lineEntity = new Cesium.Entity(),
        $this = this,
        lineObj;
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        // 连续单击或者双击，不处理后面一个点
        if ($this.isNearPoint(movement)) {
          return;
        }
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.position);

        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            positions.push(cartesian.clone());
          }

          _addInfoPoint(cartesian);

          positions.push(cartesian);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // move
      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态

        // 测量结束触发回调
        if (typeof options.callback === 'function') {
          let result = Cesium.Measure.formatDistance(Cesium.Measure.getSurfaceDistance(positions), 'auto');
          options.callback(result);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      _lineEntity.polyline = {
        ...options.style,
        clampToGround: true
      };
      _lineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
        return positions;
      }, false);

      lineObj = this._drawLayer.entities.add(_lineEntity);

      //添加坐标点
      function _addInfoPoint(position) {
        var _labelEntity = new Cesium.Entity();
        _labelEntity.position = position;
        _labelEntity.point = {
          ...$this.pointStyle,
        };
        _labelEntity.label = {
          text: Cesium.Measure.formatDistance(Cesium.Measure.getSurfaceDistance(positions), 'auto'),
          ...$this.labelStyle,
        };
        $this._drawLayer.entities.add(_labelEntity);
      }
    }
  }

  /**
   * 贴地距离
   * 异步计算贴地距离，计算地表或模型表面
   * @param {*} options 
   */
  distanceClampSurface(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polyline', {
      ...this.polylineStyle,
      ...options.style
    });
    console.log(options.style);

    if (this._viewer && options) {

      var positions = [],
        _lineEntity = new Cesium.Entity(),
        $this = this,
        lineObj;
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        // 连续单击或者双击，不处理后面一个点
        if ($this.isNearPoint(movement)) {
          return;
        }
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.position);

        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            positions.push(cartesian.clone());
          }
          positions.push(cartesian);

          _addInfoPoint(cartesian);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态
        _addInfoPoint(positions[positions.length - 1], true);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      _lineEntity.polyline = {
        ...options.style,
        clampToGround: true
      };
      _lineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
        return positions;
      }, false);

      lineObj = this._drawLayer.entities.add(_lineEntity);

      //添加坐标点
      function _addInfoPoint(position, isEnd = false) {
        Cesium.Measure.getClampDistance(positions, {
          scene: $this._viewer.scene,
          splitNum: 10,
          has3dtiles: false,
          callback: (distance) => {
            var result = Cesium.Measure.formatDistance(distance, 'auto');
            var _labelEntity = new Cesium.Entity();
            _labelEntity.position = position;
            _labelEntity.point = {
              ...$this.pointStyle,
            };
            _labelEntity.label = {
              text: result,
              ...$this.labelStyle,
            };
            $this._drawLayer.entities.add(_labelEntity);

            if (isEnd) {
              if (typeof options.callback === 'function') {
                options.callback(result);
              }
            }
          }
        });
      }
    }
  }

  /**
   * 三角测量
   * @param {*} options 
   */
  heightTriangle(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polyline', {
      ...this.polylineStyle,
      ...options.style
    });

    if (this._viewer && options) {

      var _trianglesEntity = new Cesium.Entity(),
        _positions = [],
        _totalLable, _hLable, _xLable, $this = this;
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);

      function updateHeightLabel(currentLabel, position, value) {
        if (currentLabel == null) {
          return;
        }

        currentLabel.label._text._value = value;
        currentLabel.position = position; //位置
        currentLabel.show = true;
      }

      function getPostions() {
        let carto1 = Cesium.Cartographic.fromCartesian(_positions[0]);
        let height1 = carto1.height;
        let carto2 = Cesium.Cartographic.fromCartesian(_positions[1]);
        let height2 = carto2.height;

        let bottomPosition; //三角底部点
        let zPosition; //三角底部点 对应的高处的点
        let topPosion; //三角的顶部点

        if (height1 > height2) {
          zPosition = Cesium.Cartesian3.fromRadians(carto2.longitude, carto2.latitude, height1);
          topPosion = _positions[0];
          bottomPosition = _positions[1];
        } else {
          zPosition = Cesium.Cartesian3.fromRadians(carto1.longitude, carto1.latitude, height2);
          topPosion = _positions[1];
          bottomPosition = _positions[0];
        }

        return {
          bottomPosition,
          zPosition,
          topPosion,
          height1,
          height2
        };
      }

      function updatePostions() {
        let pos = getPostions();
        let {
          bottomPosition,
          zPosition,
          topPosion
        } = pos;

        return [bottomPosition, zPosition, topPosion, bottomPosition];
      }

      // left
      this._handlers.setInputAction(function (movement) {
        var position = $this.getCatesian3FromPX($this._viewer, movement.position);
        if (!position) return false;
        if (_positions.length == 0) {
          _positions.push(position.clone());
          _positions.push(position.clone());
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // move
      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var position = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (position && _positions.length > 0) {
          if (!_trianglesEntity.polyline) {
            _trianglesEntity.polyline = {
              positions: new Cesium.CallbackProperty(updatePostions, false),
              ...options.style
            };
            $this._drawLayer.entities.add(_trianglesEntity);
          }

          if (!Cesium.defined(_totalLable)) {
            _totalLable = $this._drawLayer.entities.add({
              name: 'measure-triangleLength-label',
              label: {
                text: '',
                ...$this.labelStyle,
              },
            });
          }

          if (!Cesium.defined(_hLable)) {
            _hLable = $this._drawLayer.entities.add({
              name: 'measure-triangleLength-label',
              label: {
                text: '',
                ...$this.labelStyle,
              },
            });
          }

          if (!Cesium.defined(_xLable)) {
            _xLable = $this._drawLayer.entities.add({
              name: 'measure-triangleLength-label',
              label: {
                text: '',
                ...$this.labelStyle,
              },
            });
          }

          //直线
          _positions.pop();
          _positions.push(position.clone());
        }

        if (!_positions.length) {
          return;
        }

        let pos = getPostions();
        let {
          bottomPosition,
          zPosition,
          topPosion,
          height1,
          height2
        } = pos;

        //[垂直方向]高度差
        let height = Math.abs(height2 - height1);
        let midPoint = Cesium.Cartesian3.midpoint(zPosition, bottomPosition, new Cesium.Cartesian3());
        let totalText = '垂直距离' + Cesium.Measure.formatDistance(height, 'auto');
        updateHeightLabel(_totalLable, midPoint, totalText);

        //[水平方向]水平距离
        let distanceSP = Cesium.Measure.formatDistance(Cesium.Measure.getDistance([zPosition, topPosion]), 'auto');
        let midPointSP = Cesium.Cartesian3.midpoint(zPosition, topPosion, new Cesium.Cartesian3());
        let hText = '水平距离' + distanceSP;
        updateHeightLabel(_hLable, midPointSP, hText);

        //空间距离长度
        let distance = Cesium.Measure.formatDistance(Cesium.Measure.getDistance([_positions[0], _positions[1]]), 'auto');
        let midXPoint = Cesium.Cartesian3.midpoint(_positions[0], _positions[1], new Cesium.Cartesian3());
        let xText = '空间距离' + distance;
        updateHeightLabel(_xLable, midXPoint, xText);

      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态

        if (typeof options.callback === 'function') {
          let pos = getPostions();
          let {
            zPosition,
            topPosion,
            height1,
            height2
          } = pos;

          //[垂直方向]高度差
          let totalText = Cesium.Measure.formatDistance(Math.abs(height2 - height1), 'auto');

          //[水平方向]水平距离
          let distanceSP = Cesium.Measure.formatDistance(Cesium.Measure.getDistance([zPosition, topPosion]), 'auto');

          //空间距离长度
          let distance = Cesium.Measure.formatDistance(Cesium.Measure.getDistance([_positions[0], _positions[1]]), 'auto');

          options.callback({
            'vDistance': totalText,
            'hDistance': distanceSP,
            'spaceDistance': distance
          });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
  }

  /**
   * 水平面积
   * @param {*} options 
   */
  area(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polygon', {
      ...this.polygonStyle,
      ...options.style
    });

    if (this._viewer && options) {
      var positions = [],
        polygon = new Cesium.PolygonHierarchy(),
        _polygonEntity = new Cesium.Entity(),
        $this = this,
        polyObj = null,
        _label = '';
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        // 连续单击或者双击，不处理后面一个点
        if ($this.isNearPoint(movement)) {
          return;
        }
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.position);
        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            polygon.positions.push(cartesian.clone());
            positions.push(cartesian.clone());
          }
          positions.push(cartesian.clone());
          polygon.positions.push(cartesian.clone());

          if (!polyObj) create();
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // move
      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
            polygon.positions.pop();
            polygon.positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态

        positions.push(positions[0]);

        if (options.height) { //立体
          _polygonEntity.polygon.extrudedHeight = options.height;
          _polygonEntity.polygon.material = Cesium.Color.BLUE.withAlpha(0.5);
        }

        // 在中间位置显示面积
        let center = $this.centerOfMass(positions);
        _addInfoPoint(center);

        if (typeof options.callback === 'function') {
          var result = Cesium.Measure.formatArea(Cesium.Measure.getArea(positions), 'auto');
          options.callback(result);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      function create() {
        if (options.style.outline) {
          _polygonEntity.polyline = {
            ...($this.entity2style('polyline', {
              ...options.style
            }))
          };

          _polygonEntity.polyline.positions = new Cesium.CallbackProperty(function () {
            return positions;
          }, false);
        }

        _polygonEntity.polygon = {
          hierarchy: new Cesium.CallbackProperty(function () {
            return polygon;
          }, false),
          perPositionHeight: true,
          ...options.style
        };
        _polygonEntity.clampToS3M = true;

        polyObj = $this._drawLayer.entities.add(_polygonEntity);
      }

      function _addInfoPoint(position) {
        var result = Cesium.Measure.formatArea(Cesium.Measure.getArea(positions), 'auto');
        var _labelEntity = new Cesium.Entity();
        _labelEntity.position = position;
        // _labelEntity.point = {
        //     ...$this.pointStyle,
        // }
        _labelEntity.label = {
          text: result,
          ...$this.labelStyle,
        };
        $this._drawLayer.entities.add(_labelEntity);
      }
    }
  }

  /**
   * 贴地面积
   * @param {*} options 
   */
  areaSurface(options) {
    this.m_start(); // 量算开启状态

    options = options || {};
    options.style = options.style || {};
    options.style = this.entity2style('polygon', {
      ...this.polygonStyle,
      ...options.style
    });

    if (this._viewer && options) {
      var positions = [],
        polygon = new Cesium.PolygonHierarchy(),
        _polygonEntity = new Cesium.Entity(),
        $this = this,
        polyObj = null,
        _label = '';
      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        // 连续单击或者双击，不处理后面一个点
        if ($this.isNearPoint(movement)) {
          return;
        }
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.position);

        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            polygon.positions.push(cartesian.clone());
            positions.push(cartesian.clone());
          }
          positions.push(cartesian.clone());
          polygon.positions.push(cartesian.clone());

          if (!polyObj) create();
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // move
      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.getCatesian3FromPX($this._viewer, movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
            polygon.positions.pop();
            polygon.positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // double-left
      this._handlers.setInputAction(function (movement) {
        $this.m_end(); // 量算结束状态

        positions.push(positions[0]);

        if (options.height) { //立体
          _polygonEntity.polygon.extrudedHeight = options.height;
          _polygonEntity.polygon.material = Cesium.Color.BLUE.withAlpha(0.5);
        }

        // 在中间位置显示面积
        let center = $this.centerOfMass(positions);
        _addInfoPoint(center);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      function create() {
        if (options.style.outline) {
          _polygonEntity.polyline = {
            ...($this.entity2style('polyline', {
              ...options.style
            }))
          };

          _polygonEntity.polyline.positions = new Cesium.CallbackProperty(function () {
            return positions;
          }, false);
        }

        _polygonEntity.polygon = {
          hierarchy: new Cesium.CallbackProperty(function () {
            return polygon;
          }, false),
          ...options.style
        };
        _polygonEntity.clampToS3M = true;

        polyObj = $this._drawLayer.entities.add(_polygonEntity);
      }

      function _addInfoPoint(position) {
        Cesium.Measure.getClampArea(positions, {
          scene: $this._viewer.scene,
          splitNum: 10,
          has3dtiles: false,
          callback: (areares) => {
            var result = Cesium.Measure.formatArea(areares, 'auto');
            var _labelEntity = new Cesium.Entity();
            _labelEntity.position = position;
            // _labelEntity.point = {
            //     ...$this.pointStyle,
            // }
            _labelEntity.label = {
              text: result,
              ...$this.labelStyle,
            };
            $this._drawLayer.entities.add(_labelEntity);

            if (typeof options.callback === 'function') {
              options.callback(result);
            }
          }
        });
      }
    }
  }

  drawAreaVolume(options) {
    this.m_start(); // 量算开启状态

    //解决entity 自动左键双击自动定位到视图中心问题
    // this._viewer.screenSpaceEventHandler.setInputAction(this.empityFun, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    options = options || {};
    options.style = options.style ||
    {
      material: Cesium.Color.fromCssColorString("#7FFF00"),
      clampToGround: true,
      width: 3
    };
    if (this._viewer && options) {

      var positions = [],
        polygon = new Cesium.PolygonHierarchy(),
        _polygonEntity = new Cesium.Entity(),
        $this = this,
        polyObj = null;

      this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
      // left
      this._handlers.setInputAction(function (movement) {
        if ($this.isNearPoint(movement)) return;
        var cartesian = $this.util.getCatesian3FromPX(movement.position);
        if (cartesian && cartesian.x) {
          if (positions.length == 0) {
            polygon.positions.push(cartesian.clone());
            positions.push(cartesian.clone());
          }
          positions.push(cartesian.clone());
          polygon.positions.push(cartesian.clone());

          if (!polyObj) create();
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // mouse
      this._handlers.setInputAction(function (movement) {
        $this.setTooltipPos(movement); // 设置tooltip位置
        var cartesian = $this.util.getCatesian3FromPX(movement.endPosition);
        if (positions.length >= 2) {
          if (cartesian && cartesian.x) {
            positions.pop();
            positions.push(cartesian);
            polygon.positions.pop();
            polygon.positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // right
      this._handlers.setInputAction(function (movement) {
        // $this._handlers.destroy();
        // $this._handlers = null;
        $this.m_end(); // 量算结束状态

        positions.push(positions[0]);

        if (options.height) { //立体
          _polygonEntity.polygon.extrudedHeight = options.height;
          _polygonEntity.polygon.material = Cesium.Color.BLUE.withAlpha(0.5);
        }

        // if (typeof options.callback === 'function') {

        //   options.callback(positions, polyObj);
        //   $this._viewer.screenSpaceEventHandler.removeInputAction({}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        // }
        $this.areaVolume(positions);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      function create() {
        _polygonEntity.polyline = options.style;

        _polygonEntity.polyline.positions = new Cesium.CallbackProperty(function () {
          return positions;
        }, false);

        _polygonEntity.polygon = {
          hierarchy: new Cesium.CallbackProperty(function () {
            return polygon;
          }, false),

          material: Cesium.Color.WHITE.withAlpha(0.2)
          , clampToGround: options.clampToGround || false
        };
        // _polygonEntity.clampToS3M = true

        polyObj = $this._drawLayer.entities.add(_polygonEntity);
      }
    }

  }

  empityFun() { }

  areaVolume(positions) {
    Cesium.Measure.getVolume(positions, {
      scene: this._viewer.scene,
      splitNum: 10,
      has3dtiles: false,
      callback: (fillres) => {
        var fillVolume = Cesium.Measure.formatVolume(fillres.fillVolume, 'auto');
        var digVolume = Cesium.Measure.formatVolume(fillres.digVolume, 'auto');
        var result = '填方体积：' + fillVolume + ';  挖方体积：' + digVolume;
        let wallEntity = new Cesium.Entity();
        wallEntity.position = this.centerOfMass(positions);
        wallEntity.label = {
          text: result,
          ...this.labelStyle,
        };
        let maximumHeights = [], minimumHeights = [];
        positions.forEach(el => {
          maximumHeights.push(fillres.maxHeight);
          minimumHeights.push(fillres.minHeight);
        });
        wallEntity.wall = {
          positions: positions,
          maximumHeights: maximumHeights,
          minimumHeights: minimumHeights,
          material: Cesium.Color.fromCssColorString("#7FFF00").withAlpha(0.6)
        };
        this._drawLayer.entities.add(wallEntity);
      }
    });
  }

  centerOfMass(positions) {
    try {
      let height = this.getMaxHeight(positions);

      let boundingSphere = Cesium.BoundingSphere.fromPoints(positions);
      let ptcenter = this.setPositionsHeight(boundingSphere.center, height);

      return ptcenter;
    } catch (e) {
      return positions[Math.floor(positions.length / 2)];
    }
  }

  getMaxHeight(positions, defaultVal = 0) {
    if (positions == null || positions.length == 0) {
      return defaultVal;
    }

    let maxHeight = defaultVal;
    for (let i = 0; i < positions.length; i++) {
      let tempCarto = Cesium.Cartographic.fromCartesian(positions[i]);
      if (i == 0) {
        maxHeight = tempCarto.height;
      }
      if (tempCarto.height > maxHeight) {
        maxHeight = tempCarto.height;
      }
    }
    return this.formatNum(maxHeight, 1);
  }

  setPositionsHeight(positions, height = 0) {
    if (!positions) {
      return positions;
    }

    if (Array.isArray(positions)) {
      let arr = [];
      for (let i = 0, len = positions.length; i < len; i++) {
        let car = Cesium.Cartographic.fromCartesian(positions[i]);
        let point = Cesium.Cartesian3.fromRadians(car.longitude, car.latitude, height);
        arr.push(point);
      }
      return arr;
    } else {
      let car = Cesium.Cartographic.fromCartesian(positions);
      return Cesium.Cartesian3.fromRadians(car.longitude, car.latitude, height);
    }
  }

  formatNum(num, digits = 0) {
    let pow = Math.pow(10, digits);
    return Math.round(num * pow) / pow;
  }

  /**
   * 是否为相邻的两个点，连续单击或者双击会出现此情况
   * @param {*} movement 
   * @returns 
   */
  isNearPoint(movement) {
    //下面代码是 避免双击带来的2次click事件
    let times = new Date().getTime() - (this._last_clickTime || 0);
    if (this._last_clickTime && times < 300) {
      // 屏蔽了单击时间很近的点
      return true;
    }
    this._last_clickTime = new Date().getTime();

    if (
      this._last_clickPositionX &&
      Math.abs(this._last_clickPositionX - movement.x) < 10 &&
      Math.abs(this._last_clickPositionY - movement.y) < 10
    ) {
      // 屏蔽了单击像素很近的点
      return true;
    }
    this._last_clickPositionX = movement.x;
    this._last_clickPositionY = movement.y;
    //上面代码是 避免双击带来的2个重复点

    return false;
  }

  /**
   * 移除绘制的坐标中的重复点，比如快速单击或双击产生的冗余坐标。
   * @return {void}  无
   */
  removeNearPoint(positions) {
    if (positions.length < 3) {
      return positions;
    }
    //消除双击带来的多余经纬度
    for (let i = positions.length - 1; i > 0; i--) {
      let mpt1 = positions[i];
      let mpt2 = positions[i - 1];

      let distance = Cesium.Cartesian3.distance(mpt1, mpt2);
      if (distance < 0.01) {
        positions.splice(i, 1);
      } else {
        break;
      }
    }
    return positions;
  }

  /**
   * 在模型上取点
   * @param {*} position 
   * @returns 
   */
  pickModel(position) {
    var position = position;
    var cartesian = this._viewer.scene.pickPosition(position);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    // 转成成经纬度
    // var ellipsoid = viewer.scene.globe.ellipsoid;
    // var cartographic = ellipsoid.cartesianToCartographic(cartesian);
    // var lat = Cesium.Math.toDegrees(cartographic.latitude);
    // var lng = Cesium.Math.toDegrees(cartographic.longitude);
    // var height = cartographic.height;
    return cartesian;
  }

  /**
   * 在地形上取点
   * @param {*} position 
   * @returns 
   */
  pickTerrain(position) {
    var ray = this._viewer.camera.getPickRay(position);
    var cartesian = this._viewer.scene.globe.pick(ray, this._viewer.scene);

    // 转成成经纬度
    // var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    // var lat = Cesium.Math.toDegrees(cartographic.latitude);
    // var lng = Cesium.Math.toDegrees(cartographic.longitude);
    // var height = cartographic.height;
    return cartesian;
  }

  getCarterian3WithWindowPos(viewer, windowPos) {
    var ray1 = viewer.camera.getPickRay(windowPos);
    var cartesian = viewer.scene.globe.pick(ray1, viewer.scene);
    var pick = viewer.scene.pickPosition(windowPos);
    var pickModel = viewer.scene.pick(windowPos);
    if (pickModel && pick && !pickModel.id) {
      var height = Cesium.Cartographic.fromCartesian(pick).height;
      var lat = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(pick).latitude);
      var lng = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(pick).longitude);
      cartesian = Cesium.Cartesian3.fromDegrees(lng, lat, height);
    }
    return cartesian;
  }

  /**
   * 拾取位置点
   * 
   * @param {Object} px 屏幕坐标
   * 
   * @return {Object} Cartesian3 三维坐标
   */
  getCatesian3FromPX(_viw, px) {

    if (this._viewer && px) {
      var picks = this._viewer.scene.drillPick(px);
      var cartesian = null;
      var isOn3dtiles = false, isOnTerrain = false;
      // drillPick
      for (let i in picks) {
        let pick = picks[i];

        if (pick &&
          pick.primitive instanceof Cesium.Cesium3DTileFeature
          || pick && pick.primitive instanceof Cesium.Cesium3DTileset
          || pick && pick.primitive instanceof Cesium.Model) { //模型上拾取
          isOn3dtiles = true;
        }
        // 3dtilset
        if (isOn3dtiles) {
          this._viewer.scene.pick(px); // pick
          cartesian = this._viewer.scene.pickPosition(px);
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            if (cartographic.height < 0) cartographic.height = 0;
            let lon = Cesium.Math.toDegrees(cartographic.longitude)
              , lat = Cesium.Math.toDegrees(cartographic.latitude)
              , height = cartographic.height;
            cartesian = this.util.transformWGS84ToCartesian({ lng: lon, lat: lat, alt: height });

          }
        }
      }
      // 地形
      let boolTerrain = this._viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider;
      // Terrain
      if (!isOn3dtiles && !boolTerrain) {
        var ray = this._viewer.scene.camera.getPickRay(px);
        if (!ray) return null;
        cartesian = this._viewer.scene.globe.pick(ray, this._viewer.scene);
        isOnTerrain = true;
      }
      // 地球
      if (!isOn3dtiles && !isOnTerrain && boolTerrain) {

        cartesian = this._viewer.scene.camera.pickEllipsoid(px, this._viewer.scene.globe.ellipsoid);
      }
      if (cartesian) {
        let position = this.util.transformCartesianToWGS84(cartesian);
        if (position.alt < 0) {
          cartesian = this.util.transformWGS84ToCartesian(position, 0.1);
        }
        return cartesian;
      }
      return false;
    }

  }

  /**
   * 量算开始，设置鼠标状态、清除已经存在的鼠标事件、显示tooltip
   */
  m_start() {
    document.body.style.cursor = "crosshair";
    this.removeHandlers();
    this.showTooltip(); // 显示tooltip提示
  }

  /**
   * 量算结束，设置鼠标状态、清除已经存在的鼠标事件、隐藏tooltip
   */
  m_end() {
    document.body.style.cursor = "default";
    this.removeHandlers();
    this.hideTooltip(); // 隐藏tooltip提示
  }

  /**
   * 显示tooltip提示
   */
  showTooltip() {
    this.tooltip.style.display = 'block';
    console.log(this.tooltip);
  }

  /**
   * 设置tooltip位置
   * @param {*} mouseMove 
   */
  setTooltipPos(movement) {
    this.tooltip.style.left = movement.endPosition.x + 5 + 'px';
    this.tooltip.style.top = movement.endPosition.y - 28 + 'px';
  }

  /**
   * 隐藏tooltip提示
   */
  hideTooltip() {
    document.body.style.cursor = "default";
    this.tooltip.style.display = 'none';
  }

  /**
   * 销毁tooltip提示
   */
  destroyTooltip() {
    document.body.removeChild(this.tooltip);
  }

  /**
   * 移除handlers
   */
  removeHandlers() {
    this._handlers && this._handlers.destroy();
    this._handlers = null;
  }

  /**
   * 清除绘制
   */
  clearDraw() {
    this._handlers && this._handlers.destroy();
    this._handlers = null;
    this._drawLayer.entities.removeAll();
    this.hideTooltip();
  }
  /**
   * 销毁
   */
  destroy() {
    this._handlers && this._handlers.destroy();
    this._handlers = null;
    this._viewer.dataSources.remove(this._drawLayer);
    this.destroyTooltip();
  }
}
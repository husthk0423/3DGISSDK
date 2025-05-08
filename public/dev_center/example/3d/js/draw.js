//Author wujp   标绘鼠标交互工具类
//create date 2022/6/9 10:42:32
//modify by d3kit date 2022/6/10 10:30:18
import CesiumUtil from "./cesiumUtil.js";
export default class Draw {
    constructor(viewer) {
        this._viewer = viewer;
        this._drawLayer = new Cesium.CustomDataSource('drawLayer')
        this._viewer.dataSources.add(this._drawLayer);
        this._handlers = null;
        this.util = new CesiumUtil(viewer);
    }

    /**
    * 画点
    * @param {*} options 
    */
    drawPointGraphics(options) {
        this._handlers && this._handlers.destroy();
        options = options || {}
        options.style = options.style ||
        {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAACACAYAAACC5t4xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkY4QjA1RUJBMkQxMTFFMjlFRjdDM0JFMkMxNTlCN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkY4QjA1RUNBMkQxMTFFMjlFRjdDM0JFMkMxNTlCN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRjhCMDVFOUEyRDExMUUyOUVGN0MzQkUyQzE1OUI3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRjhCMDVFQUEyRDExMUUyOUVGN0MzQkUyQzE1OUI3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PghgxQgAAAzDSURBVHja7F17cJTVFT95kieEGBwhdIAQfPAoNaBtVdBx2loZa6cK1Qq0QMtAR2Q6tWqho2O1haH10Rl0RqZWLOP0hfQPq7GdPuiQpCMFoxioIiGICliSkIVsNs9Nen6792M2aTbZved+r938Zs6ER/bee357v3PPPffc82UMLF1KHkQeyxyW+SyzWGawTGUpYilmKWEpZBnH0s7Sw9LK0sLyEcsJlmMsh1iOsHR5TcFsj4wjl+VGli+xXM+ykCUnwc8Wq5+XsFw+zP/3shxkqWP5C8s+9UW5igwXZzxm660sd7HcpmazEwiyvMrye5bXWbrThfhKlvUs32Ipc3niwTS9yLKDpTFViV/A8kOWO1gyPWZy+1n2sGxjedOJDp0gYDbLyywHWJZ6kHSLh2VqjC+rMfuW+HyWrSxvsdyJp4u8jww1Vox5i9LBV8Rj0TysTEsu+Q8Y8yalw61+IH48yy6WapYK8j8qlC67lG6eJL6KpZ5lJaUeVirdrvYa8ctZallmUupiptqELfcK8ZtZXrJzIfIQ8pWum90kHh7Akyw/pfQDdH5C4qnpEp/F8iuW71P64n6W5xUXSSNbc6b/2pSt8znWKNfzmywDds/47WOkD8IKxYmtMx6m5V6nNOrq66NAZyd1dHdTsKeHQizd/G99/f0RiSiQmRmRcdnZVJCbS0UshePGUUl+PuVlOxb1BidNLE8lbDaSCJItYXlF16YligtdXXT6wgVqDgapo0cWNi/kL2FSURFNGT+exufl2U1+mOV2teEyRjxOgBC1m2jHiDF7PwoE6NT58xTstic8XsRPQfmECfSpkpLIE2IT2igahT1hgnicBP2LoqdCRtEbDtPJtraI4M9OICcri6ZNnBgR/NkGIMKJU7TeEd3CR2ePGgF9lOUbpkeH2V3/8cfU3NFB/QMD5BTQ17lQKNJ/Lq8BNpigcvVzr2TGI/7yb5N2HQtkw5kz1MaLphcwkRfheVOmUEFOjslm8fheq+I7SROfpUivMjWaT9rb6TCTbnkkXgFs/tzJk+my4mKTzdYr8sPJ+vHrTZL+3tmz9PapU54j3VrcMTaM0SDA3bpkZ/wEiualTDJhU2FazrCL6AdMZtdzHs/+zAwjB2bNFM0LOp/ojH/QFOlYQP1COoCxYsyGFnxw+ECiM75U+aHiE5d3Tp+ObIb8CGy6Ps2Lrok9odoHnRttxn/PBOnvNzf7lnQAYz/a3GyiKXB532imBoH+75rwXppaW8nvOME6QBcD2EBDDoqGEv91EmZ3hXp7Iy5jqgC6QCchwOmykYgXh3sb2K570WWUuJrQyQBWDNo7xK4nLDdLwwB27EhzS0tp0qJFVHrNNVRUWUn5vOhlF0VzXPuCQepkYoKNjXTuwAFqqauj7pYWo/1DJ+iGIJsANyuOTw/1ahBrf1K3VQS5apqaqMdgsGtiVRVVrFlDZTfcQBkJBrQGeIa21NRQ0wsvUFt9vbkvn/tfVFEhDazhuPCpocSL8kYaeZY1GpppBVOn0lWbNtGkxYtlu5d9++jdrVspxH65CVSWlUVEGEZYEGvjp0hID/MsQ2jXyM5xyRK6bvduMemR3Qu3gbbQpglAR+H6VaW4vkj8LZLWPgwEjMTTK9evp/nbtl203yaAttAm2pYCOuLARohbYom/SdKSgcFQxdq1VHmvfce5aHvmunXidgzoemMs8dfptoLD6JDwbBSm4PKNG213DWdt2CA2O9A1IPPcrreIR2ymUrJLlSC/vJzmPPKIY345+kKfEgiDfuC6FMTPE3kOwaBIidmbN1N2YaFjxKMv9ClBS0eHdBjzQPxc3U8j70WSggE/3YT3ouPtoG9dQOcuWRhhLoifJbHvEsxYvdq1UMCMVatEnw90ie4sV4D46bqfbhd0boUB3AJmPcbghu743jMth14HQYGZAekZWVmuEY++JV98UObJlVtejRY6BXYOAS+3IRlDp8zGl4qIRwKpLhBldBuSMQh36hHita9DhgVxi3wz55kiFAj8eWHMJgfEF7rRuZO+ezxkCcYQlhFfDOLdKSGS4YeL3vYBxGvv+SXpzmH57k8MyRiyZKneAXw64EbnoVOnXCe+U3CWKsyxb8Wnm3Q/PU5w1QVnpG6j/dgx/dVRtgdpAvHavecLUptxMO02zh08SG7oDs5B/BFtPzhXvzBHc20tDTh0C2Q4oO/mmhpyQ3dwDuL3a/tEgtsUPa2t1FJb6xrx6LtHkO1WLLtJsh/Eo0RgSOfTJcJrLEjBcAvSvgW64wDjEIjHvl/rmctjO1coeOSQ94IUDKcBEyPJuYHOefo2HhVA+iyfqFq3lTLhDhR5L30O+vTo690tW0RtCHWutjZQwGu6rVw2XpbRjWSjI4895hjx6Eua4CTU+bVY4o+zNOi0gltzBbIVns5UV9OxZ56xnfTGZ5+N9CUBdIXOmmhQXA/KFv6Nbmu4LS3F8R07IsTYSXrjc8+J2xHqepHjWOL/QEmW/ogdjIlb0iDm0EMPUTgUMkY42kKbJkiHjgLiwe1vhyMeoQMtxxpxC1xRNwGYgrqlS414O/Be0JbUvFiAjoIYDTzHk9Zfhl4+w8WEl3RatSNNu3TBgkgmQhnOZxNU2ErTPrFzJ51701y1WgNp2stjTc1Q4rErwJJ/iU7LSN5vsOEaTiQjYfFiKl24kIpnzaK8yZMpR93C7m1vpy7uEwGvNiYaoYhuM5fGBgF3XwUXE5C/jvr33fGIB37O8gPtvfDJk56pU2AK8GI+O22apAkUjht033W453e72s3qzQxck8nMTBnSocs82flwHw1TOms4hj5k+aO2n8tbaRRkSBVAF2Fljz2K01GJB34m2tmx/Z0hyNLyCqCDgYoe24b7x3jEwx34s6S3Ky69NHIt3a/A2KGDEHgVxlvJEA/8xMRjWuaBNI5kgTEbMpdxq9CORDzCl3slvaL0SNXUqZFSJH4BxooxGyibsldxmDTxgPiqBhSYz17BdB/YfIwRYzVUq+bhEXkZ5cO1yk6JcSXby8+Ul3vS1cSYMLYr5TbdQvVIsz3eBmoorlaLrZFpkAbF4BAMWxBvUU2GeABRtbtNKozwwtGzZ43GdpKNvcBrEdYniMfVPaP9UqLET2d5j6JvKzOGFCz4iWsiV7F8YIp4K95wvx1kXCxxyyK8aREXyIMpLymxu8Qt4lwPJvKLyRCPE4D3yUCRuJGAos4wQ6jAKr24jGO6SeyTw5w4UNQZIVG85DFgmnjgOyy/dMoOW2XMUegZVxwhPfxvvfyEID89g90+zN4clDJns4G0C0iR82XMgW+zJJyskyzxmcpN+hyNIRZvULQswUAyRCYDXIO4T/0cw2BObH9VBVJsnx/j+yJ2KE6Sgu5rRXE0eJQ0jwhTCMh6vUL9JLtnvNXhw2OTnX6kQ7pkxltfGmI5n09T0vEWiUW6651kJ4EO15JL77x2Gd1K937JrJUAt0m2piHxOOD4j6QBE+/sRsYqopdz04R0vFwX0UfRttpE0KJHPXbhNCA9rHbv4oCSqWgRdm7b04B46LjfREMmTI0FFIt8h6JF6lMReJkB6rcZub5iMj6KS1WrUjSc0K90M3ZnyHRgGrnVT6cg8U8r3YzBpKmxkKdiF3NShHS4zHjdXpfJRu04isEA8WLZ3hQgvVfp0mW6YbvOwHCJ9PEUIP5xGuG1cV4zNRZw/INDk2t9Sjpet4c6wH12NG5ndhEGvFJ5O34DxrzCLtLtJh7A4fhGHxKPE6VjdnbgRD7dTpbf+Yh0jPVFuzux08bHAqkhb7NM8zjpH1A0ZTFgd0dOZZBCEVw39HIgLazGGHCiMydTd+s87mL+mKKnSo7AKVNjAcmKfyf1ngwP4Z8sX3Dyicx04XHGi9fPeoj0/1I0u9dRM+jGLYEzykf2gr0Pq7E4/lZIt65n/JW8cVaLUk1/c6Njp238UHsPpW9yqX9cDvuiW09epsuP+T3KxqaFXfcK8Za9v9thAhDqxUttP3FTcS9cwYMrt8nB/nBjo8Ztpb1y9xHXfPY40A8K9fzCCwp7hXjkluNGxVEb+0BF2bVe2Tx46bbveZY7yeBJfgwCqu3QGPHDAwfLq0mzGmAc9CsP5riXFPViKaXdFKfGiyYQ/Hrda0q6uYEabXP1KsuXhe38ieWrhp+glJ3x1uYKwTTJ+yxwdLfSi6R7mXhrQfyaWnR1Fuo7ND+b9sQDyEVPNpIZVjP9sJcV80OdQtj6B5L4/c3KttMY8XIgaTSRq/y7SFhBcIz4/8cGln+M8P9veGlnmkrE4/rLXXE8HdRDvp3cem9hihMPoDjyV4Z4KwgD3EbRsiU0Rrx9QKWoZcp7sfz9Q35TIpv8CZzZblSbo1f8qMD/BBgAkB8XhBtJ4LYAAAAASUVORK5CYII=",
            width: 35,
            height: 40,
            clampToGround: true,
            scale: 1,
            pixelOffset: new Cesium.Cartesian2(0, -20),
        }

        if (this._viewer && options) {
            var position, positions = [], poiObj, $this = this;
            this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);

            this._handlers.setInputAction(function (movement) {
                $this._handlers.destroy()
                $this._handlers = null
                var cartesian = $this.util.getCatesian3FromPX(movement.position);
                if (cartesian && cartesian.x) {
                    position = cartesian
                    positions.push(cartesian)
                }
                if (typeof options.callback === 'function') {
                    options.callback(positions, poiObj);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // // left
            // this._handlers.setInputAction(function (movement) {
            //     if ($this.isNearPoint(movement)) return;
            //     var cartesian = $this.util.getCatesian3FromPX(movement.endPosition);
            //     if (cartesian && cartesian.x) {
            //         position = cartesian

            //         positions.push(cartesian)
            //     }
            // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            // // right
            // this._handlers.setInputAction(function (movement) {

            //     $this._handlers.destroy()
            //     $this._handlers = null

            //     if (typeof options.callback === 'function') {

            //         options.callback(positions, poiObj);
            //     }
            // }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            if (options.noEntity) return;//只取点， 不绘制entity
            let _poiEntity = new Cesium.Entity();
            _poiEntity.billboard = options.style
            _poiEntity.position = new Cesium.CallbackProperty(function () {
                return position
            }, false)
            poiObj = this._drawLayer.entities.add(_poiEntity)
        }
    }

    /**
     * 画线
     * @param {*} options 
     */
    drawLineGraphics(options) {
        this._handlers && this._handlers.destroy();
        options = options || {}
        if (this._viewer && options) {

            var positions = [], _lineEntity = new Cesium.Entity(), $this = this, lineObj;
            this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
            // left
            this._handlers.setInputAction(function (movement) {
                if ($this.isNearPoint(movement)) return;
                var cartesian = $this.util.getCatesian3FromPX(movement.position);
                if (cartesian && cartesian.x) {
                    if (positions.length == 0) {
                        positions.push(cartesian.clone());
                    }
                    // 绘制直线 两个点
                    if (positions.length == 2 && options.type === "straightLine") {
                        $this._handlers.destroy()
                        $this._handlers = null
                        if (typeof options.callback === 'function') {
                            options.callback(positions, lineObj);
                        }
                    }
                    positions.push(cartesian);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            this._handlers.setInputAction(function (movement) {

                var cartesian = $this.util.getCatesian3FromPX(movement.endPosition);
                if (positions.length >= 2) {
                    if (cartesian && cartesian.x) {
                        positions.pop();
                        positions.push(cartesian);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            this._handlers.setInputAction(function (movement) {
                $this._handlers.destroy()
                $this._handlers = null
                if (positions.length >= 2) {
                    positions.pop();
                }
                if (typeof options.callback === 'function') {
                    options.callback(positions, lineObj);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

            _lineEntity.polyline = {
                width: options.width || 5
                , material: options.material || Cesium.Color.BLUE.withAlpha(0.8)
                , clampToGround: options.clampToGround || false
                , clampToS3M: options.clampToS3M || false
            }
            _lineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
                return positions
            }, false)
            lineObj = this._drawLayer.entities.add(_lineEntity)
        }
    }

    /**
     * 画面
     * @param {*} options 
     */
    drawPolygonGraphics(options) {
        //解决entity 自动左键双击自动定位到视图中心问题
        this._viewer.screenSpaceEventHandler.setInputAction(this.empityFun, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this._handlers && this._handlers.destroy();
        options = options || {}
        options.style = options.style ||
        {
            width: 3
            , material: Cesium.Color.BLUE.withAlpha(0.8)
            , clampToGround: true
        }
        if (this._viewer && options) {

            var positions = [], polygon = new Cesium.PolygonHierarchy(), _polygonEntity = new Cesium.Entity(), $this = this, polyObj = null;
            this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
            // left
            this._handlers.setInputAction(function (movement) {
                if ($this.isNearPoint(movement)) return;
                var cartesian = $this.util.getCatesian3FromPX(movement.position);
                
                if (cartesian && cartesian.x) {
                
                    if (positions.length == 0) {
                        polygon.positions.push(cartesian.clone())
                        positions.push(cartesian.clone());
                    }
                    positions.push(cartesian.clone());
                    polygon.positions.push(cartesian.clone())

                    if (!polyObj) create()
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            // mouse
            this._handlers.setInputAction(function (movement) {

                var cartesian = $this.util.getCatesian3FromPX(movement.endPosition);
                if (positions.length >= 2) {
                    if (cartesian && cartesian.x) {
                        positions.pop()
                        positions.push(cartesian);
                        polygon.positions.pop()
                        polygon.positions.push(cartesian);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            // right
            this._handlers.setInputAction(function (movement) {
                $this._handlers.destroy();
                $this._handlers = null
                positions.push(positions[0]);

                if (options.height) { //立体
                    _polygonEntity.polygon.extrudedHeight = options.height
                    _polygonEntity.polygon.material = Cesium.Color.BLUE.withAlpha(0.5)
                }

                if (typeof options.callback === 'function') {
                    
                    options.callback(positions, polyObj);
                    $this._viewer.screenSpaceEventHandler.removeInputAction($this.empityFun, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

            function create() {
                _polygonEntity.polyline = options.style

                _polygonEntity.polyline.positions = new Cesium.CallbackProperty(function () {
                    return positions
                }, false)

                _polygonEntity.polygon = {

                    hierarchy: new Cesium.CallbackProperty(function () {
                        return polygon
                    }, false),

                    material: Cesium.Color.WHITE.withAlpha(0.2)
                    , clampToGround: options.clampToGround || false
                }
                // _polygonEntity.clampToS3M = true

                polyObj = $this._drawLayer.entities.add(_polygonEntity)
            }
        }

    }

    empityFun() {

    }

    /**
     * 画矩形
     * @param {*} options 
     */
    drawRectangleGraphics(options) {
        this._handlers && this._handlers.destroy();
        options = options || {}
        options.style = options.style ||
        {
            width: 3
            , material: Cesium.Color.BLUE.withAlpha(0.8)
            , clampToGround: true
        }
        if (this._viewer && options) {

            var _positions = [], _rectangleEntity = new Cesium.Entity(), _coordinates = new Cesium.Rectangle(), $this = this, rectangleObj;
            this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
            // left
            this._handlers.setInputAction(function (movement) {
                if ($this.isNearPoint(movement)) return;
                var cartesian = $this.util.getCatesian3FromPX(movement.position);
                if (cartesian && cartesian.x) {

                    if (_positions.length == 0) {

                        _positions.push(cartesian.clone());
                    } else {
                        $this._handlers.destroy();
                        $this._handlers = null;
                        _positions.push(cartesian.clone());

                        _coordinates = Cesium.Rectangle.fromCartesianArray([..._positions, cartesian], Cesium.Ellipsoid.WGS84)

                        if (typeof options.callback === 'function') {

                            options.callback(_positions, rectangleObj);
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            // mouse
            this._handlers.setInputAction(function (movement) {

                var cartesian = $this.util.getCatesian3FromPX(movement.endPosition);

                if (cartesian) {

                    _coordinates = Cesium.Rectangle.fromCartesianArray([..._positions, cartesian], Cesium.Ellipsoid.WGS84)

                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            _rectangleEntity.rectangle = {
                material: Cesium.Color.WHITE.withAlpha(0.2),
                clampToGround: options.clampToGround || false
            }

            _rectangleEntity.polyline = options.style

            _rectangleEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                if (_positions.length < 2) {
                    return
                }

                let jwdpos = this.util.transformCartesianArrayToWGS84Array(_positions).map(el => { return [el.lng, el.lat] })
                let minx = jwdpos[0][0]
                let maxx = jwdpos[1][0]
                let miny = jwdpos[0][1]
                let maxy = jwdpos[1][1]

                let cartesianpos = [
                    minx, miny,
                    minx, maxy,
                    maxx, maxy,
                    maxx, miny,
                    minx, miny,
                ]

                return Cesium.Cartesian3.fromDegreesArray(cartesianpos)
            }, false)

            if (options.height) _rectangleEntity.rectangle.extrudedHeight = options.height
            _rectangleEntity.rectangle.coordinates = new Cesium.CallbackProperty(function () {
                return _coordinates
            }, false)
            rectangleObj = this._drawLayer.entities.add(_rectangleEntity)
        }
    }

    /**
     * 画圆
     * @param {*} options 
     */
    drawCircleGraphics(options) {
        this._handlers && this._handlers.destroy();
        options = options || {}
        options.style = options.style ||
        {
            width: 3
            , material: Cesium.Color.BLUE.withAlpha(0.5)
            , clampToGround: true
        }
        if (this._viewer && options) {

            var _center = undefined, _circleEntity = new Cesium.Entity(), $this = this, circleObj, _radius = 1;
            this._handlers = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);

            // 计算半径
            function computeRadius(src, dest) {
                let srcCartographic = Cesium.Cartographic.fromCartesian(src)
                let destCartographic = Cesium.Cartographic.fromCartesian(dest)
                let geodesic = new Cesium.EllipsoidGeodesic()
                geodesic.setEndPoints(srcCartographic, destCartographic)
                let s = geodesic.surfaceDistance
                _radius = Math.sqrt( //开平方
                    Math.pow(s, 2) +
                    Math.pow(destCartographic.height - srcCartographic.height, 2)
                )
            }
            //
            function drawGraphics() {

                _circleEntity.ellipse = options.style
                _circleEntity.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function () {
                    return _radius
                }, false)
                _circleEntity.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function () {
                    return _radius
                }, false)
                _circleEntity.position = new Cesium.CallbackProperty(function () {
                    return _center
                }, false)

                _circleEntity.point = {
                    pixelSize: 5,
                    outlineColor: Cesium.Color.RED,
                    outlineWidth: 3
                }

                if (options.height) _circleEntity.ellipse.extrudedHeight = options.height

                circleObj = $this._drawLayer.entities.add(_circleEntity)
            }
            // left
            this._handlers.setInputAction(function (movement) {
                if ($this.isNearPoint(movement)) return;
                var cartesian = $this.util.getCatesian3FromPX(movement.position);

                if (cartesian && cartesian.x) {
                    if (!_center) {

                        _center = cartesian

                        drawGraphics()

                    } else {

                        computeRadius(_center, cartesian)

                        $this._handlers.destroy();
                        $this._handlers = null;
                        if (typeof options.callback === 'function') {

                            options.callback({ center: _center, radius: _radius }, circleObj);
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            // mouse
            this._handlers.setInputAction(function (movement) {

                var cartesian = $this._viewer.scene.camera.pickEllipsoid(movement.endPosition, $this._viewer.scene.globe.ellipsoid);
                if (_center && cartesian && cartesian.x) {

                    computeRadius(_center, cartesian)
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }

    /**
   * 是否为相邻的两个点，连续单击或者双击会出现此情况
   * @param {*} movement 
   * @returns 
   */
    isNearPoint(movement) {
        //下面代码是 避免双击带来的2次click事件
        let times = new Date().getTime() - (this._last_clickTime || 0);
        if (this._last_clickTime && times < 200) {
            // 屏蔽了单击时间很近的点
            console.log(true);
            return true;
        }
        this._last_clickTime = new Date().getTime();

        if (
            this._last_clickPositionX &&
            Math.abs(this._last_clickPositionX - movement.x) < 10 &&
            Math.abs(this._last_clickPositionY - movement.y) < 10
        ) {
            console.log(true);
            // 屏蔽了单击像素很近的点
            return true;
        }
        this._last_clickPositionX = movement.x;
        this._last_clickPositionY = movement.y;
        //上面代码是 避免双击带来的2个重复点
        console.log(false);
        return false;
    }

    loadPolygon(options) {
        if (!options || !options.position || options.position.length == 0) return;
        let _polygonEntity = new Cesium.Entity()
        options.style = options.style ||
        {
            width: 3
            , material: Cesium.Color.BLUE.withAlpha(0.8)
            , clampToGround: true
        }
        _polygonEntity.polyline = options.style

        _polygonEntity.polyline.positions = options.position;

        _polygonEntity.polygon = {
            hierarchy: options.position,
            material: Cesium.Color.WHITE.withAlpha(0.1)
            , clampToGround: options.clampToGround || false
        }
        this._drawLayer.entities.add(_polygonEntity)
    }

    /**
     * 清除绘制
     */
    clearDraw() {
        this._handlers && this._handlers.destroy();
        this._drawLayer.entities.removeAll()
        this._handlers = null;
    }
    /**
     * 销毁
     */
    destroy() {
        this._handlers && this._handlers.destroy();
        this._viewer.dataSources.remove(this._drawLayer);
        this._viewer.screenSpaceEventHandler.removeInputAction(this.empityFun, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this._handlers = null;
    }

}

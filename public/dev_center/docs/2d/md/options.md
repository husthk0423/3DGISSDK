### <span id="options"> Options 选项 </span>

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| preferCanvas | `Boolean ` | `false ` | 是否使用 Canvas 来渲染 Path（路径）.默认情况下，所有 Path 都是使用 SVG 进行渲染。 |

### 控件选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| attributionControl | `Boolean ` | `true ` | 默认情况下，是否将 attribution 版权控件添加到地图中。 |
| zoomControl | `Boolean ` | `true ` | 默认情况下，是否将 zoom 缩放控件添加到地图中。 |

### 交互选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closePopupOnClick | `Boolean ` | `true `&nbsp;&nbsp; | 如果你不希望用户点击地图时 popups（弹出窗口）自动关闭，则可以将其设置为 false。 |
| zoomSnap | `Number ` | `1 ` | 强制让地图的缩放级别始终为这个值的倍数，特别是在 fitBounds() 或 pinch-zoom 后。默认情况下，缩放级别将是其最接近的整数； 较低的值（例如 0.5 or 0.1）允许更大的颗粒度。数值 0 意味着缩放级别将不会被 fitBounds 或 pinch-zoom。 |
| zoomDelta | `Number ` | `1 ` | 控件在进行 zoomIn()、 zoomOut() 以及按 + - 键或者使用 zoom 进行缩放之后，地图缩放级别改变的值。小于 1 的值（例如 0.5）允许更大的颗粒度。 |
| trackResize | `Boolean ` | `true ` | 地图是否会自动根据浏览器窗口的大小来更新自己。 |
| boxZoom | `Boolean ` | `true ` | 是否可以在按住 shift 键的同时拖动鼠标将地图缩放到指定的矩形区域。 |
| doubleClickZoom | `Boolean or String ` | `true ` | 地图是否可以通过双击来放大，以及在按住 shift 的同时双击来缩小。如果设置为 'center'，不管鼠标在哪里，双击缩放都将缩放到视图的中心。 |
| dragging | `Boolean ` | `true ` | 地图是否可以通过 mouse/touch 进行拖动。 |

### 地图状态选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| crs | `CRS ` | `L.CRS.EPSG3857 ` | 该地图使用的坐标系。如果你不确定坐标系这是什么意思，请不要更改它。 |
| center | `LatLng ` | `undefined ` | 地图初始化时的中心点位置。 |
| zoom | `Number ` | `undefined ` | 地图初始化时的缩放等级。 |
| minZoom | `Number ` | `* ` | 	地图的最小缩放级别。 如果未指定，并且地图中至少有一个 GridLayer 或 TileLayer，则将使用其最低的 minZoom 选项。 |
| maxZoom | `Number ` | `* ` | 地图的最大缩放级别。 如果未指定，并且地图中至少有一个 GridLayer 或 TileLayer，则将使用其最大的 maxZoom 选项。 |
| layers | `Layer[] ` | `[] ` | 默认添加到地图上的图层组。 |
| maxBounds | `LatLngBounds ` | `null ` | 当这个选项被设置后，地图将被限制在指定的地理边界内， 当用户平移将地图拖动到视图以外的范围时会出现弹回的效果， 并且也不允许缩小视图到指定范围以外的区域（这取决于地图的尺寸）. 要动态设置此限制，请使用 setMaxBounds 方法。 |
| renderer | `Renderer ` | `* ` | 在地图上绘制矢量图层的默认方法，默认为 L.SVG 或 L.Canvas， 这取决于浏览器是否支持。。 |


### 动画选项

| 选项 | 类型 | 默认值| 说明 |
| --- | --- | --- | --- |
| zoomAnimation | `Boolean ` | `true `&nbsp;&nbsp; | 是否启用地图缩放动画。默认情况下，它在所有支持 CSS3 Transitions 的浏览器中都是启用的，Android 除外。 |
| zoomAnimationThreshold | `Number ` | `4 ` | 如果缩放差异超过此值，则不会为缩放设置动画。 |
| fadeAnimation | `Boolean ` | `true ` | 是否启用淡出淡出动画。默认情况下，它在所有支持 CSS3 Transitions 的浏览器中都是启用的，Android 除外。 |
| markerZoomAnimation | `Boolean ` | `true ` | Marker 标记是否使用缩放动画进行缩放。默认情况下，它在所有支持 CSS3 Transitions 的浏览器中都是启用的，Android 除外。 |
| transform3DLimit | `Number ` | `2^23 ` | 	定义了 CSS 转换的最大尺寸。默认值不应该被改变，除非网页浏览器在做了一个大的 panBy 后将层定位在错误的地方。 |


### <span id="panninginertia"> Panning Inertia 选项 </span>

| 选项 | 类型 | 默认值| 说明 |
| --- | --- | --- | --- |
| inertia | `Boolean ` | `* `&nbsp;&nbsp; | 如果启用，地图的平移会有一种惯性效应，即地图在拖动时形成动力，并在一段时间内继续向同一方向移动。在触摸设备上感觉特别好。除非在旧的 Android 设备上运行，否则默认情况下是启用的。 |
| inertiaDeceleration | `Number ` | `3000 ` | 惯性运动减速的速度，以像素/秒为单位。 |
| inertiaMaxSpeed | `Number ` | `Infinity ` | 惯性运动的最大速度，以像素/秒为单位。 |
| easeLinearity | `Number ` | `0.2 ` | &nbsp;&nbsp; |
| worldCopyJump | `Boolean ` | `false ` | 	启用该选项后，当你平移到世界的另一个 "copy" 时，地图会跟踪并无缝跳转到原来的副本，这样所有的覆盖物如 markers（标记）和 vector layers（矢量图层）都仍然可见。 |
| maxBoundsViscosity | `Number ` | `0.0 ` | 	如果设置了 maxBounds，这个选项将控制拖动地图时边界的稳固程度。默认值为 0.0，允许用户以正常速度在界外拖动，更高的值会减慢地图在界外的拖动速度，而 1.0 使界外完全稳固，防止用户在界外拖动。|

### 按键导航选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| keyboard | `Boolean ` | `true ` | 地图是否获得焦点，并且允许用户通过键盘和 +/- 来进行浏览地图。 |
| keyboardPanDelta | `Number ` | `80 ` | 按下方向键时，平移的像素数量。 |

### 鼠标选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| scrollWheelZoom | `Boolean or String` | `true ` | 地图是否允许通过使用鼠标滚轮进行缩放。如果通过'center'，不管鼠标在哪里，都将会放大到视图的中心。 |
| wheelDebounceTime | `Number ` | `40 ` | 限制滚轮的触发速度（以毫秒为单位）。默认情况下，用户通过滚轮缩放的次数不能超过每 40 毫秒一次。 |
| wheelPxPerZoomLevel | `Number ` | `60 ` | 多少滚动像素（由 L.DomEvent.getWheelDelta 报告）意味着一个完整缩放级别的更改。 较小的值将使滚轮变焦更快（反之亦然） |

### 触摸互动选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| tap | `Boolean` | `true ` | 是否启用 mobile hacks 以支持 taps（在 iOS / Android上 修复 200ms 点击延迟）和 touch（触发 contextmenu 事件）。 |
| tapTolerance | `Number ` | `15 ` | 用户在触摸时，移动手指的像素数超过此值时被认为是有效的 tap。 |
| touchZoom | `Boolean or String ` | `* ` | 地图是否允许通过两根手指的触摸拖动进行缩放。如果通过 'center'，就会放大到视图的中心，而不管 touch 事件（手指）在哪里。除了老式的 Android 系统外，对具有 touch-capable 功能的网络浏览器来说是启用的。 |
| bounceAtZoomLimits | `Boolean ` | `true ` | 如果您不希望在地图缩放超过最小/最大缩放范围时反弹，请将其设置为 false。 |


&nbsp;
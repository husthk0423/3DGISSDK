### 图层事件

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| baselayerchange | [LayersControlEvent](#layerscontrolevent)  | 通过图层控件更改基本图层时触发。 |
| overlayadd | [LayersControlEvent](#layerscontrolevent)  | 通过图层控件选择叠加图层时触发。 |
| overlayremove | [LayersControlEvent](#layerscontrolevent)  |	通过图层控件取消选择叠加图层时触发。 |
| layeradd | [LayerEvent](#event)  |	将新图层添加到地图时触发。 |
| layerremove | [LayerEvent](#event)  |		从地图上删除某些图层时触发 |

### 地图状态变更事件

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| zoomlevelschange | [Event](#event)  | 当地图上的缩放级别数因添加或移除图层而更改时触发。 |
| resize | [ResizeEvent](#resizeevent)  | 调整地图大小时触发。 |
| unload | [Event](#event)  | 当使用 remove 方法销毁地图时触发。 |
| viewreset | [Event](#event)  | 当地图需要重绘其内容时触发（通常发生在地图缩放或加载时）。 对于创建 custom overlays 非常有用。 |
| load | [Event](#event)  | 地图初始化时触发（首次设置其中心和缩放比例时）。 |
| zoomstart | [Event](#event)  | 地图缩放即将更改时（例如在缩放动画之前）触发。 |
| movestart | [Event](#event)  | 当地图视图开始更改时触发（例如，用户开始拖动地图）。 |
| zoom | [Event](#event)  | 在缩放级别的任何更改（包括缩放和飞行动画）期间反复触发。 |
| move | [Event](#event)  | 在地图的任何移动过程中反复触发，包括平移和飞行动画。 |
| zoomend | [Event](#event)  | 在任何动画执行完毕地图更新后都会触发。 |
| moveend | [Event](#event)  | 	地图中心停止更改时触发（例如，用户停止拖动地图）。 |

### <span id="popup"> Popup 弹窗事件 </span>

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| popupopen | [	PopupEvent](#popupevent)  | 通过图层控件更改基本图层时触发。 |
| popupclose | [PopupEvent](#popupevent)  | 通过图层控件选择叠加图层时触发。 |
| autopanstart | [Event](#event)  |	通过图层控件取消选择叠加图层时触发。 |

### <span id="tooltip"> Tooltip 弹窗事件 </span>

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| tooltipopen | [TooltipEvent](#tooltipevent)  | 在地图上打开 tooltip（工具提示）时触发。 |
| tooltipclose | [TooltipEvent](#tooltipevent)  | 地图中的 tooltip（工具提示）关闭时触发。 |

### <span id="location"> Location 定位相关事件 </span>

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| locationerror | [ErrorEvent](#errorevent)  | 当获取地理位置（使用 locate 方法）失败时触发。 |
| locationfound | [LocationEvent](#locationevent)  | 当获取地理位置（使用 locate 方法）成功时触发。 |

### 交互事件

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| click | [MouseEvent](#mouseevent)  | 当用户点击地图时触发。 |
| dblclick | [MouseEvent](#mouseevent)   | 当用户双击地图时触发。 |
| mousedown | [MouseEvent](#mouseevent)   |	当用户在地图上按下鼠标按钮时触发。 |
| mouseup | [MouseEvent](#mouseevent)   |	当用户释放地图上的鼠标按钮时触发。 |
| mouseover | [MouseEvent](#mouseevent)  |	当鼠标进入地图时触发。 |
| mouseout | [MouseEvent](#mouseevent)  |	当鼠标离开地图时触发。 |
| mousemove | [MouseEvent](#mouseevent)  |	当鼠标移到地图上时触发。 |
| contextmenu | [MouseEvent](#mouseevent) |	当用户在地图上按下鼠标右键时触发，从而阻止默认浏览器上下文菜单显示，如果此事件上有侦听器。 当用户长按时，也会在移动设备上触发。 |
| keypress | [KeyboardEvent](#keyboardevent)  |	当用户在聚焦地图时按下键盘上输入字符时触发。 |
| keydown | [KeyboardEvent](#keyboardevent)  |	当地图聚焦时用户按下键盘上的键时触发。 与keypress事件不同，对于产生字符值的键和不产生字符值的键都会触发keydown事件。 |
| keyup | [KeyboardEvent](#keyboardevent)  |	当用户在地图被聚焦时从键盘上释放一个键时启动。 |
| preclick | [MouseEvent](#mouseevent)  |	在鼠标点击地图之前触发（当你希望在点击事件触发之前执行某些操作时可以使用）。 |


### 其它事件

| 事件名 | 数据 | 说明 |
| --- | --- | --- |
| zoomanim | [ZoomAnimEvent](#zoomanimevent) | 每个缩放动画至少触发一次。 对于连续缩放（如捏合缩放），在缩放过程中每帧触发一次。 |


#### <span id="event"> Event 事件</span>
    基本事件对象。 所有其他事件对象也包含这些属性。
| Property | 类型 | 说明 |
| --- | --- | --- |
| type | `String ` | 事件类型（例如，'click'）。 |
| target | `Object ` | 触发事件的对象。对于传播事件，传播链中触发事件的最后一个对象。 |
| sourceTarget | `Object ` | 最初触发该事件的对象。对于非传播的事件，这将与 target 相同。 |
| propagatedFrom | `Object ` | 对于传播的事件，将事件传播到其事件父级的最后一个对象。 |

#### <span id="layerscontrolevent"> LayersControlEvent 图层控制事件 </span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| layer | `Layer ` | 添加或删除的图层。 |
| name | `String ` | 添加或删除的图层的名称。 |

#### <span id="resizeevent"> ResizeEvent 调整尺寸事件 </span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| oldSize | `Point ` | 调整大小事件之前的旧尺寸。 |
| newSize | `Point ` | 调整大小事件后的新尺寸。 |

#### <span id="popupevent"> PopupEvent 弹窗事件 </span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| popup | `Popup ` | 被打开或关闭的弹出窗口。 |

#### <span id="errorevent"> ErrorEvent 错误事件 </span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| message | `String ` | 错误信息。 |
| code | `Number ` | 错误代码（如果适用）。 |

#### <span id="locationevent"> LocationEvent 位置事件</span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| latlng | `LatLng ` | 检测到用户的地理位置。 |
| bounds | `LatLngBounds ` | 用户所在区域的地理边界（相对于位置的准确性）。 |
| accuracy | `Number ` | 以米为单位的位置精度。 |
| altitude | `Number ` | 位置高于 WGS84 椭圆体的高度，以米为单位。 |
| altitudeAccuracy | `Number ` | 以米为单位的高度精度。 |
| heading | `Number ` | 以度为单位的行进方向，从真北顺时针计数。 |
| speed | `Number ` | 当前速度（以米/秒为单位）。 |
| timestamp | `Number ` | 获得位置的时间。 |

#### <span id="mouseevent"> MouseEvent 鼠标事件</span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| latlng | `LatLng ` | 	鼠标事件发生的地理点。 |
| layerPoint | `Point ` | 鼠标事件发生点相对于地图图层的像素坐标。 |
| containerPoint | `Point ` | 鼠标事件发生的点相对于地图容器的像素坐标。 |
| originalEvent | `DOMEvent ` | 触发此 Leaflet 事件的原始 DOM MouseEvent 或 DOM TouchEvent 。 |

#### <span id="keyboardevent  "> KeyboardEvent 键盘事件</span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| originalEvent | `DOMEvent ` | 触发此 Leaflet 事件的原始 DOM KeyboardEvent 。 |


#### <span id="zoomanimevent  "> ZoomAnimEvent 缩放动画事件</span>

| Property | 类型 | 说明 |
| --- | --- | --- |
| center | `LatLng ` | 	当前地图的中心 |
| zoom | `Number ` | 地图的当前缩放级别 |
| noUpdate | `Boolean ` | 由于此事件，图层是否应更新其内容 |


&nbsp;
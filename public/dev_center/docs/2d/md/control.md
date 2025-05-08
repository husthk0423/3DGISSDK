### <span id="control"> Control 控件 </span>

L.Control是一个实现地图控件的基类。负责处理定位。 所有其他的控件都是从这个类中延伸出来的。


##### Options 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

扩展 L.Control 的类将继承以下方法:

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |

##### Extension methods 扩展方法

每个控件都应该从 L.Control 扩展并（重新）实现以下方法。

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `onAdd(<Map> map)` | HTMLElement  | 应该返回控件的容器DOM元素，并在相关的地图事件上添加监听器。在 control.addTo(map)上调用。 |
| `onRemove(<Map> map)` |   | 可选的方法。应该包含所有清理代码，删除之前在 onAdd中添加的监听器。在 control.remove()中被调用。 |


### <span id="zoom"> Zoom 缩放 </span>

一个基本的缩放控件，有两个按钮（放大和缩小）。除非你把它的 zoomControl 选项 设置为 false。扩展了 Control。

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.zoom(<Control.Zoom options> options)` | 创建一个缩放控件 |

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `zoomInText` | String | '+' | 设置在 'zoom in' 按钮上的文字。 |
| `zoomInTitle`| String | 'Zoom in' | 设置在 'zoom in' 按钮上的标题。 |
| `zoomOutText` | String | '&#x2212' | 设置在 'zoom out' 按钮上的文字。 |
| `zoomOutTitle` | String | 'Zoom out' | 设置在 'zoom out' 按钮上的标题。 |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |


### <span id="layers"> Layers 图层 </span>

图层控件使用户能够在不同的基础图层之间进行切换，并打开/关闭覆盖物图层 (请看 详细示例)。扩展了 Control 。

#### 使用示例
    var baseLayers = {
        "Mapbox": mapbox,
        "OpenStreetMap": osm
    };

    var overlays = {
        "Marker": marker,
        "Roads": roadsLayer
    };

    L.control.layers(baseLayers, overlays).addTo(map);

#### baseLayers 和 overlays 参数是对象字面， layer 名作为键， Layer 对象是值:
    {
        "<someName1>": layer1,
        "<someName2>": layer2
    }

#### 图层名称可以包含 HTML，这使你可以为项目添加额外的样式:
    {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.layers(<Object> baselayers?, <Object> overlays?, <Control.Layers options> options?)` | 创建一个具有给定图层的图层控件。基本图层将用单选按钮切换，而覆盖物图层将用复选框切换。注意，所有的基本图层都应该在基本图层对象中传递，但在地图实例化过程中，只有一个图层应该被添加到地图中。 |

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `collapsed` | Boolean | true | 如果为 true, 该控件将被折叠成一个图标，并在鼠标悬停或触摸时展开。 |
| `autoZIndex`| Boolean | true | 如果为 true, 控件将以递增的顺序为其所有图层分配 zIndexes，以便在开/关它们时保留顺序。 |
| `hideSingleBase` | Boolean | false | 如果为 true, 当只有一个基础图层时，控件中的基础图层将被隐藏。 |
| `sortLayers` | Boolean | false | 是否对各图层进行排序。如果是 false, ，图层将保持它们被添加到控件中的顺序。 |
| `sortFunction` | Function | * | 一个 排序函数 ，当 sortLayers 为 true时，它将被用于对图层进行排序。该函数同时接收 L.Layer 实例和它们的名字，如 sortFunction(layerA, layerB, nameA, nameB)。默认情况下，它按照名字的字母顺序对图层进行排序。 |


##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `addBaseLayer(<Layer> layer, <String> name)` | string  | 在控件中添加一个具有给定名称的基础图层（单选按钮条目）。 |
| `addOverlay(<Layer> layer, <String> name)` | this  | 在控件中添加一个具有给定名称的覆盖物（复选框条目）。 |
| `removeLayer(<Layer> layer)` | 	this  | 从控件中移除给定的图层。 |
| `expand()` | this  | 如果是折叠的，则展开控制容器。 |
| `collapse()` | this  | 如果展开，则折叠控制容器。 |


##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |

### <span id="marker"> Marker 标记 </span>

L.Marker 用于在地图上显示可点击/可拖动的图标。扩展了 Layer。

#### 使用示例
    L.marker([50.5, 30.5]).addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.marker(<LatLng> latlng, <Marker options> options?)` | 给出一个地理位置和可选的参数，实例化一个Marker对象。 |

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | Icon | * | 用于渲染标记（marker）的图标实例。有关如何自定义标记（marker）图标的详细信息，请参阅 Icon 文档。如果未指定，L.Icon.Default 则使用公共实例。|
| `keyboard`| Boolean | true | 是否可以用键盘标记并按回车键进行点击。 |
| `title` | String | '' | 悬停在标记（marker）上时出现的浏览器 tooltip 提示文本内容（默认情况下没有 tooltip 提示）。 |
| `alt` | String | '' | 图标图像的 alt 属性的文本(便于访问)。 |
| `zIndexOffset` | 0 | * | 默认情况下，标记（marker）图像 zIndex 是根据其纬度自动设置的。如果您想将标记置于所有其他标记（marker）之上(或之下)，则使用此选项指定一个高值，如 1000(或高的负值)。 |
| `opacity` | Number | 1.0 | 标记（marker）的不透明度。 |
| `riseOnHover` | Boolean | false | 如果为 true，当你把鼠标悬停在它上面时，该标记（marker）会在其他标记之上。 |
| `riseOffset` | Number | 250 | 用于 riseOnHover 功能的 z-index 偏移。 |
| `pane` | String | 'markerPane' | Map pane 将添加标记图标的位置。 |
| `shadowPane` | String | 'shadowPane' | Map pane 将添加标记阴影的位置。 |
| `bubblingMouseEvents` | Boolean | false | 当为 true 时，此标记上的鼠标事件将触发地图上的相同事件(除非使用 L.DomEvent.stopPropagation）。 |

#### 可拖动的 marker 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `draggable` | Boolean | false | 标记（marker）是否可通过鼠标/触摸拖动。|
| `autoPan` | Boolean | false | 将此标记（marker）拖动到其边缘附近时是否平移地图。 |
| `autoPanPadding` | Point | Point(50, 50) |开始平移地图时距离边缘的距离（左/右和上/下，以像素为单位）。|
| `autoPanSpeed` | Number | 10 | 地图应该平移的像素数。 |

##### 继承自 交互层的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `interactive` | Boolean | true | 如果为 false，该图层将不会触发鼠标事件，并作为底层地图的一部分。 |

##### 继承自 Layer 图层的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `attribution` | String | null | 要在属性控件中显示的字符串，例如："© OpenStreetMap contributors"。它描述了一些图层信息，通常是对版权所有者和瓦片提供者的法律义务。 |

#### Events 事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `move` | Event  | 当标记通过 setLatLng 或通过 dragging 移动时触发该事件，并且旧坐标和新坐标会作为 oldLatLng、latlng 包含在事件参数中。 |

#### Dragging events 拖拽事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `dragstart` | Event  |当用户开始拖动标记时触发。 |
| `movestart` | Event  |当标记开始拖动时触发。 |
| `drag` | Event  |	当用户拖动标记时重复触发。 |
| `dragend` | DragEndEvent  |当用户停止拖动标记时触发。 |
| `moveend` | Event  |当标记停止拖动时触发。 |

#### 继承自 交互层的鼠标事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `click` | MouseEvent  |当用户 click（或 tap）图层时触发。 |
| `dblclick` | MouseEvent  | 当用户 double-click（或 double-tap）图层时触发。 |
| `mousedown` | MouseEvent  | 当用户在图层上按下鼠标按钮时触发。 |
| `mouseup` | MouseEvent  |当用户释放在图层上按下的鼠标按钮时触发。 |
| `mouseover` | MouseEvent  |当鼠标进入图层时触发。 |
| `mouseout` | MouseEvent  |当鼠标离开图层时触发。 |
| `contextmenu` | MouseEvent  |当用户在图层上点击右键时触发，如果此事件有监听者，则防止显示默认的浏览器上下文菜单。在移动设备上，当用户长按时，也会在手机上触发。 |


#### 继承自 Layer 图层 的事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `add` | Event  | 在图层添加到地图后触发 |
| `remove` | Event  | 从地图中移除图层后触发 |
 
#### 继承自 Layer 的弹出（Popup）事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `popupopen` | PopupEvent  | 当绑定到该层的 popup 打开时触发 |
| `popupclose` | PopupEvent  | 当绑定到该层的 popup 关闭时触发 |

#### 继承自 Layer 图层的工具提示（Tooltip）事件

| 事件 | 数据 | 说明 |
| --- | --- |  --- |
| `tooltipopen` | TooltipEvent  | 当绑定到该层的 tooltip 打开时触发。 |
| `tooltipclose` | TooltipEvent  | 当绑定到该层的 tooltip 关闭时触发。 |

#### Methods 方法
除了共享层方法，如 addTo()、remove()、类似 bindPopup() 的 popup 方法之外，你还可以使用以下方法：

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getLatLng()` | 	LatLng  | 返回标记的当前地理位置。 |
| `setLatLng(<LatLng> latlng)` | this  | 将标记位置更改为指定点。 |
| `setZIndexOffset(<Number> offset)` | 	this  | 更改标记的 zIndex 偏移量 。 |
| `getIcon()`| Icon  | 返回标记使用的当前图标 |
| `setIcon(<Icon> icon)` | this  | 更改标记图标。 |
| `setOpacity(<Number> opacity)` | this  | 更改标记的透明度。 |


#### 其它方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `toGeoJSON(<Number> precision?)` | Object  | precision 是坐标的小数位数，默认值是6位。 返回用 GeoJSON 表示的标记内容（作为一个GeoJSON Point特征）。 |

#### 继承自 Layer 图层的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `addTo(<Map|LayerGroup> map)` | this  | 将图层添加到指定的地图或图层组（layer group）。 |
| `remove()` | this  | 将图层添加到指定的地图或图层组（layer group）。 |
| `removeFrom(<Map> map)` | this  | 从指定的地图中删除图层 |
| `removeFrom(<LayerGroup> group)` | this  | 从指定的 LayerGroup 中删除图层。 |
| `getPane(<String> name?)` | HTMLElement  | 返回代表地图上指定窗格（pane）的 HTMLElement。如果 name 被省略，则返回该层的窗格。 |
| `getAttribution()` | String  | 由 attribution 控件使用，返回 attribution 选项。 |

#### 继承自 Layer 图层的 Popup 方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `bindPopup(<String|HTMLElement|Function|Popup> content, <Popup options> options?)` | this  | 将弹出窗口绑定到传入的图层 content 并设置必要的事件侦听器。如果一个Function被传递，它将接收图层作为第一个参数，并应返回 String 或 HTMLElement。 |
| `unbindPopup()` | this  | 移除之前用bindPopup绑定的弹出窗口。 |
| `openPopup(<LatLng> latlng?)` | this  | 在指定的 latlng 处打开绑定的弹出窗口，如果没有指定 latlng，则在默认的锚点打开弹出窗口。 |
| `closePopup()` | this  | 如果弹出窗口（popup）已打开，则关闭绑定到该层的弹出窗口。 |
| `togglePopup()` | this  | 根据当前状态打开或关闭绑定到该层的弹出窗口。 |
| `isPopupOpen()` | boolean  | 如果该层绑定的弹出窗口当前已打开，则返回 true。 |
| `setPopupContent(<String|HTMLElement|Popup> content)` | this  | 设置绑定到该层的弹出窗口的内容。 |
| `getPopup()` | Popup  | 返回绑定到该层的弹出窗口。 |

#### 继承自 Layer 图层的 Tooltip 方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `bindTooltip(<String|HTMLElement|Function|Tooltip> content, <Tooltip options> options?)` | this  | 将工具提示（tooltip）绑定到传入的图层 content 并设置必要的事件侦听器。如果一个 Function 被传递，它将接收图层作为第一个参数，并应返回 String 或 HTMLElement。 |
| `unbindTooltip()` | this  | 移除之前用 bindTooltip 绑定的工具提示（tooltip）。 |
| `openTooltip(<LatLng> latlng?)` | this  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |
| `closeTooltip()` | this  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |
| `toggleTooltip()` | this  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |
| `isTooltipOpen()` | boolean  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |
| `setTooltipContent(<String|HTMLElement|Tooltip> content)` | this  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |
| `getTooltip()` | Tooltip  | 在指定的 latlng 处打开绑定的工具提示（tooltip），如果没有指定 latlng，则在默认的锚点打开工具提示（tooltip）。 |


#### 继承自 Evented 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `on(<String> type, <Function> fn, <Object> context?)` | this  | 为对象的特定事件类型添加一个监听函数（fn）。你可以选择性地指定监听器的上下文（这个关键字将指向的对象）。你也可以传递几个空格分隔的类型（例如，'click dblclick'）。 |
| `on(<Object> eventMap)` | this  | 添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}。 |
| `off(<String> type, <Function> fn?, <Object> context?)` | this  | 移除一个先前添加的监听器函数。如果没有指定函数，它将从对象中删除该特定事件的所有监听器。请注意，如果您向 on 传递了一个自定义的上下文，您必须向 off 传递相同的上下文，以便删除监听器。 |
| `off(<Object> eventMap)` | this  | 删除一组类型/侦听器 |
| `off()` | this  | 移除该对象上所有事件的所有监听器。这包括隐含的附加事件。 |
| `fire(<String> type, <Object> data?, <Boolean> propagate?)` | this  | 触发指定类型的事件。您可以选择提供一个数据对象——侦听器函数的第一个参数将包含其属性，事件可以选择性地传播到事件父级。 |
| `listens(<String> type)` | Boolean  | 如果一个特定的事件类型有任何监听器连接到它，则返回 true。 |
| `once(…)` | this  | 与on(...)的行为一样，不过监听器只会被触发一次后然后被删除。 |
| `addEventParent(<Evented> obj)` | this  | 向父级 Evented 添加事件 |
| `removeEventParent(<Evented> obj)` | this  | 删除之前向父级 Evented 添加的事件 |
| `addEventListener(…)` | this  | 同 on(…) |
| `removeEventListener(…)` | this  | 同 off(…) |
| `clearAllEventListeners(…)` | this  | 同 off() |
| `addOneTimeEventListener(…)` | this  | 同 once(…) |
| `fireEvent(…)` | this  | 同 fire(…) |
| `hasEventListeners(…)` | 同 listens(…) |


#### Properties 属性

Interaction handlers 交互处理程序
交互处理程序是一个标记（marker）实例的属性，允许你在运行时控制交互行为，启用或禁用某些功能，如拖动（见 Handler 方法）。示例：
    marker.dragging.disable();

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `dragging` | Handler  | 标记（marker）拖动处理程序（通过鼠标和触摸），仅当标记 (marker) 在地图上时有效（否则设置 marker.options.draggable）。 |


### 比例尺

一个简单的比例尺控件，以公制（m/km）和英制（mi/ft）系统显示当前屏幕中心的比例。扩展了 Control。

##### 使用示例
    L.control.scale().addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.scale(<Control.Scale options> options?)` | 用给定的选项创建一个比例尺控件。 |

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `maxWidth` | Number | 100 | 控件的最大宽度，单位是像素。宽度是动态设置的，以显示圆形值（如100、200、500）。 |
| `metric`| Boolean | True | 是否显示公制比例线（米/公里）。 |
| `imperial` | Boolean | True | 是否显示英制比例线（英里/英尺）。 |
| `updateWhenIdle` | Boolean | false | 如果为 true, 控件在 移动结束时被更新，否则它总是最新的( move 时更新)。 |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |



### 测量控件

Leaflet 地图的坐标、线和面积测量控件

##### 使用示例
    L.control.measure(options).addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.measure(<Control.measure options> options?)` | 用给定的选项创建一个测量控件。 |

#### Options 选项

| 选项 | 类型  | 说明 |
| --- | ---  | --- |
| `title` | String  | 标题 |
| `collapsed`| String | 默认是否折叠 |
| `color` | Color  | 绘制线或者面的颜色 |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |



### 地图打印

一个打印插件，允许用户直接从浏览器打印整页地图

##### 使用示例
    L.control.browserPrint().addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.browserPrint(<Control.browserPrint options> options)` | 用给定的选项创建一个打印控件。 |

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | String | 'Print map' | 	设置显示为打印按钮的工具提示的文本 |
| `documentTitle`| String | '' | 设置显示为打印页面标题的文本 |
| `printModes` | Array | ["Portrait", "Landscape", "Auto", "Custom"] | 收集页面打印操作 |
| `printLayer` | Leaflet tile layer | null | 是否只打印当前图层，而不是所有图层 |
| `closePopupsOnPrint` | Boolean | true | 是否需要强制关闭打印地图的弹出窗口 |
| `contentSelector` | String | '[leaflet-browser-print-content]' | 打印地图的内容选择器将选择并动态注入打印地图上的内容 |
| `pagesSelector` | String | '[leaflet-browser-print-pages]' | 打印地图的页面选择器将选择并动态注入打印地图上的其他页面内容 |
| `manualMode` | Boolean | false| 是否使用外部按钮打印地图 |
| `customPrintStyle` | Polyline options | { color: "gray", dashArray: "5, 10", pane: "customPrintPane" } | 自定义打印上的样式 |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |


##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |


### 卷帘控件

一个用于添加分屏以比较两个地图叠加层的 Leaflet 控件

##### 使用示例
    L.control.sideBySide(layer1, layer2).addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.control.sideBySide(layer1, layer2)` | 添加两个图层，并创建卷帘控件并将其添加到地图中; |

#### Options 选项

| 选项 | 类型 | 说明 |
| --- | --- |  --- |
| `leftLayers` | L.Layer or array  | 要在地图左侧显示的传单图层或图层数组。添加到此数组中的地图的任何图层都将显示在左侧 |
| `rightLayers`| L.Layer or array  | 要在地图右侧显示的传单图层或图层数组。添加到此数组中的地图的任何图层都将显示在右侧。这些不应与左侧中的任何图层相同 |
| `options` | Object  | 配置选项 |
| `options.padding` | Number | 滑块最小值/最大值和屏幕边缘之间的填充（以像素为单位） |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `setLeftLayers` | this  | 设置左侧的图层 |
| `setRightLayers`| this  | 设置右侧的图层 |

##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |


### 绘制几何图形

用于绘制、编辑、剪切、拖动和捕捉图层，如标记、圆形、矩形、折线、多边形、图层组、geoJSON、MultiPolygons、MultiLineStrings等

##### 使用示例
    L.marker(options).addTo(map);

#### Creation

| 构造函数 | 说明 |
| --- | --- |
| `L.marker(options)` | 创建绘制几何图形控件|

#### Options 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `drawMarker` | Boolean | true | 显示标记点按钮 |
| `drawCircleMarker` | Boolean | true | 显示标记圆按钮 |
| `drawPolygon` | Boolean | true | 显示绘制多边形按钮 |
| `drawRectangle` | Boolean | true | 显示绘制矩形按钮 |
| `drawCircle` | Boolean | true | 显示绘制圆按钮 |
| `drawPolyline` | Boolean | true | 显示绘制线按钮 |
| `editMode` | Boolean | true |  显示编辑按钮 |
| `removalMode` | Boolean | true | 显示删除按钮 |
| `cutPolygon` | Boolean | true | 显示剪切按钮 |
| `rotateMode` | Boolean | true | 显示撤销按钮 |
| `editControls` | Boolean | true | 显示移动按钮 |

##### 继承自 Control 的选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | String | 'topright' | 控件的位置（地图的一个角）。可能的值是 'topleft'、 'topright'、 'bottomleft' 或 'bottomright' |

#### Methods 方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `addControls(position)` |   | 将工具栏添加到地图。 |
| `addControls()` |   | 从地图中移除工具栏。 |
| `toggleControls()` | 	  | 切换工具栏是否可见。 |
| `toggleControls()`| Boolean  | 如果工具栏在地图上可见，则返回true |


##### 继承自 Control 的方法

| Method | 返回值 | 说明 |
| --- | --- | --- |
| `getPosition()` | string  | 返回控件的位置。 |
| `setPosition(<string> position)` | this  | 设置控件的位置。 |
| `getContainer()` | 	HTMLElement  | 返回包含该控件的 HTMLElement。 |
| `addTo(<Map> map)`| this  | 将控件添加到给定的地图中。 |
| `remove()` | this  | 将控件从当前活动的地图上删除。 |

&nbsp;
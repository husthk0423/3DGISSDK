## 快速开始

本文将带你迅速了解 deumap javascript API 的基本使用，学习如何基于 deumap javascript api
开始地图应用的开发，使您在最短时间内成为 webgis 的开发者。

## 第一个示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>图层控制</title>
    <link rel="stylesheet" href="../../dist/DEUMap.css" />
    <style type="text/css">
      html,
      body,
      html,
      body {
        margin: 0;
        height: 100%;
      }

      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div id="map"></div>
    <script src="../../dist/DEUMap.js"></script>
    <script type="text/javascript">
      var map = new DEUMap.DMap({
        target: 'map',
        layers: [
          new DEUMap.layer.Group({
            title: 'Base maps',
            layers: [
              new DEUMap.layer.Group({
                title: 'Water color with labels',
                type: 'base',
                combine: true,
                visible: false,
                layers: [
                  new DEUMap.layer.Tile({
                    source: new DEUMap.source.Stamen({
                      layer: 'watercolor'
                    })
                  }),
                  new DEUMap.layer.Tile({
                    source: new DEUMap.source.Stamen({
                      layer: 'terrain-labels'
                    })
                  })
                ]
              }),
              new DEUMap.layer.Tile({
                title: 'Water color',
                type: 'base',
                visible: false,
                source: new DEUMap.source.Stamen({
                  layer: 'watercolor'
                })
              }),
              new DEUMap.layer.Tile({
                title: '高德',
                type: 'base',
                visible: true,
                source: new DEUMap.source.XYZ({
                  url:
                    'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
                })
              })
            ]
          }),
          new DEUMap.layer.Group({
            title: 'Overlays',
            fold: 'open',
            layers: [
              new DEUMap.layer.Image({
                title: 'Countries',
                source: new DEUMap.source.ImageArcGISRest({
                  ratio: 1,
                  params: {
                    LAYERS: 'show:0'
                  },
                  url:
                    'https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer'
                })
              })
            ]
          })
        ],
        view: new DEUMap.View({
          center: DEUMap.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
          zoom: 6
        })
      });

      var layerSwitcher = new DEUMap.control.LayerSwitcher({
        activationMode: 'click',
        tipLabel: '', // 鼠标移入展示提示，默认不传值得情况下是“图层透明度”
        groupSelectStyle: 'none' // Can be 'children' [default], 'group' or 'none'
      });
      map.addControl(layerSwitcher);
    </script>
  </body>
</html>
```

### 示例展示 <p align="right"><a href="example/control/control_LayerSwitcher.html" target="_blank">Demo</a></p>

<iframe width="100%" height="430" src="example/control/control_LayerSwitcher.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 分步剖析上面示例

- deumap javascript API 入口脚本和样式外链

```html
<link rel="stylesheet" href="../../dist/DEUMap.css" />
<script type="text/javascript" src="../../dist/DEUMap.js"></script>
```

- 创建地图容器

注意：容器必须存在

```html
<div id="map"></div>
```

- 指定地图容器大小

```css
html,
body,
#map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
```

- 创建地图

> 默认需要传入两个参数，第一个为上面创建的容器 id，第二个参数为地图参数配置，配置详细说明见[配置项](map/map-options.md)

```javascript
var map = new DEUMap.DMap({
  target: 'map',
  layers: [
    new DEUMap.layer.Group({
      title: 'Base maps',
      layers: [
        new DEUMap.layer.Group({
          title: 'Water color with labels',
          type: 'base',
          combine: true,
          visible: false,
          layers: [
            new DEUMap.layer.Tile({
              source: new DEUMap.source.Stamen({
                layer: 'watercolor'
              })
            }),
            new DEUMap.layer.Tile({
              source: new DEUMap.source.Stamen({
                layer: 'terrain-labels'
              })
            })
          ]
        }),
        new DEUMap.layer.Tile({
          title: 'Water color',
          type: 'base',
          visible: false,
          source: new DEUMap.source.Stamen({
            layer: 'watercolor'
          })
        }),
        new DEUMap.layer.Tile({
          title: '高德',
          type: 'base',
          visible: true,
          source: new DEUMap.source.XYZ({
            url:
              'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
          })
        })
      ]
    }),
    new DEUMap.layer.Group({
      title: 'Overlays',
      fold: 'open',
      layers: [
        new DEUMap.layer.Image({
          title: 'Countries',
          source: new DEUMap.source.ImageArcGISRest({
            ratio: 1,
            params: {
              LAYERS: 'show:0'
            },
            url:
              'https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer'
          })
        })
      ]
    })
  ],
  view: new DEUMap.View({
    center: DEUMap.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
    zoom: 6
  })
});

var layerSwitcher = new DEUMap.control.LayerSwitcher({
  activationMode: 'click',
  tipLabel: '', // 鼠标移入展示提示，默认不传值得情况下是“图层透明度”
  groupSelectStyle: 'none' // Can be 'children' [default], 'group' or 'none'
});
map.addControl(layerSwitcher);
```

## 关于插件的使用说明(支持 openlayers 原生扩展的控件)

| 插件    | 简介                     | 地址                                        | 备注                         |
| ------- | ------------------------ | ------------------------------------------- | ---------------------------- |
| 标绘    | 支持军事标绘功能扩展     | `https://github.com/sakitam-fdd/ol-plot`    | 支持单独配合 openlayers 使用 |
| Echarts | Echarts 图表的地图扩展   | `https://github.com/sakitam-fdd/ol3Echarts` | 支持单独配合 openlayers 使用 |
| mapv    | 百度出品的地图可视化工具 | `https://github.com/huiyan-fe/mapv`         | 支持单独配合 openlayers 使用 |

# 基于Cesium扩展的前端SDK,兼容Cesium 
## 基本介绍  
本产品能快速开发三维GIS应用，为中小开发团队节省开发成本，SDK源码联系方式附最后  
### 主要功能 
1 后处理：下雨、下雪、雷电、雾效 等 

2 水特效：涟漪水、水岸线效果、倒影水 等 

3 光照：边缘光，泛光 、聚光、矩形光、点光源 

4 地形：地形抬高、坡向分析、地形挖掘等  

5 其他综合应用：丁达尔效应、体积云、淹没分析、倾斜数据处理等 


## 技术架构             
express+cesium
### 介绍   

### 依赖版本 
| 依赖名称| 版本号 | 
|---------|---------|
| node   | 18.20.5   | 
| npm   | 10.8.2    | 
| express   | 4.21.2   | 
| cesium  | 1.99    |  

### 部分shader代码（多个倾斜数据压平）    
```
uniform int u_dataTexture_width;
uniform int u_dataTexture_height;

vec4 getClippingPlane(
    highp sampler2D packedClippingPlanes,
    int clippingPlaneNumber,
    mat4 transform
) {
    int pixY = clippingPlaneNumber / u_dataTexture_width;
    int pixX = clippingPlaneNumber - (pixY * u_dataTexture_width);
    float pixelWidth = 1.0 / float(u_dataTexture_width);
    float pixelHeight = 1.0 / float(u_dataTexture_height);
    float u = (float(pixX) + 0.5) * pixelWidth; // sample from center of pixel
    float v = (float(pixY) + 0.5) * pixelHeight;
    vec4 plane = texture2D(packedClippingPlanes, vec2(u, v));
    // transform to  modelCoordinate
    return czm_transformPlane(plane, transform);
}


float clip(vec3 positionMC,inout float deltaY,vec4 fragCoord, sampler2D clippingPlanes, mat4 clippingPlanesMatrix, sampler2D multiClippingPlanesLength,inout bool UNION_State)
    {

    vec4 position = czm_windowToEyeCoordinates(fragCoord);
    // vec4 MCPosition=czm_inverseModelView*position;
    vec3 clipNormal = vec3(0.0);
    vec3 clipPosition = vec3(0.0);
    float clipAmount = 0.0;
    float pixelWidth = czm_metersPerPixel(position);
    int count = 0;
    for (int i = 0; i < u_collectionLength; ++i)
    {
        float PlaneMinY=0.0;
        bool thisOneClipped = true;
        float thisCollectionClipAmount = 0.;
        vec2 _ST= vec2((float(i) + 0.5)/float(u_collectionLength), 0.5);
        vec4 _collectionTEXT=texture2D(multiClippingPlanesLength,_ST);
        int thisCollectionLength = int(_collectionTEXT.w);
        for (int j = 0; j < u_maxLength; ++j)
        {
            thisCollectionLength--;
            vec4 clippingPlane = getClippingPlane(clippingPlanes, count, clippingPlanesMatrix);
            // deltaY=(-unifromZ+positionMC.y)-clippingPlane.y;
            deltaY=positionMC.y-clippingPlane.y;
            clipNormal = clippingPlane.xyz;
            clipPosition = -clippingPlane.w  * clipNormal;
            // deltaY=positionMC.y-clipPosition.y;

            // vec4 modelClippingPosition=czm_inverseModelViewProjection*vec4(-clipPosition,1.0);
            // deltaY=positionMC.y-modelClippingPosition.y;
            float amount = dot(clipNormal, (position.xyz - clipPosition))/ pixelWidth;
            thisCollectionClipAmount = max(amount, thisCollectionClipAmount);
            thisOneClipped = thisOneClipped && (amount <= 0.0);
            PlaneMinY=min(positionMC.y,PlaneMinY);
            // thisOneClipped = thisOneClipped && (amount <=0.);
            count++;
            if (thisCollectionLength == 0) break;
        }
        #ifdef HAS_UNION_MULTI_CLIPPING_REGIONS
        if (thisOneClipped)
        {
            if (clipAmount == 0.0)
             {clipAmount = thisCollectionClipAmount; }
            else if (thisCollectionClipAmount != 0.0)
            { clipAmount = min(clipAmount, thisCollectionClipAmount); }

            UNION_State=true;

        }
        #endif
        #ifndef HAS_UNION_MULTI_CLIPPING_REGIONS
        if (thisOneClipped)
        {
            // float DELTA_Y=(-unifromZ+positionMC.y)-PlaneMinY;
            // float DELTA_Y=positionMC.y-PlaneMinY;
            // clipAmount=DELTA_Y*0.5;
            // if(clipAmount>0.1)
              discard;
        }
        if (clipAmount == 0.0)
        {
            clipAmount = thisCollectionClipAmount;
        }
        else if (thisCollectionClipAmount != 0.0)
        {
            clipAmount = min(clipAmount, thisCollectionClipAmount);
        }
        #endif
    }
    return clipAmount;



    }
void modelMultiClippingPlanesStage(vec3 positionMC,inout vec4 color,inout bool UNION_State)
{
    float deltaY;
    float clipDistance = clip(positionMC,deltaY,gl_FragCoord, u_model_clippingPlanes, u_model_clippingPlanesMatrix,u_multiClippingPlanesLength,UNION_State);
   
    vec4 clippingPlanesEdgeColor = vec4(0.5922, 0.902, 0.5647, 1.0);
    clippingPlanesEdgeColor.rgb = clippingPlanesEdgeColor.xyz;
    float clippingPlanesEdgeWidth = u_clippingPlanesEdgeStyle.a;

    if (clipDistance > 0.0 && clipDistance < clippingPlanesEdgeWidth) {
        color = clippingPlanesEdgeColor;
    }
//    color=vec4(clipDistance);


    // if(clipDistance>-5.&&clipDistance<0.)
    // {
    //     if(deltaY>-5.5)
    //        discard;
    // }
}
```
### 快速开始 
```
npm install

npm run start
```
<img width="844" alt="微信图片_20250508185236" src="https://github.com/user-attachments/assets/7cf61d7e-9428-4989-9627-e4567c854f3b" />


## 应用场景
## 产品截图   
<img width="1280" alt="微信图片_20250508184709" src="https://github.com/user-attachments/assets/ee013799-0b71-49c2-b145-64064634b200" />

<img width="1226" alt="微信图片_20250508182956" src="https://github.com/user-attachments/assets/4add2455-f641-4806-9b01-1099667e5f83" />
<img width="1280" alt="微信图片_20250508182952" src="https://github.com/user-attachments/assets/7efe39b3-7a01-4f62-8b6d-76f691e4082b" />
<img width="1266" alt="微信图片_20250508182946" src="https://github.com/user-attachments/assets/3151fde8-ecab-4aa2-8d86-8e3f20d3aa5b" />
<img width="1280" alt="微信图片_20250508182931" src="https://github.com/user-attachments/assets/ade5280b-3951-47de-b3e0-6a9325d156bd" />
<img width="1280" alt="微信图片_20250508183005" src="https://github.com/user-attachments/assets/895b08b3-a65b-413e-9f08-d5f08eb4b4d5" />
<img width="1280" alt="微信图片_20250508183001" src="https://github.com/user-attachments/assets/2cdc1eed-73ff-4b16-ada4-fddd488b9753" />

<img width="1280" alt="微信图片_20250508184208" src="https://github.com/user-attachments/assets/38a68fcd-2eb0-4653-88e6-8be3690ff1e4" />
<img width="1280" alt="微信图片_20250508184206" src="https://github.com/user-attachments/assets/c064d314-54e6-4644-9829-ba348da0cc31" />
<img width="1280" alt="微信图片_20250508184203" src="https://github.com/user-attachments/assets/c3b51e5b-dda4-4b80-8674-9450db8b01f1" />
<img width="1280" alt="微信图片_20250508184200" src="https://github.com/user-attachments/assets/98bf9dc8-2909-4245-8edd-0d3cd11e277c" />
<img width="1280" alt="微信图片_20250508184156" src="https://github.com/user-attachments/assets/df1e3a10-851b-4bef-a782-460d0c46b1f4" />
<img width="1280" alt="微信图片_20250508184152" src="https://github.com/user-attachments/assets/368420d3-180d-46a4-95a0-64c80660a159" /> 

## 联系  
 ## 1 完整版本(SDK)、工作内推（武汉） 

 <img src="https://github.com/user-attachments/assets/16a23a4f-2687-4848-8be7-b39eae562ee1" width="400" height="400"> 
 
  ## 2 请我喝咖啡  
  
   <img src="https://github.com/user-attachments/assets/bf266697-9710-46ef-9673-9bd6c4d4acfd" width="400" height="400"> 



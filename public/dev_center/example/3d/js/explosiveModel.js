const { Model, CustomShader, Ellipsoid, Transforms, UniformType, Cartesian3, PrimitiveCollection, HeadingPitchRoll } = Cesium;
export default class ExplosiveModel {
  constructor(viewer) {
    this.viewer = viewer;
    this.modelCollection = new PrimitiveCollection();
    this.models = {};

    this.viewer.scene.primitives.add(this.modelCollection);
  }

  /**
   * 创建一个可爆炸的模型实体
   * @param {*} entityData id,modelUrl,x,y,z,hpr
   */
  createExplosiveModel(entityData) {
    const { id, modelUrl, x, y, z, hpr = new HeadingPitchRoll(0, 0, 0), } = entityData;
    const model = this.modelCollection.add(
      Model.fromGltf({
        gltf: modelUrl, // "./CesiumMilkTruck.glb",
        customShader: new CustomShader(this._getCustomShader()),
        modelMatrix: Transforms.headingPitchRollToFixedFrame(
          Cartesian3.fromDegrees(x, y, z),
          hpr,
          Ellipsoid.WGS84,
          Transforms.localFrameToFixedFrameGenerator("north", "west")
        ),
      })
    );
    model.readyPromise.then((model) => {
      this.viewer.camera.flyToBoundingSphere(model.boundingSphere, {
        duration: 0.5,
      });
    });
    // this.models.push(model);
    this.models[id] = model;
  }

  modelExplode(primitive) {
    primitive.customShader?.setUniform("u_flag", 0);

    const timer = window.setTimeout(() => {
      this.modelExplodeStop(primitive);
      window.clearTimeout(timer);
    }, 600);
  }
  modelExplodeStop(primitive) {
    primitive.customShader?.setUniform("u_flag", 1);
  }

  modelExplodeById(id) {
    const model = this.models[id];
    if (model) {
      model.customShader?.setUniform("u_flag", true);
    }
  }

  getById(id) {
    return this.models[id];
  }

  removeAll() {
    // this.models.forEach(model=>{
    //     model.destroy();
    // });
    this.modelCollection = this.modelCollection && this.modelCollection.destroy();
    this.models = {};
  }

  removeById(id) {
    if (this.models[id]) {
      this.modelCollection.remove(this.models[id]);
      delete this.models[id];
      console.log(this.models);
    }
  }

  _getCustomShader() {
    return {
      uniforms: {
        u_flag: {
          type: UniformType.INT,
          value: 2,
        },
        // u_drag: {
        //     type: Cesium.UniformType.VEC2,
        //     value: new Cesium.Cartesian2(0.0, 0.0),
        // },
        u_speed: {
          type: UniformType.FLOAT,
          value: 3.0
        }
        // czm_frameNumber:{
        //     type: Cesium.UniformType.FLOAT,
        //     value: 1.0
        // },

      },
      //positionMC +=(vsInput.attributes.normalMC.x , vsInput.attributes.normalMC.y ,0.02 * u_drag.x *  vsInput.attributes.normalMC.z);
      //positionMC += vec3(a_vertex.x ,a_vertex.y ,a_vertex.z)  * vsInput.attributes.normalMC;
      //positionMC += vsInput.attributes.normalMC  * vsInput.attributes.normalMC;
      vertexShaderText:
        `attribute vec4 position;
        void vertexMain(VertexInput vsInput, inout vec3 positionMC)
        {
            if(u_flag == 0) {
                float cycle = u_speed * mod(czm_frameNumber , 100.0);
                positionMC += vsInput.attributes.normalMC * position.xyz;
                positionMC += 0.01 * cycle * vsInput.attributes.normalMC;
            }
            else if(u_flag == 1) {
                positionMC += 0.01 * 300.0 * vsInput.attributes.normalMC;
            }
            else
            positionMC += 0.01  * vsInput.attributes.normalMC;
        }`,
      // material.diffuse = vec3(flagColor);
      // fragmentShaderText: `
      // void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
      //     gl_FragColor

      // }
      // `
    };
  }
}

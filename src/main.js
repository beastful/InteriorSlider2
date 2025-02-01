import './style.css'
import QueueEventEmitter from '@voxelful/queueeventemitter'
import MultiMediator from '@voxelful/multimediator'
import { ThreeDefaults } from './classes/ThreeDefaults'
import { Mesh } from 'three';
import { BoxGeometry } from 'three';
import { MeshNormalMaterial } from 'three';
import { Pos } from './classes/Pos';
import { ButtonLeft } from './classes/UI'
import { ButtonRight } from './classes/UI'
import { lerp } from './classes/utils'
import { Model } from './classes/Model'
import { Slider } from './classes/Slider';
import { MeshBasicMaterial } from 'three';
import { AnimationLoader } from 'three';
import { ConfiguredMesh } from './classes/ConfiguredMesh';
import { Vector3 } from 'three';
import { HideChip } from './classes/HideChip';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MultiplyBlending } from 'three';
import { DoubleSide } from 'three';
import uniqolor from 'uniqolor';
import house_1_layer_1_url from './models/house_1_skeleton_layer_1.glb?url'
// import house_1_layer_2_url from './models/house_1_skeleton_layer_2.glb?url'
import house_2_url from './models/house_2_skeleton.glb?url'
import house_3_url from './models/house_3_skeleton.glb?url'
import house_5_url from './models/house_5_skeleton.glb?url'
import house_4_url from './models/house_4_skeleton.glb?url'
import house_40_url from './models/house_40_skeleton.glb?url'
import { MeshStandardMaterial } from 'three';
import { MeshPhongMaterial } from 'three';
import { MeshLambertMaterial } from 'three';
import { AmbientLight } from 'three';
import { TextureLoader } from 'three';
import { Texture } from 'three';
import { MeshPhysicalMaterial } from 'three';
import { MeshTransmissionMaterial } from '@pmndrs/vanilla'
import envMapUrl from './models/env2.hdr?url'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { PMREMGenerator } from 'three';
import { BackSide } from 'three';
import { Color } from 'three';

new Slider()
new ButtonLeft()
new ButtonRight()
new ThreeDefaults().scene.add(new AmbientLight(0xFFFFFF, 1))

class GlobalEnvMap extends QueueEventEmitter {
  static instance = null;
  constructor() {
    super()
    if (GlobalEnvMap.instance != null) return GlobalEnvMap.instance
    GlobalEnvMap.instance = this
    this.loading_screen = new MultiMediator('loading_screen')
    this.loading_screen.emit('wait')
    this.loaded = false
    this.env = null
  }
  load() {
    const pmremGenerator = new PMREMGenerator(new ThreeDefaults().renderer);
    const hdriLoader = new RGBELoader()
    hdriLoader.load(envMapUrl, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      this.loaded = true
      this.env = envMap
      this.emit('load')
      this.loading_screen.emit('load')
    });
  }
  getEnv(callback) {
    if (this.loaded) {
      callback(this.env)
    } else {
      this.load()
      this.on('load', () => {
        callback(this.env)
      })
    }
  }
}

new GlobalEnvMap().getEnv((envMap) => {
  console.log(envMap)
})

class ModelMesh extends ConfiguredMesh {
  constructor(model, mediator) {
    super(mediator)
    this.loading_screen = new MultiMediator('loading_screen')
    this.model = model
    this.useModel(this.model)
    
    this.tags = this.model.name.split('_')
    this.model.material = new MeshBasicMaterial({
      color: new Color('#eaeaea'),
      transparent: true,
      side: DoubleSide,
    })

    this.model.scale.multiplyScalar(0.2)
    this.model.material.needsUpdate = true;
    if (this.tags.includes('hide')) {
      new HideChip(this.model, this)
    }

    if (this.tags.includes('glass')) {
      new GlobalEnvMap().getEnv((envMap) => {
        this.model.material = new MeshPhysicalMaterial({
          envMap: envMap,
          metalness: .9,
          roughness: .05,
          envMapIntensity: 0.1,
          clearcoat: 1,
          transparent: true,

          opacity: .5,
          reflectivity: 0.1,
          // refractionRatio: 0.985,
          ior: 0.9,
          side: DoubleSide,
        })
      })
    }

    if (this.tags.includes('wather')) {
      new GlobalEnvMap().getEnv((envMap) => {
        this.model.material = new MeshPhysicalMaterial({
          color: new Color('#708090'),
          envMap: envMap,
          metalness: .9,
          roughness: .05,
          envMapIntensity: 0.9,
          clearcoat: 1,
          transparent: true,

          opacity: .5,
          reflectivity: 0.2,
          // refractionRatio: 0.985,
          ior: 0.9,
          side: DoubleSide,
        })
      })
    }
    if (this.tags.includes('map')) {
      const n = this.tags.findIndex((e) => {
        return e == 'map'
      })
      const m = `/${this.tags[n + 1]}.png`

      
      new TextureLoader().load(m, (img) => {
        console.log(m)
        img.flipY = false
        console.log(this.model.geometry.attributes)
        console.log(img.channel)
        img.channel = 1

        this.model.material = new MeshBasicMaterial({
          // color: 0xFFFFFF,
          transparent: true,
          map: img,
          side: DoubleSide
        })

        this.model.material.map = img
        this.model.material.needsUpdate = true;
        this.model.material.map.needsUpdate = true;
      });
    }
    this.loading_screen.emit('load')
  }
}

class LoadingScreen extends QueueEventEmitter {
  constructor() {
    super()
    this.channel = new MultiMediator('loading_screen')
    this.waiting = 0
    this.loaded = 0
    this.channel.on('wait', this.wait.bind(this))
    this.channel.on('load', this.load.bind(this))

    this.dom = document.createElement('div')
    this.dom.innerHTML = `
    <svg version="1.1" style='width: 100px;' id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <circle fill="none" stroke="#000" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
    <circle fill="#000" stroke="#fff" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
    </circle>
    </svg>
    `
    this.dom.style.width = '100%'
    this.dom.style.height = '100vh'
    this.dom.style.background = '#fff'
    this.dom.style.position = 'fixed'
    this.dom.style.top = '0px'
    this.dom.style.left = '0px'
    this.dom.style.zIndex = '10'
    this.dom.style.display = 'flex'
    this.dom.style.alignItems = 'center'
    this.dom.style.justifyContent = 'center'
    this.dom.style.transition = '0.8s'

    document.body.appendChild(this.dom)
  }
  wait() {
    this.waiting++;
  }
  load() {
    this.loaded++;
    this.change()
  }
  change() {
    this.channel.emit('change', this.waiting, this.loaded)
    if (this.waiting == this.loaded) {
      this.dom.style.left = '-100%'
    }
  }
}

new LoadingScreen()

class Skeleton extends QueueEventEmitter {
  constructor(url, channel) {
    super()
    this.loading_screen = new MultiMediator('loading_screen')
    this.slide = channel
    this.url = url
    // this.loading_screen.emit('wait')
    this.loader = new GLTFLoader().load(this.url, (gltf) => {
      const scene = gltf.scene;
      this.loading_screen.emit('wait')
      // this.loading_screen.emit('load')
      new ThreeDefaults().scene.add(scene)
      scene.traverse((obj) => {
        if (obj.type == 'Mesh') new ModelMesh(obj, this.slide)
      })
      // scene.children.map(obj => {
      //   if (obj.type == 'Mesh') new ModelMesh(obj, this.slide)
      // })
    })
  }
}

new Skeleton(house_3_url, new MultiMediator('slide_1'))
new Skeleton(house_5_url, new MultiMediator('slide_2'))
new Skeleton(house_4_url, new MultiMediator('slide_3'))
new Skeleton(house_2_url, new MultiMediator('slide_4'))
new Skeleton(house_1_layer_1_url, new MultiMediator('slide_5'))
// new Skeleton(house_1_layer_2_url, new MultiMediator('slide_5'))
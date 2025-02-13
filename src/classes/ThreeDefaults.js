import * as THREE from 'three';
import QueueEventEmitter from '@voxelful/queueeventemitter'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DirectionalLight } from 'three';
import { DirectionalLightHelper } from 'three';
import { AmbientLight } from 'three';
import { ACESFilmicToneMapping } from 'three';
import { SRGBColorSpace } from 'three';
import { CircleGeometry } from 'three';
import { CineonToneMapping } from 'three';
import { LinearToneMapping } from 'three';
import { ReinhardToneMapping } from 'three';
import { AgXToneMapping } from 'three';
import { NeutralToneMapping } from 'three';
import { NoToneMapping } from 'three';
import { LinearSRGBColorSpace } from 'three';
import { NoColorSpace } from 'three';

export class ThreeDefaults extends QueueEventEmitter {
    static instance = null;
    constructor() {
        super();
        if (ThreeDefaults.instance != null) return ThreeDefaults.instance
        ThreeDefaults.instance = this

        this.scene = new THREE.Scene();

        const width = window.innerWidth
        const height = window.innerHeight

        this.aspect = width / height
        this.frustumSize = 10
        //  this.camera = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, 1, 1000 );
        // this.camera = new THREE.OrthographicCamera( this.frustumSize * this.aspect / - 2, this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 0.1, 100 );                                     
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.y = 3
        this.camera.position.x = 3
        this.camera.position.z = 3
        this.camera.lookAt(0, 0, 0)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

       
        this.renderer.toneMapping = AgXToneMapping;
        THREE.ColorManagement.enabled = true;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputColorSpace = LinearSRGBColorSpace;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.maxPolarAngle = Math.PI / 2
        this.controls.minDistance = 3.5
        this.controls.enableDamping = true

        this.clock = new THREE.Clock();
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(() => {
            this.update()
        });
        window.onresize = () => {
            this.resize()
        };
        this.resize();
        this.delta = this.clock.getDelta()
        this.controls.update();

        this.scene.add(new AmbientLight(0xFFFFFF, 20))
        const directionalLight = new DirectionalLight(0xffffff, 5);
        this.scene.add(directionalLight);

        // const helper = new DirectionalLightHelper(directionalLight, 1);
        // this.scene.add(helper);

        // directionalLight.position.set(2, 2, 2)

        // this.on('update', () => {
        //     helper.update()
        // })
    }
    update() {
        this.delta = this.clock.getDelta()
        this.emit("update")
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
    resize() {
        this.aspect = window.innerWidth / window.innerHeight;

        // this.camera.left = - this.frustumSize * this.aspect / 2;
        // this.camera.right = this.frustumSize * this.aspect / 2;
        // this.camera.top = this.frustumSize / 2;
        // this.camera.bottom = - this.frustumSize / 2;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.emit("resize")
    }
}
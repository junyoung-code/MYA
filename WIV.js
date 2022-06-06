import * as THREE from "../../build/three.module.js";
import { OrbitControls } from "../../examples/jsm/controls/OrbitControls.js";
//import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

//THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);
//Wear It Virtually WIV

class Screen{
    constructor(){

        //화면 변경할 때마다 사이즈 조정
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x004fff);
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.scene.background = 0xf1f1f1;
        //this.scene.fog = new THREE.Fog(this.scene.background, 60, 100);
    
        //렌더러 정의
        const canvas = document.getElementById("canvas");
        this.renderer = new THREE.WebGLRenderer({canvas, antialias:true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        //카메라 정의
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(2, 20, 40);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //좌표축 알리미
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        
        //빛 정의
        let hemiLight = new THREE.HemisphereLight(0x0f0f0f, 0x0f0f0f, 0.5);
        //hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.position.set(0, 50, 0);
        this.scene.add(hemiLight);
        
        const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        this.scene.add(hemiLightHelper);
        
        
        let directLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directLight.position.set(0, 100, 0);
        directLight.shadow.mapSize.width = 2048;
        directLight.shadow.mapSize.height = 2048;
        
        const d = 10;
        directLight.shadow.camera.left = -d;
        directLight.shadow.camera.right = d;
        directLight.shadow.camera.top = d;
        directLight.shadow.camera.bottom = -d;

        directLight.shadow.camera.far = 3500;
        directLight.shadow.bias = -0.0001;

        directLight.castShadow = true;
        this.scene.add(directLight);

        const directLightHelper = new THREE.DirectionalLightHelper(directLight, 10);
        this.scene.add(directLightHelper);

        //바닥 정의
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300, 1, 1),
                                        new THREE.MeshLambertMaterial({color:0xffffff}));
        ground.rotation.x = - Math.PI / 2;
        ground.receiveShadow = true;
        ground.position.y = 0;
        this.scene.add(ground);
        
        const geometry = new THREE.BoxGeometry(3,3,3);
        const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.set(1, 10, 2);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add( this.cube );
           
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
        
        this.controls.update();
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

    }


    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

class Avatar{
    constructor(){
        //model, neck, waist, possibleAnimations, mixer, idle,
        //clock = new THREE.Clock(), currentAnimating = false,
        //raycaster = new THREE.Raycaster(), loadAnimation = document.getElementById('js-loader');
    }

}

const scn = new Screen();
scn.animate();
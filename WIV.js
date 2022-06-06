import * as THREE from "../../build/three.module.js";

//Wear It Virtually WIV

class App{
    constructor(){
        //화면 변경할 때마다 사이즈 조정
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x004fff);
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.scene.background = 0xf1f1f1;
        this.scene.fog = new THREE.Fog(this.scene.background, 60, 100);
    
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
        this.camera.position.set(0, -3, 30);

        this.controls = new OrbitControls(camera, renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();


        //빛 정의
        let hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemilight.position.set(0, 50, 0);
        this.scene.add(hemilight);

        let directlight = new THREE.DirectionalLight(0xffffff, 0.5);
        directlight.position.set(-8, 12, 8);
        directlight.castShadow = true;
        this.scene.add(directlight);

        //바닥 정의
        let floor = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000, 1, 1),
                                    new THREE.MeshPhongMaterial({color:0x000000, shininess: 0}));
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -11;
        this.scene.add(floor);
        
                                
    }

    animate(){
        requestAnimationFrame(this.animate);
        controls.update();
        this.renderer.render(this.scene, this.camera);

    }


    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.animate();
    }
}

class Avatar{
    constructor(){
        //model, neck, waist, possibleAnimations, mixer, idle,
        //clock = new THREE.Clock(), currentAnimating = false,
        //raycaster = new THREE.Raycaster(), loadAnimation = document.getElementById('js-loader');
    }

}

const Screen = new App();
Screen.animate();
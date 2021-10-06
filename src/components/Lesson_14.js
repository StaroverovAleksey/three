import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";

class Lesson_14 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            }
        }
        this.ref = React.createRef();
    }

    componentDidMount() {
        //debug
        const gui = new dat.GUI();

        //Texture
        const loadingManager = new THREE.LoadingManager();

        loadingManager.onStart = () => {console.log('onStart')};
        loadingManager.onProgress = () => {console.log('onProgress')};
        loadingManager.onLoad = () => {console.log('onLoad')};
        loadingManager.onError = () => {console.log('onError')};

        const textureLoader = new THREE.TextureLoader(loadingManager);
        const colorTexture = textureLoader.load('door/color.jpg');
        const alphaTexture = textureLoader.load('door/alpha.jpg');
        const heightTexture = textureLoader.load('door/height.jpg');
        const normalTexture = textureLoader.load('door/normal.jpg');
        const ambientOcclusionTexture = textureLoader.load('door/ambientOcclusion.jpg');
        const metalnessTexture = textureLoader.load('door/metalness.jpg');
        const roughnessTexture = textureLoader.load('door/roughness.jpg');
        const matcapTexture = textureLoader.load('matcaps/1.png');

        colorTexture.generateMipmaps = false
        colorTexture.minFilter = THREE.NearestFilter

        //resize
        window.addEventListener('resize', () => {
            const sizes = {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            }
            this.setState({sizes}, () => {
                //Update camera
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();

                //Update renderer
                renderer.setSize(sizes.width, sizes.height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            });
        })

        // Sizes
        const {sizes} = this.state;

        //Scene
        const scene = new THREE.Scene();

        //Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        gui.add(ambientLight, 'intensity', 0, 1, 0.01);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
        directionalLight.position.set(1, 0.5, 0);
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
        scene.add(hemisphereLight);

        const pointLight = new THREE.PointLight(0xff9000, 0.5, 3, 2);
        pointLight.position.set(1, -1, 1);
        scene.add(pointLight);

        const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 2, 2);
        rectAreaLight.position.set(-2.5, 0, 2.5);
        rectAreaLight.lookAt(new THREE.Vector3());
        scene.add(rectAreaLight);

        const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
        spotLight.position.set(0, 2, 3);
        scene.add(spotLight);
        spotLight.target.position.x = -1.75;
        scene.add(spotLight.target);

        //LightHelpers
        const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
        scene.add(hemisphereLightHelper);
        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
        scene.add(directionalLightHelper);
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
        scene.add(pointLightHelper);
        const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);
        window.requestAnimationFrame(() => spotLightHelper.update());
        const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
        scene.add(rectAreaLightHelper);


        // Objects
        const material = new THREE.MeshStandardMaterial();
        material.roughness = 0.4;
        const planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
        const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
        const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
        const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.position.y = -1.1;
        plane.rotation.x = - Math.PI / 2;
        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.x = -2;
        const box = new THREE.Mesh(boxGeometry, material);
        const torus = new THREE.Mesh(torusGeometry, material);
        torus.position.x = 2;
        scene.add(plane);
        scene.add(sphere);
        scene.add(box);
        scene.add(torus);

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.x = 2;
        camera.position.y = 3;
        camera.position.z = 4;
        scene.add(camera);

        //Controls
        const controls = new OrbitControls(camera, this.ref.current);
        controls.enableDamping = true;

        //Renderer
        const canvas = this.ref.current;
        const renderer = new THREE.WebGLRenderer({
            canvas
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.render(scene, camera);


        const clock = new THREE.Clock();
        //Animation
        const tick = () => {
            controls.update();

            const elapsedTime = clock.getElapsedTime();
            sphere.rotation.x = elapsedTime * 0.1;
            sphere.rotation.y = elapsedTime * 0.1;
            box.rotation.x = elapsedTime * 0.1;
            box.rotation.y = elapsedTime * 0.1;
            torus.rotation.x = elapsedTime * 0.1;
            torus.rotation.y = elapsedTime * 0.1;

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    render = () => {
        return <canvas ref={this.ref}/>;
    }
}

export default Lesson_14;

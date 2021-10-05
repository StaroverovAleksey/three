import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Lesson_11 extends React.Component {
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

        //colorTexture.repeat.x = 2;
        //colorTexture.repeat.y = 3;
        //colorTexture.wrapS = THREE.MirroredRepeatWrapping;
        //colorTexture.wrapT = THREE.MirroredRepeatWrapping;

        //colorTexture.offset.x = 0.5;
        //colorTexture.offset.y = 0.5;

        //colorTexture.rotation = Math.PI / 4;
        //colorTexture.center.x = 0.5;
        //colorTexture.center.y = 0.5;

        //colorTexture.minFilter = THREE.NearestFilter;
        //colorTexture.magFilter = THREE.NearestFilter;

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

        // Object
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({map: colorTexture});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;
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


        //Animation
        const tick = () => {
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    render = () => {
        return <canvas ref={this.ref}/>;
    }
}

export default Lesson_11;

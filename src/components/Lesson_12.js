import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'

class Lesson_12 extends React.Component {
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
        const {sizes} = this.state;

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

        const matcapTexture = textureLoader.load('matcaps/5.png');
        const gradientTexture = textureLoader.load('gradients/5.jpg');
        gradientTexture.minFilter = THREE.NearestFilter;
        gradientTexture.magFilter = THREE.NearestFilter;
        gradientTexture.generateMipmaps = false;

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const environmentMapTexture = cubeTextureLoader.load([
            'environmentMaps/0/px.jpg',
            'environmentMaps/0/nx.jpg',
            'environmentMaps/0/py.jpg',
            'environmentMaps/0/ny.jpg',
            'environmentMaps/0/pz.jpg',
            'environmentMaps/0/nz.jpg',
        ]);

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

        //Scene
        const scene = new THREE.Scene();

        //Objects
        /*const material = new THREE.MeshBasicMaterial();
        //material.color = new THREE.Color('red');
        //material.wireframe = true;
        material.map = colorTexture;
        material.transparent = true;
        material.alphaMap = alphaTexture;
        material.side = THREE.DoubleSide;*/

        /*const material = new THREE.MeshNormalMaterial();
        material.flatShading = true;*/

        /*const material = new THREE.MeshMatcapMaterial();
        material.matcap = matcapTexture;*/

        //const material = new THREE.MeshLambertMaterial();

        /*const material = new THREE.MeshPhongMaterial();
        material.shininess = 100;
        material.specular = new THREE.Color('red');*/

        /*const material = new THREE.MeshToonMaterial();
        material.gradientMap = gradientTexture;*/

        const material = new THREE.MeshStandardMaterial();
        material.metalness = 0.3;
        material.roughness = 0.7;
        //material.envMap = environmentMapTexture;


        material.map = colorTexture;
        material.aoMap = ambientOcclusionTexture;
        material.aoMapIntensity = 1.5;
        material.displacementMap = heightTexture;
        material.displacementScale = 0.05;
        material.metalnessMap = metalnessTexture;
        material.roughnessMap = roughnessTexture;
        material.normalMap = normalTexture;
        material.transparent = true;
        material.alphaMap = alphaTexture;
        material.normalScale.set(0.5, 0.5);

        gui.add(material, 'metalness', 0, 1, 0.001).name('Металличность');
        gui.add(material, 'roughness', 0, 1, 0.001).name('Матовость');
        gui.add(material, 'aoMapIntensity', 1, 10, 0.001);
        gui.add(material, 'displacementScale', 0, 1, 0.001);



        //Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        scene.add(pointLight);

        const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 256, 256), material);
        sphere.position.x = -1.5;
        scene.add(sphere);
        const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 100, 100), material);
        plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));
        scene.add(plane);
        const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.2, 128, 256), material);
        torus.position.x = 1.5;
        scene.add(torus);

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
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            //Update objects
            sphere.rotation.y = 0.1 * elapsedTime;
            //plane.rotation.y = 0.1 * elapsedTime;
            torus.rotation.y = 0.1 * elapsedTime;

            sphere.rotation.x = 0.15 * elapsedTime;
            //plane.rotation.x = 0.15 * elapsedTime;
            torus.rotation.x = 0.15 * elapsedTime;

            //Update controls
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

export default Lesson_12;

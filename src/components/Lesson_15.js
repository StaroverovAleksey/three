import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";

class Lesson_15 extends React.Component {
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

        //Textures
        const textureLoader = new THREE.TextureLoader();
        const bakeShadow = textureLoader.load('bakedShadows/bakedShadow.jpg')
        const simpleShadow = textureLoader.load('bakedShadows/simpleShadow.jpg')

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

        /**
         * Lights
         */
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        scene.add(ambientLight)

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
        directionalLight.position.set(2, 2, - 1)
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 5;
        directionalLight.shadow.camera.left = -1;
        directionalLight.shadow.camera.right = 1;
        directionalLight.shadow.camera.top = -1;
        directionalLight.shadow.camera.bottom = 1;
        directionalLight.shadow.radius = 10;
        const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        directionalLightHelper.visible = false;
        scene.add(directionalLightHelper);
        gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
        gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
        gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
        gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
        scene.add(directionalLight);

        //SpotLight
        const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3);
        spotLight.castShadow = true;
        spotLight.position.set(0, 2, 2);
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.fov = 30;
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 5;
        const spotLightLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
        spotLightLightHelper.visible = false;
        scene.add(spotLightLightHelper);
        scene.add(spotLight);

        //PointLight
        const pointLight = new THREE.PointLight(0xffffff, 0.3);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        pointLight.position.set(-1, 1, 0);
        const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
        pointLightHelper.visible = false;
        scene.add(pointLightHelper);
        scene.add(pointLight);

        /**
         * Materials
         */
        const material = new THREE.MeshStandardMaterial();
        material.roughness = 0.7
        gui.add(material, 'metalness').min(0).max(1).step(0.001)
        gui.add(material, 'roughness').min(0).max(1).step(0.001)

        /**
         * Objects
         */
        const sphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 32, 32),
            material
        )
        sphere.castShadow = true;

        const plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(5, 5),
            material
            //new THREE.MeshBasicMaterial({map: bakeShadow})
        )
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 0.5
        plane.receiveShadow = true;

        const sphereShadow = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1.5, 1.5),
            new THREE.MeshBasicMaterial({color: 'red', alphaMap: simpleShadow, transparent: true})
        );
        sphereShadow.rotation.x = -Math.PI / 2;
        sphereShadow.position.y = plane.position.y + 0.01;

        scene.add(sphere, plane);
        scene.add(sphereShadow);

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        //scene.add(axesHelper);

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
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.render(scene, camera);


        const clock = new THREE.Clock();
        //Animation
        const tick = () => {
            controls.update();
            const elapsedTime = clock.getElapsedTime();

            //Update sphere
            sphere.position.x = Math.cos(elapsedTime);
            sphere.position.z = Math.sin(elapsedTime);
            sphere.position.y = Math.abs(Math.sin(elapsedTime * 4));

            //Update shadow
            sphereShadow.position.x = Math.cos(elapsedTime);
            sphereShadow.position.z = Math.sin(elapsedTime);
            sphereShadow.material.opacity = (1.4 - sphere.position.y) * 0.5;

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    render = () => {
        return <canvas ref={this.ref}/>;
    }
}

export default Lesson_15;

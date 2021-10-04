import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Lesson_9 extends React.Component {
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
        /*const geometry = new THREE.Geometry();

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 3; j++) {
                geometry.vertices.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5));
            }
            const verticesIndex = i * 3;
            geometry.faces.push(new THREE.Face3(verticesIndex, verticesIndex + 1, verticesIndex + 2));
        }*/

        //const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5);
        const geometry = new THREE.BufferGeometry();

        const count = 500;
        const positionsArray = new Float32Array(count * 3 * 3);
        for (let i = 0; i < count * 3 * 3; i++) {
            positionsArray[i] = Math.random() - 0.5;
        }

        const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
        geometry.setAttribute('position', positionsAttribute);

        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        //scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 1;
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

export default Lesson_9;

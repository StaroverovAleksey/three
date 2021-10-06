import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui';
import gsap from "gsap";

class Lesson_10 extends React.Component {
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
        //gui
        const gui = new dat.GUI();
        const parameters = {
            color: 0xff0000,
            spin: () => {
                gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
            }
        }

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
        const material = new THREE.MeshBasicMaterial({color: 0xff0000})
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        //gui
        gui.add(cube.position, 'x', -3, 3, 0.1).name('vdfbdfbtb');
        gui.add(cube.position, 'y', -3, 3, 0.1);
        gui.add(cube.position, 'z', -3, 3, 0.1);
        gui.add(cube, 'visible').name('показать');
        gui.add(material, 'wireframe');
        gui.addColor(parameters, 'color').onChange(() => material.color.set(parameters.color));
        gui.add(parameters, 'spin');

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

export default Lesson_10;

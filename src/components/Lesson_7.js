import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Lesson_7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: {
                x: 0,
                y: 0
            },
            sizes: {
                width: 800,
                height: 600
            }
        }
        this.ref = React.createRef();
    }

    componentDidMount() {
        // Sizes
        const {sizes} = this.state;

        //Cursor

        //Scene
        const scene = new THREE.Scene();

        // Object

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        );
        scene.add(cube);

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        //const aspectRatio = sizes.width / sizes.height;
        //const camera = new THREE.OrthographicCamera(-1 * aspectRatio, aspectRatio, 1, -1, 0.1, 100);
        camera.position.z = 3;
        scene.add(camera);


        //Controls
        const controls = new OrbitControls(camera, this.ref.current);
        //controls.target.y = 1;
        //controls.update();
        controls.enableDamping = true;

        //Renderer
        const canvas = this.ref.current;
        const renderer = new THREE.WebGLRenderer({
            canvas
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.render(scene, camera);

        //Clock
        const clock = new THREE.Clock();

        //Animation
        const tick = () => {
            const {cursor} = this.state;
            //const elapsedTime = clock.getElapsedTime();
            //camera.position.x = - Math.sin(cursor.x * Math.PI * 2) * 3;
            //camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
            //camera.position.y = cursor.y * 5
            //camera.lookAt(cube.position);
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    render = () => {
        return <canvas ref={this.ref} onMouseMove={this.mouseMoveHandler}/>;
    }

    mouseMoveHandler = (event) => {
        const {sizes} = this.state;
        this.setState({cursor: {x: event.clientX / sizes.width - 0.5, y: event.clientY / sizes.height - 0.5}});
    }
}

export default Lesson_7;

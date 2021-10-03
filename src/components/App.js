import React from "react";
import * as THREE from 'three';
import {AxesHelper} from "three";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        // Sizes
        const sizes = {
            width: 800,
            height: 600
        }

        //Scene
        const scene = new THREE.Scene();

        // Objects
        const group = new THREE.Group();
        scene.add(group);

        const cube_1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        );
        group.add(cube_1);
        const cube_2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0x00ff00})
        );
        cube_2.position.x = 2;
        group.add(cube_2);
        group.add(cube_1);
        const cube_3 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0x0000ff})
        );
        cube_3.position.x = 4;
        group.add(cube_3);
        /*const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);*/

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 5;
        scene.add(camera);

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
            const elapsedTime = clock.getElapsedTime();
            console.log('tick');
            camera.position.x = Math.cos(elapsedTime);
            camera.position.y = Math.sin(elapsedTime);
            camera.lookAt(cube_1.position);
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    render = () => {
        return <canvas ref={this.ref}/>;
    }
}

export default App;

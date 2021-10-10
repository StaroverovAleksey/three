import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import {Vec3} from "three/examples/jsm/libs/OimoPhysics";

class Lesson_19 extends React.Component {
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
        /**
         * Base
         */
        // Debug
        const gui = new dat.GUI()

        // Canvas
        const canvas = this.ref.current;

        // Scene
        const scene = new THREE.Scene()

        /**
         * Objects
         */
        const object1 = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )
        object1.position.x = - 2

        const object2 = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )

        const object3 = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )
        object3.position.x = 2

        scene.add(object1, object2, object3)

        /**
         * Raycaster
         */
        const rayCaster = new THREE.Raycaster();

        /*const rayOrigin = new THREE.Vector3(-3, 0, 0);
        const rayDirection = new THREE.Vector3(10, 0, 0);
        rayDirection.normalize();
        rayCaster.set(rayOrigin, rayDirection);
        const intersect = rayCaster.intersectObject(object2);
        const intersects = rayCaster.intersectObjects([object1, object2, object3]);*/

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Mouse
         */
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX / sizes.width * 2 - 1;
            mouse.y = -(event.clientY / sizes.height) * 2 + 1;
        });

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 3
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        const clock = new THREE.Clock()

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()

            //Animated objects
            object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
            object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
            object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

            //Cast a ray
            rayCaster.setFromCamera(mouse, camera);
            /*const rayOrigin = new THREE.Vector3(-3, 0, 0);
            const rayDirection = new THREE.Vector3(1, 0, 0);
            rayDirection.normalize();
            rayCaster.set(rayOrigin, rayDirection);*/
            const objToCheck = [object1, object2, object3];
            const intersects = rayCaster.intersectObjects([object1, object2, object3]);
            objToCheck.forEach((value) => value.material.color = new THREE.Color('red'));
            //intersects.forEach((value) => value.object.material.color.set('green'));
            intersects.length && intersects[0].object.material.color.set('green');



            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }

    render = () => {
        return <canvas ref={this.ref}/>;
    }
}

export default Lesson_19;

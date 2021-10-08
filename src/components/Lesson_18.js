import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

class Lesson_18 extends React.Component {
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
        const gui = new dat.GUI({width: 360})

        // Canvas
        const canvas = this.ref.current;

        // Scene
        const scene = new THREE.Scene()

        /**
         * Galaxy
         */
        const parameters = {
            count: 100000,
            size: 0.01,
            radius: 5,
            branches: 3,
            spin: 1,
            randomness: 0.2,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984',
        };

        let geometry = null;
        let material = null;
        let points = null;

        const generatorGalaxy = () => {
            const {count, size, branches, spin, randomness, randomnessPower, insideColor, outsideColor} = parameters;

            if (points) {
                geometry.dispose();
                material.dispose();
                scene.remove(points);
            }

            //geometry
            geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            const colorInside = new THREE.Color(insideColor);
            const colorOutside = new THREE.Color(outsideColor);

            for (let i = 0; i < count * 3; i++) {
                const i3 = i * 3;

                //Positions
                const radius = Math.random() * parameters.radius;
                const spinAngle = radius * spin
                const branchAngle = ((i % branches) / branches) * (Math.PI * 2);

                const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
                const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
                const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
                positions[i3 + 1] = randomY;
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

                //Colors
                const mixedColor = colorInside.clone();
                mixedColor.lerp(colorOutside, radius / parameters.radius);

                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            //Materials
            material = new THREE.PointsMaterial({
                size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            });

            //Points
            points = new THREE.Points(geometry, material);
            scene.add(points);
        };
        generatorGalaxy();

        gui.add(parameters, 'count', 100, 100000, 100).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(generatorGalaxy);
        gui.add(parameters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generatorGalaxy);
        gui.addColor(parameters, 'insideColor').onFinishChange(generatorGalaxy);
        gui.addColor(parameters, 'outsideColor').onFinishChange(generatorGalaxy);

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
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 3
        camera.position.y = 3
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

export default Lesson_18;

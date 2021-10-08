import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

class Lesson_17 extends React.Component {
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
         * Textures
         */
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = textureLoader.load('particles/2.png');

        /**
         * Particles
         */
        //Geometry
        const particlesGeometry = new THREE.BufferGeometry(1, 32, 32);
        const count = 500000;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
            colors[i] = Math.random();
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        //Material
        const particlesMaterial = new THREE.PointsMaterial({
            //color: '#ff88cc',
            size: 0.02,
            sizeAttenuation: true,
            transparent: true,
            alphaMap: particleTexture,
            //alphaTest: 0.001,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        //Points
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

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
        camera.position.x = 2;
        camera.position.y = 7;
        camera.position.z = 10;
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

            //Update particles

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const x = particlesGeometry.attributes.position.array[i3];
                particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
            }
        particlesGeometry.attributes.position.needsUpdate = true;

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

export default Lesson_17;

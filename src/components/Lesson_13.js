import React from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

class Lesson_13 extends React.Component {
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

        //Textures
        const textureLoader = new THREE.TextureLoader();
        const matcapTexture = textureLoader.load('/matcaps/6.png');

        //Fonts
        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry(
              'Hello, Tree.js!', {
                  font,
                  size: 1,
                  height: 0.2,
                  curveSegments: 6,
                  bevelEnabled: true,
                  bevelThickness: 0.03,
                  bevelSize: 0.02,
                  bevelOffset: 0,
                  bevelSegments: 5
              }
            );

            const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
            const mesh = new THREE.Mesh(textGeometry, material);
            /*textGeometry.computeBoundingBox();
            textGeometry.translate(
                -(textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x) / 2,
                -(textGeometry.boundingBox.max.y + textGeometry.boundingBox.min.y) / 2,
                -(textGeometry.boundingBox.max.z + textGeometry.boundingBox.min.z) / 2
            );*/
            textGeometry.center();
            scene.add(mesh);

            console.time('donuts');
            const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

            for (let i = 0; i < 100; i++) {
                const donut = new THREE.Mesh(donutGeometry, material);

                donut.position.x = Math.random() * 10 - 5;
                donut.position.y = Math.random() * 10 - 5;
                donut.position.z = Math.random() * 10 - 5;
                donut.rotation.x = (Math.random() * Math.PI);
                donut.rotation.y = (Math.random() * Math.PI);
                const scale = Math.max(Math.random(), 0.3);
                donut.scale.set(scale, scale, scale);

                scene.add(donut);
            }
            console.timeEnd('donuts');
        });

        //Axes helper
        const axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        //Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 10;
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

export default Lesson_13;

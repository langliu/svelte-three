import {
	BoxGeometry,
	DirectionalLight,
	HemisphereLight,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	AxesHelper,
	AmbientLight,
	PointLight,
	Color,
	Group
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { gltfLoader } from '../../lib/utils/loader';

import type { Renderer } from 'three';

const scene = new Scene();

const canvasHeight = window.innerHeight - 48;

const camera = new PerspectiveCamera(75, window.innerWidth / canvasHeight, 10, 20000);
camera.position.set(0, 4000, 4000);
scene.add(new AxesHelper(1000));
scene.background = new Color('black');

const geometry = new BoxGeometry();

const material = new MeshStandardMaterial({
	color: 0x00ff00,
	metalness: 0.13
});

const cube = new Mesh(geometry, material);
scene.add(cube);

// const directionalLight = new DirectionalLight(0xffffff);
// directionalLight.position.set(0, 10000, 10000).normalize();
// scene.add(directionalLight);

// const hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
// hemisphereLight.position.set(1, 1, 1);
// scene.add(hemisphereLight);
// const ambient = new AmbientLight('white', 1);
// scene.add(ambient); //将环境光添加到场景中
const lightPoint = new PointLight(0xffffff, 1);
lightPoint.position.set(0, 10000, 1000);
scene.add(lightPoint);
gltfLoader('细水雾消火栓箱', scene);
gltfLoader('设备', scene);
gltfLoader('设备门', scene);
gltfLoader('水箱', scene);
gltfLoader('大地面', scene);
gltfLoader('投影_01', scene);
gltfLoader('点云', scene);
const group5 = new Group();
gltfLoader('5f墙体', scene, group5);
gltfLoader('5f地板_01', scene, group5);
gltfLoader('5f地板_02', scene, group5);
gltfLoader('5f亮边', scene, group5);
gltfLoader('5f墙顶', scene, group5);
gltfLoader('5f阴影', scene, group5);
scene.add(group5)
let renderer: Renderer;
// const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};

const resize = () => {
	renderer.setSize(window.innerWidth, canvasHeight);
	camera.aspect = window.innerWidth / canvasHeight;
	camera.updateProjectionMatrix();
};

export function createScene(el: HTMLCanvasElement) {
	renderer = new WebGLRenderer({ antialias: true, canvas: el });
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
	resize();
	animate();
}

window.addEventListener('resize', resize);

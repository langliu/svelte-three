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
	PointLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { modelLoader } from '../../lib/utils/loader';

import type { Renderer } from 'three';

const scene = new Scene();

const canvasHeight = window.innerHeight - 48;

const camera = new PerspectiveCamera(75, window.innerWidth / canvasHeight, 10, 10000);
camera.position.set(0, 4000, 4000);
scene.add(new AxesHelper(1000));

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
// const ambient = new AmbientLight(0xffffff);
// scene.add(ambient); //将环境光添加到场景中
const lightPoint = new PointLight(0xe9e9e9, 1);
lightPoint.position.set(0, 10000, 1000);
scene.add(lightPoint);
modelLoader('设备/细水雾消火栓箱', scene);
modelLoader('设备/水箱', scene);
modelLoader('设备/设备门', scene);
modelLoader('w/1f地板_01', scene);
modelLoader('w/1f地板_02', scene);
modelLoader('w/1f亮边', scene);
modelLoader('w/1f墙顶', scene);
modelLoader('w/1f墙体', scene);
modelLoader('w/1f阴影', scene);
modelLoader('w/2f地板_01', scene);
modelLoader('w/2f地板_02', scene);
modelLoader('w/2f亮边', scene);
modelLoader('w/2f墙顶', scene);
modelLoader('w/2f墙体', scene);
modelLoader('w/2f阴影', scene);
modelLoader('w/4f地板_01', scene);
modelLoader('w/4f地板_02', scene);
modelLoader('w/4f亮边', scene);
modelLoader('w/4f墙顶', scene);
modelLoader('w/4f墙体', scene);
modelLoader('w/4f阴影', scene);
modelLoader('w/5f地板_01', scene);
modelLoader('w/5f地板_02', scene);
modelLoader('w/5f亮边', scene);
modelLoader('w/5f墙顶', scene);
modelLoader('w/5f墙体', scene);
modelLoader('w/5f阴影', scene);
modelLoader('w/b1f地板_01', scene);
modelLoader('w/b1f地板_02', scene);
modelLoader('w/b1f亮边', scene);
modelLoader('w/b1f墙顶', scene);
modelLoader('w/b1f墙体', scene);
modelLoader('w/b1f阴影', scene);
modelLoader('内景/大地面', scene);
modelLoader('内景/点云', scene);
modelLoader('内景/投影_01', scene);

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

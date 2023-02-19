import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AxesHelper,
  PointLight,
  Group
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

import { gltfLoader } from '../../lib/utils/loader';

import type { Renderer } from 'three';

const scene = new Scene();

const canvasHeight = window.innerHeight - 48;

const camera = new PerspectiveCamera(75, window.innerWidth / canvasHeight, 10, 10000);
camera.position.set(3000, 3000, 3000);
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
lightPoint.position.set(500, 10000, 1000);
scene.add(lightPoint);
const group1 = new Group();
const group2 = new Group();
const group4 = new Group();
const groupB1 = new Group();
const group5 = new Group();
gltfLoader('细水雾消火栓箱', scene, groupB1);
gltfLoader('设备', scene, groupB1);
gltfLoader('设备门', scene, groupB1);
gltfLoader('水箱', scene, groupB1);
gltfLoader('大地面', scene);
gltfLoader('投影_01', scene);
gltfLoader('点云', scene);
gltfLoader('1f亮边', scene, group1, 'glb');
gltfLoader('1f地板_01', scene, group1, 'glb');
gltfLoader('1f地板_02', scene, group1, 'glb');
gltfLoader('1f墙顶', scene, group1, 'glb');
gltfLoader('1f墙体', scene, group1, 'glb');
gltfLoader('1f阴影', scene, group1, 'glb');
scene.add(group1);

gltfLoader('2f地板_01', scene, group2, 'glb');
gltfLoader('2f地板_02', scene, group2, 'glb');
gltfLoader('2f亮边', scene, group2, 'glb');
gltfLoader('2f墙顶', scene, group2, 'glb');
gltfLoader('2f墙体', scene, group2, 'glb');
gltfLoader('2f阴影', scene, group2, 'glb');
gltfLoader('4f地板_01', scene, group4, 'glb');
gltfLoader('4f地板_02', scene, group4, 'glb');
gltfLoader('4f亮边', scene, group4, 'glb');
gltfLoader('4f墙顶', scene, group4, 'glb');
gltfLoader('4f墙体', scene, group4, 'glb');
gltfLoader('4f阴影', scene, group4, 'glb');

gltfLoader('5f墙体', scene, group5);
gltfLoader('5f地板_01', scene, group5);
gltfLoader('5f地板_02', scene, group5);
gltfLoader('5f亮边', scene, group5);
gltfLoader('5f墙顶', scene, group5);
gltfLoader('5f阴影', scene, group5);
scene.add(group5);
gltfLoader('b1f地板_01', scene, groupB1, 'glb');
gltfLoader('b1f地板_02', scene, groupB1, 'glb');
gltfLoader('b1f亮边', scene, groupB1, 'glb');
gltfLoader('b1f墙顶', scene, groupB1, 'glb');
gltfLoader('b1f墙体', scene, groupB1, 'glb');
gltfLoader('b1f阴影', scene, groupB1, 'glb');
scene.add(group2);
scene.add(group4);
scene.add(groupB1);

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

export function layer() {
  gsap.to(group1.position, {
    y: 500,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(group2.position, {
    y: 1000,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(group4.position, {
    y: 1500,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(group5.position, {
    y: 2000,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(camera.position, {
    y: 4000,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(camera.position, {
    y: 3000,
    duration: 0.2,
    ease: 'none'
  });
  gsap.to(camera.position, {
    z: 6000,
    duration: 0.2,
    ease: 'none',
    onComplete: () => {
      camera.lookAt(0, 0, 0);
    }
  });
}

export function removeLayer() {
  gsap.to([group5.position, group1.position, group2.position, group4.position], {
    y: 0,
    duration: 0.2,
    ease: 'none'
  });
}

window.addEventListener('resize', resize);

export function showFloor(level: number) {
  group1.visible = false;
  group2.visible = false;
  group4.visible = false;
  group5.visible = false;
  groupB1.visible = false;
  switch (level) {
    case -1:
      groupB1.visible = true;
      break;
    case 1:
      group1.visible = true;
      break;
    case 2:
      group2.visible = true;
      break;
    case 4:
      group4.visible = true;
      break;
    case 5:
      group5.visible = true;
      break;
    default:
      break;
  }
}

/**
 * 控制所有物体是否显示
 * @param visible 是否显示
 */
export function meshShow(visible: boolean) {
  group1.visible = visible;
  group2.visible = visible;
  group4.visible = visible;
  group5.visible = visible;
  groupB1.visible = visible;
}

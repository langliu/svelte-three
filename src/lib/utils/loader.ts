import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { Object3D, Scene } from 'three';

export const modelLoader = (name: string, scene: Scene, group?: Object3D) => {
	const mtlLoader = new MTLLoader();
	const objLoader = new OBJLoader();
	mtlLoader.load(
		`/src/lib/images/${name}.mtl`,
		(materials) => {
			materials.preload();
			objLoader.setMaterials(materials);
			objLoader.load(
				`/src/lib/images/${name}.obj`,
				(object) => {
					object.castShadow = true;
					object.traverse(function (child) {
						if (child.isMesh) {
							child.material.emissive = child.material.color;
							child.material.emissiveMap = child.material.map;
						}
					});
					if (group) {
						group.add(object);
					} else {
						scene.add(object);
					}
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				},
				(error) => console.error(error)
			);
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded material');
		},
		(error) => console.error(error)
	);
};

export function gltfLoader(name: string, scene: Scene, group?: Object3D, type = 'gltf') {
	const loader = new GLTFLoader();
	loader.load(
		// resource URL
		`src/lib/models/${name}.${type}`,
		// called when the resource is loaded
		function (gltf) {
			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = true;
					child.material.emissive = child.material.color;
					child.material.emissiveMap = child.material.map;
					child.material.metalness = 0.7;
					child.material.roughness = 1;
				}
			});
			if (group) {
				group.add(gltf.scene);
			} else {
				scene.add(gltf.scene);
			}

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
		},
		// called while loading is progressing
		function (xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		// called when loading has errors
		function (error) {
			console.log('An error happened');
		}
	);
}

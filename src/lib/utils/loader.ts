import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import type { Scene } from 'three';

export const modelLoader = (name: string, scene: Scene) => {
	const mtlLoader = new MTLLoader();
	const objLoader = new OBJLoader();
	mtlLoader.load(
		`/src/lib/images/${name}.mtl`,
		(materials) => {
			objLoader.setMaterials(materials);
			objLoader.load(
				`/src/lib/images/${name}.obj`,
				(object) => {
					object.castShadow = true;
					scene.add(object);
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

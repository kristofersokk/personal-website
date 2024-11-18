/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: kelseysmith1028 (https://sketchfab.com/kelseysmith1028)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/modern-black-table-lamp-eb5bdce013e2406ca66404325589f15d
Title: Modern Black Table Lamp
*/

import { colorTemperatureToRGB, rgbToHex } from '@/utils/colorUtils';
import { createExternalResource } from '@/utils/resourceUtils';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { SpotLight } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Object_2: THREE.Mesh;
		Object_3: THREE.Mesh;
		Object_4: THREE.Mesh;
		Object_5: THREE.Mesh;
	};
	materials: {
		Color_D01: THREE.MeshStandardMaterial;
		Metal_Silver: THREE.MeshStandardMaterial;
		Granite_Dark_Gray: THREE.MeshStandardMaterial;
		FrontColor: THREE.MeshStandardMaterial;
	};
};

const localPath = 'models/modern_black_table_lamp.glb';
const uploadThingId = 'ayWUAmbcwFZQbBqyQGzVAzg7oiwlhYu4PmHcFrL59fsBDxN6';
const externalResource = createExternalResource(localPath, uploadThingId);

export function TableLamp(props: JSX.IntrinsicElements['group']) {
	const warmLight = rgbToHex(...colorTemperatureToRGB(3500));
	const spotlight = useMemo(() => new SpotLight(), []);

	const gl = useThree((three) => three.gl);
	const maxTextureSize = gl.capabilities.maxTextureSize;

	spotlight.shadow.mapSize.width = maxTextureSize;
	spotlight.shadow.mapSize.height = maxTextureSize;

	spotlight.shadow.camera.near = 0.1;
	spotlight.shadow.camera.far = 10;

	// useHelper({ current: spotlight }, SpotLightHelper, 'red');
	const { nodes, materials } = useGLTF(externalResource) as GLTFResult;
	return (
		<group {...props}>
			<group dispose={null} scale={[0.001, 0.001, -0.001]}>
				<group rotation={[-Math.PI / 2, 0, 0]}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_2.geometry}
						material={materials.Color_D01}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_3.geometry}
						material={materials.Metal_Silver}
					/>
					<mesh
						receiveShadow
						geometry={nodes.Object_4.geometry}
						material={materials.Granite_Dark_Gray}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_5.geometry}
						material={materials.FrontColor}
					/>
				</group>
			</group>
			<primitive
				object={spotlight}
				position={[0, 0.364, 0.2]}
				color={warmLight}
				power={45}
				angle={Math.PI / 1.9}
				penumbra={0.6}
				decay={-0.7}
				castShadow
			/>
			<primitive object={spotlight.target} position={[0, -0.023, 0.25]} />
		</group>
	);
}

useGLTF.preload(externalResource);

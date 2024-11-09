import { RepeatWrapping, TextureLoader } from 'three';

const textureLoader = new TextureLoader();

// Load texture maps from the local repository
const ambientOcclusion = textureLoader.load(
	'/materials/wood/WoodFloor051_1K-JPG_AmbientOcclusion.jpg',
);
const color = textureLoader.load('/materials/wood/WoodFloor051_1K-JPG_Color.jpg');
const displacement = textureLoader.load('/materials/wood/WoodFloor051_1K-JPG_Displacement.jpg');
const normalDx = textureLoader.load('/materials/wood/WoodFloor051_1K-JPG_NormalDX.jpg');
const normalGl = textureLoader.load('/materials/wood/WoodFloor051_1K-JPG_NormalGL.jpg');
const roughness = textureLoader.load('/materials/wood/WoodFloor051_1K-JPG_Roughness.jpg');

// Set the textures to their corresponding properties in MeshStandardMaterial
export const WoodMaterial = () => (
	<meshStandardMaterial
		map={color}
		transparent={false}
		alphaTest={0.0}
		normalMap={normalDx}
		normalScale={[0.5, 0.5]}
		aoMap={ambientOcclusion}
		aoMapIntensity={1}
		roughnessMap={roughness}
		roughness={10}
		metalnessMap={roughness}
		metalness={1}
		// displacementMap={displacement}
		// displacementScale={0.1}
	/>
);

import { createExternalResource } from '@/utils/resourceUtils';
import { TextureLoader } from 'three';

const textureLoader = new TextureLoader();

// Load texture maps from the local repository
const ambientOcclusion = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_AmbientOcclusion.jpg',
		'ayWUAmbcwFZQacGxSkubcwFZQDxsKmna8boWqTYPOGNEltd5',
	),
);
const color = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_Color.jpg',
		'ayWUAmbcwFZQqk78YPijc5VmiD8b1SwPafE9ku2snHQZjypT',
	),
);
const displacement = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_Displacement.jpg',
		'ayWUAmbcwFZQ0NrslMdV2jUQ9Y7tBC8uZqeOEXpRdAIys34P',
	),
);
const normalDx = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_NormalDX.jpg',
		'ayWUAmbcwFZQ8dH6HQV6nRiDuwYxUQ3ZPbk9AodEvcJsgL40',
	),
);
const normalGl = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_NormalGL.jpg',
		'ayWUAmbcwFZQi256c20MpHyXnOu2EgTY9o4Bts1iwVSdhqzk',
	),
);
const roughness = textureLoader.load(
	createExternalResource(
		'materials/wood/WoodFloor051_1K-JPG_Roughness.jpg',
		'ayWUAmbcwFZQYe9wR5TPtegILqz8NGAx4bdWYZiU6SF2CrQR',
	),
);

// Set the textures to their corresponding properties in MeshStandardMaterial
export const WoodMaterial = () => (
	<meshStandardMaterial
		map={color}
		transparent={false}
		alphaTest={0.0}
		normalMap={normalDx}
		// @ts-ignore
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

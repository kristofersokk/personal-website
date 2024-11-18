import { createExternalResource } from '@/utils/resourceUtils';
import { Color, RepeatWrapping, TextureLoader } from 'three';

const textureLoader = new TextureLoader();

// Load texture maps from the local repository
const ambientOcclusion = textureLoader.load(
	createExternalResource(
		'materials/rough-plaster/Plaster_Rough_001_OCC.jpg',
		'ayWUAmbcwFZQ3EjFt4meDMh1d7rClZzBkY4bFXmSOx2aJL6g',
	),
);
const color = textureLoader.load(
	createExternalResource(
		'materials/rough-plaster/Plaster_Rough_001_COLOR.jpg',
		'ayWUAmbcwFZQ55nLA6KAoryQbhN83tMDYFqjT9u1leiw4H0R',
	),
);
const displacement = textureLoader.load(
	createExternalResource(
		'materials/rough-plaster/Plaster_Rough_001_DISP.jpg',
		'ayWUAmbcwFZQ7aeRhaYbdj4mYy3agD8SM6LzeUxGVshRowPJ',
	),
);
const normalGl = textureLoader.load(
	createExternalResource(
		'materials/rough-plaster/Plaster_Rough_001_NORM.jpg',
		'ayWUAmbcwFZQEgzP37NV26ygXmiQUtkWxIvwFcSJbnPZ3Mu1',
	),
);
const roughness = textureLoader.load(
	createExternalResource(
		'materials/rough-plaster/Plaster_Rough_001_ROUGH.jpg',
		'ayWUAmbcwFZQjgdyLl4QcAhCXszfl2EMNSpm94BUio1rGVnu',
	),
);

const scale = 64;

ambientOcclusion.wrapS = RepeatWrapping;
ambientOcclusion.wrapT = RepeatWrapping;
ambientOcclusion.repeat.set(scale, scale);
color.wrapS = RepeatWrapping;
color.wrapT = RepeatWrapping;
color.repeat.set(scale, scale);
displacement.wrapS = RepeatWrapping;
displacement.wrapT = RepeatWrapping;
displacement.repeat.set(scale, scale);
normalGl.wrapS = RepeatWrapping;
normalGl.wrapT = RepeatWrapping;
normalGl.repeat.set(scale, scale);

// Set the textures to their corresponding properties in MeshStandardMaterial
export const GreenWallMaterial = () => (
	<meshStandardMaterial
		map={color}
		color={new Color('#3B4537').convertLinearToSRGB()}
		transparent={false}
		normalMap={normalGl}
		// @ts-expect-error
		normalScale={[0, -20]}
		aoMap={ambientOcclusion}
		aoMapIntensity={1}
		roughnessMap={roughness}
		roughness={10}
		// displacementMap={displacement}
		// displacementScale={100}
	/>
);

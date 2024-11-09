import { Color, RepeatWrapping, TextureLoader, Vector2 } from 'three';

const textureLoader = new TextureLoader();

// Load texture maps from the local repository
const ambientOcclusion = textureLoader.load('/materials/rough-plaster/Plaster_Rough_001_OCC.jpg');
const color = textureLoader.load('/materials/rough-plaster/Plaster_Rough_001_COLOR.jpg');
const displacement = textureLoader.load('/materials/rough-plaster/Plaster_Rough_001_DISP.jpg');
const normalGl = textureLoader.load('/materials/rough-plaster/Plaster_Rough_001_NORM.jpg');
const roughness = textureLoader.load('/materials/rough-plaster/Plaster_Rough_001_ROUGH.jpg');

const scale = 8;

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
		alphaTest={0.5}
		// normalMap={normalGl}
		// normalScale={[1, 1]}
		aoMap={ambientOcclusion}
		aoMapIntensity={1}
		roughnessMap={roughness}
		roughness={0}
		// displacementMap={displacement}
		// displacementScale={100}
	/>
);

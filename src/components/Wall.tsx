import { GreenWallMaterial } from '@/materials/GreenWallMaterial';

export default function Wall() {
	return (
		<mesh position={[0, 1.5, -0.5]} castShadow receiveShadow>
			<planeGeometry args={[3, 3]} />
			<GreenWallMaterial />
		</mesh>
	);
}

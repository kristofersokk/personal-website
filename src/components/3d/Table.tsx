import { RoundedBoxGeometry } from '@/geometries/RoundedBoxGeometry';
import { WoodMaterial } from '@/materials/WoodMaterial';
import { KeyboardAndMouse } from '@/models/KeyboardAndMouse';
import { Monitor } from '@/models/Monitor';
import { TableLamp } from '@/models/TableLamp';
import { WidescreenMonitor } from '@/models/WidescreenMonitor';
import { Center, Html } from '@react-three/drei';
import { Euler } from 'three';

import { CoffeeMug } from '../../models/CoffeeMug';

function Table() {
	return (
		<Center>
			<mesh position={[0, 1, 0]} castShadow receiveShadow>
				<primitive object={new RoundedBoxGeometry(1.6, 0.035, 0.8, 10, 0.003)} />
				<WoodMaterial />
			</mesh>
			<KeyboardAndMouse position={[0, 1.016, 0.06]} />
			<WidescreenMonitor position={[0, 1.02, -0.24]} />
			<Monitor
				position={[-0.585, 1.17, -0.038]}
				scale={0.00049}
				rotation={new Euler(0, 1, 0)}
				castShadow
				receiveShadow
			>
				<Html center transform scale={19.9} position={[-104, 268, 115]}>
					<div className="w-[2560px] h-[1440px] bg-slate-50">
						<iframe src="https://iseteenindus.enefit.ee" width={2560} height={1440} />
					</div>
				</Html>
			</Monitor>
			<CoffeeMug position={[0.21, 1.05, -0.07]} />
			<TableLamp position={[0.65, 1.023, -0.3]} />
		</Center>
	);
}

export default Table;

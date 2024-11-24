import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import ResizableBox from '../ResizableBox';

interface LineChartProps {
	values: number[];
	min: number;
}

function LineChart({ values, min }: LineChartProps) {
	const data = useMemo(
		() => [
			{
				label: 'Values',
				data:
					values?.map((value, index) => ({
						x: min + index,
						y: value,
					})) || [],
			},
		],
		[values],
	);

	type Datum = (typeof data)[0]['data'][number];

	const primaryAxis = useMemo(
		(): AxisOptions<Datum> => ({
			getValue: (datum) => datum.x,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<Datum>[] => [
			{
				getValue: (datum) => datum.y,
			},
		],
		[],
	);

	return (
		<div>
			<ResizableBox>
				<Chart
					options={{
						data,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</ResizableBox>
		</div>
	);
}

export default LineChart;

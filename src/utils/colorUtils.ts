/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
 */
export function HSVtoRGB(h: number, s: number, v: number) {
	let rgb = [0, 0, 0];
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0:
			rgb = [v, t, p];
			break;
		case 1:
			rgb = [q, v, p];
			break;
		case 2:
			rgb = [p, v, t];
			break;
		case 3:
			rgb = [p, q, v];
			break;
		case 4:
			rgb = [t, p, v];
			break;
		case 5:
			rgb = [v, p, q];
			break;
	}
	return {
		r: Math.round(rgb[0] * 255),
		g: Math.round(rgb[1] * 255),
		b: Math.round(rgb[2] * 255),
	};
}

// From http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/

// Start with a temperature, in Kelvin, somewhere between 1000 and 40000.  (Other values may work,
//  but I can't make any promises about the quality of the algorithm's estimates above 40000 K.)

export function colorTemperatureToRGB(kelvin: number) {
	var temp = kelvin / 100;

	var red, green, blue;

	if (temp <= 66) {
		red = 255;

		green = temp;
		green = 99.4708025861 * Math.log(green) - 161.1195681661;

		if (temp <= 19) {
			blue = 0;
		} else {
			blue = temp - 10;
			blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
		}
	} else {
		red = temp - 60;
		red = 329.698727446 * Math.pow(red, -0.1332047592);

		green = temp - 60;
		green = 288.1221695283 * Math.pow(green, -0.0755148492);

		blue = 255;
	}

	return [clamp(red, 0, 255), clamp(green, 0, 255), clamp(blue, 0, 255)] as const;
}

// r g b object to hex string
export function rgbToHex(r: number, g: number, b: number) {
	return '#' + ((r << 16) | (g << 8) | b).toString(16);
}

function clamp(x: number, min: number, max: number) {
	if (x < min) {
		return min;
	}
	if (x > max) {
		return max;
	}

	return x;
}

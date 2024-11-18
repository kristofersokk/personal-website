import { Link } from '@tanstack/react-router';
import { ImgHTMLAttributes } from 'react';

const ImageWithLabel = ({
	label,
	...imgProps
}: ImgHTMLAttributes<HTMLImageElement> & { label: string }) => (
	<div className="relative">
		<img {...imgProps} className={imgProps.className + ' peer'} />
		<div className="flex transition-opacity opacity-0 peer-hover:opacity-100 text-gray-100 bg-slate-950 justify-center absolute py-1 left-0 bottom-0 right-0 rounded-b-md">
			{label}
		</div>
	</div>
);

function MainPage() {
	return (
		<div className="w-full h-full flex flex-col items-center pt-8">
			<div className="flex flex-wrap justify-center gap-8 mx-8 mb-16">
				<div className="flex flex-col flex-grow p-4 text-wrap xl:max-w-xl">
					<p className="text-slate-200 text-5xl font-AntipastoPro">Hi!</p>
					<p className="text-slate-200 text-5xl font-AntipastoPro">I'm Kristofer Sokk</p>
					<p className="text-slate-200 text-3xl mt-8">
						a senior software engineer
						<br />
						at Enefit AS
					</p>
					<p className="text-slate-200 text-3xl mt-8">
						Among other things, I enjoy board games, video games, singing.
					</p>
					<div className="flex flex-wrap gap-4 mt-8">
						<a
							href="https://www.linkedin.com/in/kristofer-sokk-26245bbb/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="/icons/social-linkedin-svgrepo-com.svg"
								alt="LinkedIn"
								width={50}
							/>
						</a>
						<a href="https://github.com/kristofersokk" target="_blank" rel="noreferrer">
							<img src="/icons/github-svgrepo-com.svg" alt="GitHub" width={50} />
						</a>
						<a href="mailto:kristofer.sokk@gmail.com" target="_blank">
							<img
								src="/icons/microsoft-outlook-svgrepo-com.svg"
								alt="Email"
								width={50}
							/>
						</a>
					</div>
					<hr className="mt-8" />
					<h2 className="text-slate-200 text-2xl mt-8">
						Experiments (enter at own risk)
					</h2>
					<div className="flex flex-col mt-6 gap-2">
						<h3 className="text-slate-200 text-2xl underline">
							<Link to="/experiments/boxes">3D cubes</Link>
						</h3>
						<h3 className="text-slate-200 text-2xl underline">
							<Link to="/experiments/room">3D render of my work table</Link>
						</h3>
					</div>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					<div className="flex flex-col gap-4">
						<ImageWithLabel
							className="rounded-lg"
							src="https://utfs.io/f/ayWUAmbcwFZQMij7cZMlMtNUg8Kc4jSwAR7sXZWGm2xpH1Vu"
							alt="Kristofer Sokk black and white"
							width={300}
							label="Me"
						/>
						<ImageWithLabel
							className="rounded-lg"
							src="https://utfs.io/f/ayWUAmbcwFZQ5EQUpfKAoryQbhN83tMDYFqjT9u1leiw4H0R"
							alt="Collection of board games"
							width={300}
							label="Board games"
						/>
						<ImageWithLabel
							className="rounded-lg"
							src="https://utfs.io/f/ayWUAmbcwFZQMZcOn3lMtNUg8Kc4jSwAR7sXZWGm2xpH1Vud"
							alt="Playing video games"
							width={300}
							label="Video games"
						/>
						<ImageWithLabel
							className="rounded-lg row-span-2"
							src="https://utfs.io/f/ayWUAmbcwFZQ5e86kSKAoryQbhN83tMDYFqjT9u1leiw4H0R"
							alt="On my way to sing at Laulupidu"
							width={300}
							label="Singing"
						/>
					</div>
					<div className="flex flex-col gap-4">
						<ImageWithLabel
							className="rounded-lg row-span-2"
							src="https://utfs.io/f/ayWUAmbcwFZQajKuinbcwFZQDxsKmna8boWqTYPOGNEltd5J"
							alt="Lelle 22 - Enefit office"
							width={300}
							label="My office - Enefit AS"
						/>
						<ImageWithLabel
							className="rounded-lg"
							src="https://utfs.io/f/ayWUAmbcwFZQowwG1XJo5hryc8uRM0amAfXnTLGJi6VOdpYe"
							alt="Me as a conscript"
							width={300}
							label="Conscript"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPage;

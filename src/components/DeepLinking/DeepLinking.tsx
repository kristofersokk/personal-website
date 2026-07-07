import { useState } from 'react';

const DeepLinking = () => {
	const [deepLink, setDeepLink] = useState<string>('your-app-scheme://');

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center gap-4 text-slate-200 [&_a]:underline [&_button]:underline">
			<input
				value={deepLink}
				onChange={(e) => setDeepLink(e.target.value)}
				className="text-slate-800 p-2 rounded-md w-96 max-w-[80vw]"
			/>
			<a href={deepLink}>Link to {deepLink}</a>
			<button
				onClick={() => {
					window.location.href = deepLink;
				}}
			>
				Open {deepLink} | href change
			</button>
			<button
				onClick={() => {
					window.location.assign(deepLink);
				}}
			>
				Open {deepLink} | assign
			</button>
			<button
				onClick={() => {
					window.location.replace(deepLink);
				}}
			>
				Open {deepLink} | replace
			</button>
			<button
				onClick={() => {
					window.open(deepLink, '_blank', 'noopener,noreferrer');
				}}
			>
				Open {deepLink} | window.open with _blank
			</button>
		</div>
	);
};

export default DeepLinking;

import { useCallback, useMemo, useRef, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import AutostereogramAnalysis, { AutostereogramAnalysisProps } from './Analysis';
import { getBytesBeautifulString } from '@/utils/stringUtils';
import classNames from 'classnames';

function Autostereograms() {
	const hiddenImageRef = useRef<HTMLImageElement>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageWidth, setImageWidth] = useState<number>();
	const [imageHeight, setImageHeight] = useState<number>();

	const imageUrl = useMemo(
		() => (imageFile ? window.URL.createObjectURL(imageFile) : undefined),
		[imageFile],
	);

	const handleImageSize = () => {
		if (imageUrl) {
			const imageWidth = hiddenImageRef.current?.width;
			const imageHeight = hiddenImageRef.current?.height;
			setImageWidth(imageWidth);
			setImageHeight(imageHeight);
		}
	};

	const resetState = () => {
		setImageWidth(undefined);
		setImageHeight(undefined);
	};

	const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>((acceptedFiles) => {
		const firstFile = acceptedFiles[0];
		resetState();
		setImageFile(firstFile ?? null);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
		onDrop,
		maxFiles: 1,
		preventDropOnDocument: true,
	});

	const analysisProps: AutostereogramAnalysisProps | undefined = useMemo(
		() =>
			(imageFile &&
				imageWidth &&
				imageHeight && {
					image: imageFile,
					imageWidth,
					imageHeight,
				}) ||
			undefined,
		[imageFile, imageWidth, imageHeight],
	);

	return (
		<div className="flex justify-center text-slate-200">
			<div>
				<h1 className="text-4xl mt-16 mb-12">Autostereogram analysis</h1>
				<div className="flex gap-4">
					<div
						{...getRootProps()}
						className={classNames(
							'p-4 border-2 border-slate-900 border-dashed rounded-md cursor-pointer',
							{
								'bg-slate-700': !isDragActive,
								'bg-slate-600': isDragActive,
							},
						)}
					>
						<input {...getInputProps()} />
						<p>
							{imageFile
								? `${imageFile.name} ${getBytesBeautifulString(imageFile.size)}`
								: "Drag 'n' drop some files here, or click to select files"}
						</p>
					</div>
				</div>
				{imageFile && (
					<>
						<img
							ref={hiddenImageRef}
							src={imageUrl}
							alt="Hidden image"
							className="hidden"
							onLoad={() => {
								handleImageSize();
							}}
							onResize={() => {
								handleImageSize();
							}}
						/>
						<p className="my-4 text-2xl">Preview</p>
						<img src={imageUrl} alt="Uploaded" className="max-h-[400px] max-w-[90vw]" />
						<p className="mt-8 mb-4 text-2xl">Analysis</p>
						{analysisProps && <AutostereogramAnalysis {...analysisProps} />}
					</>
				)}
			</div>
		</div>
	);
}

export default Autostereograms;

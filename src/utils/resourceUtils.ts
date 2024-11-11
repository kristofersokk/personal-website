export function createExternalResource(localPath: string, uploadThingId?: string) {
	return import.meta.env.DEV
		? `/external-assets/${localPath}`
		: `https://utfs.io/f/${uploadThingId}`;
}

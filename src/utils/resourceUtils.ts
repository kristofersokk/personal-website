export function createExternalResource(localPath: string, uploadThingId?: string) {
	return import.meta.env.DEV
		? `/external-resources/${localPath}`
		: `https://utfs.io/f/${uploadThingId}`;
}

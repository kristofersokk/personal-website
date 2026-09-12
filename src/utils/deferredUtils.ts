export interface Deferred<T extends {} | null, E = Error> extends CommonDeferred<E> {
	value: T | undefined;
	then: (onSuccess: (value: T) => void, onFailure?: (error: E) => void) => void;
	map: <R extends {} | null>(mapper: (value: T) => R) => Deferred<R, E>;
	flatMap: <R extends {} | null>(flatMapper: (value: T) => Deferred<R, E>) => Deferred<R, E>;
	also: (callback: (deferred: Deferred<T, E>) => void) => Deferred<T, E>;
}

export type Task<E> = Deferred<null, E>;

interface CommonDeferred<E> {
	state: 'notStarted' | 'pending' | 'success' | 'failure';
	error: E | undefined;
}

function constructDeferredValue<T extends {} | null, E = Error>(
	callback: (onSuccess: (value: T) => void, onFailure: (error: E) => void) => void,
): Deferred<T, E> {
	const additionalCallbacks: ((deferred: Deferred<T, E>) => void)[] = [];

	const deferred: Deferred<T, E> = {
		state: 'notStarted',
		value: undefined,
		error: undefined,
		then: undefined as any,
		map: undefined as any,
		flatMap: undefined as any,
		also: undefined as any,
	};

	deferred.then = (onSuccessCallback, onFailureCallback = console.error) => {
		const setup = () => {
			if (deferred.state === 'notStarted') {
				deferred.state = 'pending';
			}
		};
		const onSuccess = (value: T) => {
			additionalCallbacks.forEach((callback) => callback(deferred));
			deferred.value = value;
			deferred.state = 'success';
			onSuccessCallback(value);
		};
		const onFailure = (error: E) => {
			additionalCallbacks.forEach((callback) => callback(deferred));
			deferred.error = error;
			deferred.state = 'failure';
			onFailureCallback?.(error);
		};

		setTimeout(() => {
			setup();
			try {
				callback(onSuccess, onFailure);
				// @ts-expect-error
			} catch (error: E) {
				onFailure(error);
			}
		}, 50);
	};
	deferred.map = <R extends {} | null>(mapper: (value: T) => R) =>
		constructDeferredValue((onSuccess: (value: R) => void, onFailure: (error: E) => void) => {
			deferred.then(
				(value) => {
					onSuccess(mapper(value));
				},
				(error) => {
					onFailure(error);
				},
			);
		});
	deferred.flatMap = <R extends {} | null>(flatMapper: (value: T) => Deferred<R, E>) =>
		constructDeferredValue((onSuccess: (value: R) => void, onFailure: (error: E) => void) => {
			deferred.then(
				(value) => {
					const newDeferred = flatMapper(value);
					newDeferred.then(
						(innerValue) => {
							onSuccess(innerValue);
						},
						(error) => {
							onFailure(error);
						},
					);
				},
				(error) => {
					onFailure(error);
				},
			);
		});
	deferred.also = (callback: (deferred: Deferred<T, E>) => void) => {
		additionalCallbacks.push(callback);
		return deferred;
	};

	return deferred;
}

export const deferredValue = <T extends {} | null, E = Error>(
	supplier: () => T,
): Deferred<T, E> => {
	return constructDeferredValue((onSuccess: (value: T) => void) => {
		const value = supplier();
		onSuccess(value);
	});
};

export const combineDeferredValues = <T extends {} | null, R extends {} | null = T[], E = Error>(
	deferredValues: Deferred<T, E>[],
	combiner: (values: T[]) => R = (values) => values as unknown as R,
) =>
	constructDeferredValue((onSuccess: (value: R) => void, onFailure: (error: E) => void) => {
		const allCount = deferredValues.length;
		let resolvedCount = 0;
		let foundFailure = false;
		const values: T[] = [];

		deferredValues.forEach((deferredValue, index) => {
			deferredValue.then(
				(value) => {
					values[index] = value;
					resolvedCount++;
					if (resolvedCount === allCount && !foundFailure) {
						const value = combiner(values);
						onSuccess(value);
					}
				},
				(error) => {
					if (!foundFailure) {
						onFailure(error);
					}
					foundFailure = true;
				},
			);
		});
	});

import { useState, useCallback } from "react";

export function useMeasurableRef<T>(): [T | null, (x: T | null) => void] {
	const [respRef, setRespRef] = useState<T | null>(null);
	const respRefCb = useCallback((node: T | null) => {
		if (node !== null) {
			setRespRef(node);
		}
	}, []);
	return [respRef, respRefCb];
}

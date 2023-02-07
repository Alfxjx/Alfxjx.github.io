import { useState, useCallback } from "react";
export function useMeasurableRef(): [HTMLCanvasElement | null, (x: HTMLCanvasElement | null) => void] {
	const [canvasRef, setReadyState] = useState<HTMLCanvasElement | null>(null);
	const canvasRefCb = useCallback((node: HTMLCanvasElement | null) => {
		if (node !== null) {
			setReadyState(node);
		}
	}, []);
	return [canvasRef, canvasRefCb];
}

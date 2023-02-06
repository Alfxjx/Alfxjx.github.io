import { useRef, useEffect } from "react";
import { onresize, setCircles, ctx, start, getRandomInt } from "./index";

export function Neuron() {
	const bodyRef = useRef(null);

	useEffect(() => {
		onresize();
		setCircles();
		ctx!.strokeStyle = "hsla(" + getRandomInt(0, 360) + ",90%,60%,0.6)";
		start();
	}, []);

	return <div ref={bodyRef}></div>;
}

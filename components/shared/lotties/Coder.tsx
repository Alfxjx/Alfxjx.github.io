import Lottie from "react-lottie";
import * as animationData from "./126196-jansmavip-html-and-coding-pages.json";
import { useEffect, useState } from "react";

export function Coder() {
	const [size, setSize] = useState(250);
	useEffect(() => {
		const resizer = () => {
			setSize(window.innerWidth * 0.15);
		};
		window.addEventListener("resize", resizer);
		return () => {
			window.removeEventListener("resize", resizer);
		};
	});
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return <Lottie options={defaultOptions} height={size} width={size} />;
}

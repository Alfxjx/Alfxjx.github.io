import { useState, useEffect } from "react";

export function useProgress() {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setProgress(
				(document.documentElement.scrollTop /
					(document.body.scrollHeight - window.innerHeight)) *
					100
			);
		});
		return () => {
			window.removeEventListener("scroll", () => {});
		};
	});
	return progress;
}

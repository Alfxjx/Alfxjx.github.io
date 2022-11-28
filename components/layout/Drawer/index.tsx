import React, { useEffect, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { NavToggle } from "./NavToggle";
import { Navigation } from "./Navigation";

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 30px 30px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(20px at 30px 30px)",
		transition: {
			delay: 0.25,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export const useDimensions = (ref: React.MutableRefObject<any>) => {
	const dimensions = useRef({ width: 0, height: 0 });

	useEffect(() => {
		dimensions.current.width = ref.current.offsetWidth;
		dimensions.current.height = ref.current.offsetHeight;
	}, [ref]);

	return dimensions.current;
};

export function Drawer() {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}
			className="absolute top-0 left-0 w-[300px] h-screen"
		>
			<Navigation></Navigation>
			<motion.div
				className="absolute top-0 left-0 bg-gray-200 dark:bg-gray-700 w-[300px] h-screen"
				variants={sidebar}
			/>
			<NavToggle toggle={() => toggleOpen()}></NavToggle>
		</motion.nav>
	);
}

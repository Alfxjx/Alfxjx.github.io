import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface IMenuItemProps {
	color: string;
	icon: React.ReactNode;
	url: string;
	text: string;
}

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

export const MenuItem = ({ color, icon, url, text }: IMenuItemProps) => {
	const style = { border: `2px solid ${color}` };
	return (
		<Link href={url}>
			<motion.li
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				className="m-0 p-0 cursor-pointer flex items-center mb-5 w-full"
			>
				<div className="flex-shrink-0 h-10 mr-5 w-10 rounded-full flex justify-center items-center" style={style}>
					{icon}
				</div>

				<div className="flex justify-start rounded flex-grow w-48 flex-1" style={style}>
					<p className="ml-4" style={{ color: color }}>
						{text}
					</p>
				</div>
			</motion.li>
		</Link>
	);
};

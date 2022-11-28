import * as React from "react";
import { motion } from "framer-motion";
import { IMenuItemProps, MenuItem } from "./MenuItem";

import { ImBlog } from "react-icons/im";
import { BsJournalCode, BsArchive, BsFillPersonFill } from "react-icons/bs";
import { TfiThought } from "react-icons/tfi";

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const Navigation = () => (
	<motion.ul variants={variants} className="z-40 before:p-6 absolute left-4 top-[100px]">
		{routes.map((x, idx) => (
			<MenuItem color={x.color} icon={x.icon} url={x.url} text={x.text} key={idx} />
		))}
	</motion.ul>
);

const routes: IMenuItemProps[] = [
	{
		color: "#FF008C",
		icon: <ImBlog style={{ color: "#FF008C" }}></ImBlog>,
		url: "/blog",
		text: "Blog",
	},
	{
		color: "#D309E1",
		icon: <BsJournalCode style={{ color: "#D309E1" }}></BsJournalCode>,
		url: "/code",
		text: "Code",
	},
	{
		color: "#9C1AFF",
		icon: <BsArchive style={{ color: "#9C1AFF" }}></BsArchive>,
		url: "/archive",
		text: "Archive",
	},
	{
		color: "#7700FF",
		icon: <BsFillPersonFill style={{ color: "#7700FF" }}></BsFillPersonFill>,
		url: "/about",
		text: "About",
	},
	{
		color: "#4400FF",
		icon: <TfiThought style={{ color: "#4400FF" }}></TfiThought>,
		url: "/thought",
		text: "Thought",
	},
];

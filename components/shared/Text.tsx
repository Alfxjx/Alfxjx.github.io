import React from "react";
export function Text({ children }: { children: React.ReactNode }) {
	return <p className="text-black dark:text-gray-400 text-xl my-2">{children}</p>;
}

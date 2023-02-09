import React from "react";
export function Text({ children }: { children: React.ReactNode }) {
	return <p className="text-black dark:text-gray-400 text-lg max-md:text-md mb-1">{children}</p>;
}

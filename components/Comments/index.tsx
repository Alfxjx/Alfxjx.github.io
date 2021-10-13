import React from "react";
import { MyContext } from "../../pages/_app";

const commentNodeId = "comments";
const REPO_NAME = "alfxjx/Alfxjx";
export const Comments = () => {
	const commentBox = React.useRef<HTMLDivElement>();
	const { themeToggler, getNowTheme } = React.useContext(MyContext);

	React.useEffect(() => {
		while (commentBox.current.firstChild) {
			commentBox.current.removeChild(commentBox.current.firstChild);
		}
		// docs - https://utteranc.es/
		const script = document.createElement("script");
		script.src = "https://utteranc.es/client.js";
		script.async = true;
		script.setAttribute("repo", REPO_NAME);
		script.setAttribute("issue-term", "title");
		script.setAttribute("label", "comment :speech_balloon:");
		script.setAttribute("theme", `github-${getNowTheme()}`);
		script.setAttribute("crossorigin", "anonymous");
		commentBox.current.appendChild(script);
	}, [getNowTheme()]);
	return <div ref={commentBox} id={commentNodeId} />;
};

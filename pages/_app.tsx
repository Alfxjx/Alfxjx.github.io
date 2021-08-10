import "../styles/base.css";

import { createGlobalStyle } from "styled-components";

const FontStyles = createGlobalStyle`
@font-face {
	font-family: "GreenHome";
	src: url("/fonts/GreenHome.ttf");
	font-style: normal;
	font-weight: 400;
}
.green-home{
	font-family: "GreenHome";
}

`;

function MyApp({ Component, pageProps }) {
	return (
		<>
			<FontStyles />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;

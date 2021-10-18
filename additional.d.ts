declare global {
	interface Window {
		mozRTCPeerConnection: RTCPeerConnection;
	}
}

declare module "*.svg" {
	import { ReactElement, SVGProps } from "react";

	const content: (props: SVGProps<SVGElement>) => ReactElement;
	export default content;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

declare module "*.woff2";
declare module "*.ttf";
declare namespace JSX {
	interface IntrinsicElements {
		"css-doodle": {};
	}
}

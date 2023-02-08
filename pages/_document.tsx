import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="stylesheet" href="/style/index.css" />
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
						rel="stylesheet"
					></link>
					<script
						async
						defer
						src="https://analytics.umami.is/script.js"
						data-website-id="b614609e-f4b3-4e4c-beee-9466565afa11"
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

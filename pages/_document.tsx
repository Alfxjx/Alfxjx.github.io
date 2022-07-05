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
					<script async defer data-website-id="3890bdd6-8ff5-4da5-8b72-45ba24876897" src="https://umami-alfxjx.up.railway.app/umami.js"></script>
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

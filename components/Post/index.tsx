import theme from "@chakra-ui/theme";
import React from "react";
import styled from "styled-components";

export const Post = styled.div`
	blockquote {
		border-left: 5px solid ${({ theme }) => theme.themeColor};
		padding-left: 5px;
		margin: 10px 0 10px 3px;
		line-height: 1.5rem;
	}
	pre {
		font-family: consolas, sans-serif;
		letter-spacing: 0.2px;
	}
	h1 {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		margin: 10px 0;
	}
	h2 {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		margin: 10px 0;
	}
	h3 {
		font-size: 1.125rem;
		line-height: 1.5rem;
		font-weight: 700;
		margin: 10px 0;
	}
	h4 {
		font-size: 1.125rem;
		line-height: 1.5rem;
		font-weight: 500;
		margin: 3px 0;
	}
	p {
		margin: 10px 0;
		line-height: 1.5rem;
		position: relative;
	}
	img {
		max-width: 75%;
		position: relative;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 20px 0;
	}
	pre {
		margin: 5px 0;
		padding: 10px;
		overflow-x: scroll;
		span {
			line-height: 1.5rem;
		}
	}
	a {
		color: ${({ theme }) => theme.themeColor};
		margin: 0 2px;
		&:hover {
			color: ${({ theme }) => theme.textHover};
		}
	}
	ol {
		line-height: 1.5rem;
		list-style: lower-roman;
		padding: 0 0 0 1.5rem;
		@media (max-width: 600px) {
			padding: 0 0 0 0.5rem;
		}
	}
	ul {
		line-height: 1.5rem;
		list-style: circle;
		padding: 0 0 0 1.5rem;
		@media (max-width: 600px) {
			padding: 0 0 0 0.5rem;
		}
	}
	li {
		margin: 5px 0;
	}
	strong {
		font-weight: 700;
		color: ${({ theme }) => theme.themeColor};
	}
	em {
		font-style: italic;
		text-decoration: underline;
		text-decoration-color: ${({ theme }) => theme.themeColor};
	}
`;

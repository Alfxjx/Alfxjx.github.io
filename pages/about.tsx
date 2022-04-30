import { getAboutData } from "@/utils/api";
import React from "react";
import styled from "styled-components";
import { BaseLayout } from "../components/Layout/base";
import markdownToHtml from "@/utils/markdownToHtml";
import { Post as PostStyles } from "@/components/Post/index";
import { Comments } from "@/components/Comments/index";

const About = ({ post }) => {
	return (
		<BaseLayout title="About">
			<AboutWrapper>
				<div className="card">
					<h1>{post.title}</h1>
					<div
						className="post"
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<Comments />
				</div>
			</AboutWrapper>
		</BaseLayout>
	);
};

const AboutWrapper = styled(PostStyles)`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin: 2rem auto 0;
	max-width: 1280px;
	.card {
		width: 80%;
		padding: 3rem 2rem;
		border-radius: 6px;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
		background: ${({ theme }) => theme.backgroundLight};
		color: ${({ theme }) => theme.text};
		@media (max-width: 600px) {
			width: 90%;
		}
	}
`;

export default About;

export async function getStaticProps() {
	const post = getAboutData(["title", "author", "content"]);
	const content = await markdownToHtml(post.content || "");
	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

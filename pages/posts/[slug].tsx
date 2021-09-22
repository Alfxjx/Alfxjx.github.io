import { getPostBySlug, getAllPosts } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
import styled from "styled-components";

export default function Post({ post }) {
	return (
		<div>
			<PostWrapper>
				<div
					className='post'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</PostWrapper>
		</div>
	);
}

const PostWrapper = styled.div`
	margin: 2% 15%;
	blockquote {
		border-left: 5px solid #447bdb;
		padding-left: 5px;
		margin: 10px 0 10px 3px;
		line-height: 1.5rem;
	}
	h1 {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		margin: 10px 0;
	}
	h1 {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		margin: 10px 0;
	}
	p {
		margin: 10px 0;
		line-height: 1.5rem;
		position: relative;
	}
	img {
		position: relative;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 20px 0;
	}
	pre {
		margin: 5px 0;
		padding: 10px;
		background: #eee;
		code {
			line-height: 1.5rem;
		}
	}
	a {
		color: #447bdb;
		margin: 0 2px;
		&:hover {
			color: #34c;
		}
	}
	ol {
		line-height: 1.5rem;
		list-style: circle;
		padding: 0 0 0 2.5rem;
	}
	ul {
		line-height: 1.5rem;
		list-style: lower-roman;
		padding: 0 0 0 2.5rem;
	}
	li {
		margin: 5px 0;
	}
`;

export async function getStaticProps({ params }) {
	const post: any = getPostBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage",
	]);
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

export async function getStaticPaths() {
	const posts: any[] = getAllPosts(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}

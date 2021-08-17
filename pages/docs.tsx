import { getAllPosts, getAllBlogs } from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Footer } from "../components/Footer/index";

import Github from "../public/github.svg";
import Weibo from "../public/weibo.svg";
import Juejin from "../public/juejin.svg";

export default function Document({ allPosts }) {
	const router = useRouter();
	return (
		<ListPage>
			<div className="header">
				<Avatar
					onClick={() => {
						router.push("/");
					}}
					src="/Patrick.jpg"
					alt="avatar"
				/>
				<div className="links">
					<a href="https://github.com/alfxjx">
						<Github />
					</a>
					<a href="https://weibo.com/u/1950371745">
						<Weibo />
					</a>
					<a href="https://juejin.cn/user/2330620383728551">
						<Juejin />
					</a>
				</div>
			</div>
			<div className="blog-list">
				{allPosts.map((post) => {
					return (
						<div key={post.slug}>
							<BlogCard post={post} />
							<span>{post.author.name}</span>
						</div>
					);
				})}
			</div>
			<div className="footer-wrapper">
				<Footer showLink={false} />
			</div>
		</ListPage>
	);
}

const BlogCard = ({post}) => (
	<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
		<a className="hover:underline">{post.title}</a>
	</Link>
);

const ListPage = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.header {
		margin: 0.5rem 0 0 1rem;
		position: absolute;
		top: 0;
		left: 0;
		.links {
			display: flex;
			flex-direction: column;
			align-items: center;
			a:first-child {
				margin-top: 0.75rem;
			}
			a {
				margin: 0.25rem 0;
			}
			svg {
				width: 1.75rem;
				height: 1.75rem;
			}
		}
	}
	.blog-list {
		margin: 0 0 0 7rem;
		box-sizing: border-box;
		padding-top: 2rem;
		flex: 1 1 auto;
	}
	.footer-wrapper {
		flex: 0 0 auto;
		display: flex;
		justify-content: center;
		padding: 0.25rem 0;
	}
`;

const Avatar = styled.img`
	border-radius: 50%;
	width: 4rem;
	height: 4rem;
	cursor: pointer;
`;

export async function getStaticProps() {
	const allPosts = getAllPosts([
		"title",
		"date",
		"slug",
		"author",
		"type",
		"coverImage",
		"excerpt",
	]);

	const allBlogs = getAllBlogs([
		"title",
		"date",
		"slug",
		"author",
		"type",
		"coverImage",
		"excerpt",
	]);

	return {
		props: { allPosts: [...allBlogs, ...allPosts] },
	};
}

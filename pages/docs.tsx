import React, { useLayoutEffect, useEffect } from "react";
import { getAllPosts } from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "../components/Footer/index";
import { formatDate } from "../utils/formatDate";
import Github from "../public/github.svg";
import Weibo from "../public/weibo.svg";
import Juejin from "../public/juejin.svg";
import Share from "../public/share.svg";

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
				<div className="real-list">
					{allPosts.map((post) => {
						return <BlogCard post={post} key={post.slug} />;
					})}
				</div>
			</div>
			<div className="footer-wrapper">
				<Footer showLink={false} />
			</div>
		</ListPage>
	);
}

const BlogCard = ({ post }) => (
	<BlogCardWrapper>
		<div className="fixed">
			<Share />
		</div>
		<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
			<img src={post.coverImage} alt="" />
		</Link>
		<div className="blog-info">
			<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
				<a className="link" title={post.title}>
					{post.title}
				</a>
			</Link>
			<div className="blog-sub">
				<span>{formatDate(new Date(post.date), "yyyy-MM-dd")}</span>
				<span>{post.author.name}</span>
			</div>
		</div>
	</BlogCardWrapper>
);

const BlogCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 30%;
	min-width: 18rem;
	position: relative;
	padding: 8px 0px;
	margin: 8px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	.fixed {
		position: absolute;
		top: 10%;
		right: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 1.5rem;
			height: 1.5rem;
			color: #fff;
			cursor: pointer;
		}
	}
	img {
		width: 100%;
		cursor: pointer;
	}
	.blog-info {
		width: 100%;
		height: 3rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 8px 8px 4px 8px;
		box-sizing: border-box;
		.link {
			width: 80%;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.blog-sub {
			width: 100%;
			font-size: 0.875rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
`;

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
		display: flex;
		justify-content: center;
		.real-list {
			width: 80%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-wrap: wrap;
		}
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
	return {
		props: { allPosts: [...allPosts] },
	};
}

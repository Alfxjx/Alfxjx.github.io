import React, { useContext, useState } from "react";
import { Toggle } from "../components/theme/Toggle";
import Masonry from "react-masonry-css";
import { getPostBySlug, getAllPosts } from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "../components/Footer/index";
import { formatDate } from "../utils/formatDate";

import Share from "../public/share.svg";
import Expand from "../public/expand.svg";
import { MyContext } from "./_app";
import markdownToHtml from "../utils/markdownToHtml";


// @note react-reveal 之后文章多了可以用
export default function Document({ newOneContent, allPosts }) {
	const router = useRouter();
	const { themeToggler, getNowTheme } = useContext(MyContext);

	const breakpointColumnsObj = {
		default: 3,
		1800: 3,
		1200: 2,
		960: 1,
	};
	const [newOne, ...restPosts] = allPosts;
	return (
		<ListPage>
			<div className="btn-wrapper">
				<Toggle toggleTheme={() => themeToggler()}>{getNowTheme()}</Toggle>
			</div>
			<div className="header">
				<Avatar
					onClick={() => {
						router.push("/");
					}}
					src="/Patrick.jpg"
					alt="avatar"
				/>
				<div className="links">
					<Link href="/about">About</Link>
					<Link href="/archive">Archive</Link>
				</div>
			</div>
			<div className="blog-list">
				<NewBlog post={newOneContent} />
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{restPosts.map((post) => {
						return <BlogCard post={post} key={post.slug} />;
					})}
				</Masonry>
			</div>
			<div className="footer-wrapper">
				<Footer showLink={true} />
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
				<span className="username">@{post.author.name} </span>
				<span className="date">
					{formatDate(new Date(post.date), "yyyy-MM-dd")}
				</span>
			</div>
		</div>
	</BlogCardWrapper>
);

const NewBlog = ({ post }) => {
	return (
		<NewBlogWrapper>
			<div className="expand">
				<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
					<a>
						<Expand />
					</a>
				</Link>
			</div>
			<div className="left-part">
				<div className="img">
					<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
						<a>
							<img src={post.coverImage} alt="" />
						</a>
					</Link>
				</div>
				<div className="title">
					<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
						<a>{post.title}</a>
					</Link>
				</div>
				<div className="info">
					<div className="username">@{post.author.name}</div>
					<div>{formatDate(new Date(post.date), "yyyy-MM-dd")}</div>
				</div>
			</div>
			<div className="right-part">
				<section
					className="content"
					dangerouslySetInnerHTML={{ __html: post.content.slice(0, 1500) }}
				/>
				<span className="ellip">...</span>
			</div>
		</NewBlogWrapper>
	);
};

const ListPage = styled.div`
	position: relative;
	width: 100%;
	/* height: 100vh; */
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	.btn-wrapper {
		position: fixed;
		right: 1rem;
		top: 0.5rem;
		z-index: 100;
		button {
			margin: 0 2px;
		}
	}
	.header {
		margin: 0.5rem 0 0 1rem;
		position: fixed;
		top: 0;
		left: 0;
		background: ${({ theme }) => theme.background};
		color: ${({ theme }) => theme.text};
		@media (max-width: 600px) {
			margin: 0;
			width: 100%;
			box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px,
				rgb(0 0 0 / 8%) 0px 0px 0px 1px;
			z-index: 20;
			display: flex;
			padding: 5px 3%;
			justify-content: flex-start;
		}
		.links {
			display: flex;
			flex-direction: column;
			align-items: center;
			@media (max-width: 600px) {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
			}
			a {
				margin: 0.5rem 0;
				color: ${({ theme }) => theme.themeColor};
				text-decoration: none;
				&:hover {
					color: ${({ theme }) => theme.textHover};
				}
				@media (max-width: 600px) {
					margin: 0.5rem 10px;
				}
			}
		}
	}
	.blog-list {
		@media (max-width: 600px) {
			margin: 0 10px;
		}
		margin: 0 5%;
		padding: 2rem 0 0 0;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		.my-masonry-grid {
			@media (max-width: 600px) {
				width: 95%;
			}
			width: 75%;
			display: flex;
			justify-content: flex-start;
			margin: 0 auto;
		}
	}
	.footer-wrapper {
		flex: 0;
		display: flex;
		justify-content: center;
		padding: 0.25rem 0;
	}
`;

const Avatar = styled.img`
	border-radius: 50%;
	width: 4rem;
	height: 4rem;
	@media (max-width: 600px) {
		width: 2.4rem;
		height: 2.4rem;
	}
	cursor: pointer;
`;

const BlogCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	padding: 0px;
	margin: 12px 8px;
	background: ${({ theme }) => theme.backgroundLight};
	color: ${({ theme }) => theme.text};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	.fixed {
		position: absolute;
		bottom: 0;
		right: 0%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		padding: 5px 3px 0;
		svg {
			width: 2rem;
			height: 2rem;
			fill: ${({ theme }) => theme.text};
			cursor: pointer;
		}
	}
	img {
		width: 100%;
		cursor: pointer;
	}
	.blog-info {
		width: 100%;
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
			line-height: 3rem;
			text-decoration: none;
			color: ${({ theme }) => theme.text};
			font-weight: 600;
			&:hover {
				color: ${({ theme }) => theme.themeColor};
			}
		}
		.blog-sub {
			width: 100%;
			font-size: 0.875rem;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			line-height: 1.618rem;
			.username {
				color: ${({ theme }) => theme.themeColor};
				margin-right: 1rem;
			}
		}
	}
`;

const NewBlogWrapper = styled.div`
	position: relative;
	width: 75%;
	@media (max-width: 600px) {
		width: 95%;
	}
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 0 0 2rem;
	margin: 12px 8px;
	background: ${({ theme }) => theme.backgroundLight};
	color: ${({ theme }) => theme.text};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	.expand {
		position: absolute;
		bottom: 10px;
		right: 20px;
		svg {
			width: 1.5rem;
			height: 1.5rem;
			cursor: pointer;
			fill: ${({ theme }) => theme.text};
			path {
				fill: inherit;
			}
		}
	}
	.left-part {
		height: 100%;
		flex: 4;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		.img {
			width: 100%;
			img {
				width: 100%;
			}
		}
		a {
			color: ${({ theme }) => theme.text};
			text-decoration: none;
			&:hover {
				color: ${({ theme }) => theme.themeColor};
			}
		}
		.title {
			width: 100%;
			font-size: 1.5rem;
			font-weight: 700;
			text-align: left;
			margin: 1.5rem 0 0.75rem;
			padding: 6px 12px;
			box-sizing: border-box;
		}
		.info {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 6px 12px;
			box-sizing: border-box;
			.username {
				color: ${({ theme }) => theme.themeColor};
			}
		}
	}
	.right-part {
		flex: 6;
		.content {
			padding: 6px 12px;
			box-sizing: border-box;
			line-height: 1.5rem;
			img {
				display: none;
			}
		}
		.ellip{
			padding: 3px 12px;
		}
	}
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
	const [newOnePost, ...restPosts] = allPosts;
	const newOneContent = getPostBySlug(newOnePost.slug, [
		"title",
		"date",
		"slug",
		"author",
		"type",
		"content",
		"ogImage",
		"coverImage",
	]);
	const {content, ...rest} = newOneContent;
	const contentMarked = await markdownToHtml(content || "");
	return {
		props: { newOneContent:{
			content: contentMarked,
			...rest
		}, allPosts: [...allPosts] },
	};
}

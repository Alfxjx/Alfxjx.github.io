import React, { useContext, useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Masonry from "react-masonry-css";
import Slide from "react-reveal/Slide";
import styled from "styled-components";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "@/components/Toast/index";

import { Footer } from "@/components/Footer/index";
import { Header } from "@/components/Header/index";
import { Post as PostStyles } from "@/components/Post/index";
import { Switch } from "../Button/switch";
import { Tag } from "@/components/Tag/index";

import { formatDate } from "@/utils/formatDate";
import { MyContext } from "../../pages/_app";

import { BiShare as Share, BiExpandAlt as Expand } from "react-icons/bi";

// @note react-reveal 之后文章多了可以用
export function PostList({ newOneContent, allPosts }) {
	const router = useRouter();
	const { themeToggler, getNowTheme } = useContext(MyContext);
	const [NowTheme, setNowTheme] = useState("");
	useEffect(() => {
		const theme = getNowTheme();
		if (theme === "light") {
			setNowTheme("L");
		} else {
			setNowTheme("D");
		}
	}, [getNowTheme()]);
	useEffect(() => {
		document.title = "Blog-Life";
	}, []);
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
				<Switch
					initalValue={NowTheme === "L"}
					onChange={() => themeToggler()}
				></Switch>
			</div>
			<Header></Header>
			<div className="blog-list">
				<NewBlog post={newOneContent} />
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{restPosts.map((post) => {
						return (
							<Slide bottom key={post.slug}>
								<BlogCard post={post} />
							</Slide>
						);
					})}
				</Masonry>
			</div>
			<div className="footer-wrapper">
				<Footer showLink={true} />
			</div>
		</ListPage>
	);
}

const BlogCard = ({ post }) => {
	const [link, setLink] = useState("");
	const handleText = (post) => {
		return `「${post.title}」 ${link}/${post.slug}`;
	};
	useEffect(() => {
		setLink(window.location.href);
	}, []);
	return (
		<BlogCardWrapper>
			<div className="fixed" title="share/分享">
				<CopyToClipboard
					text={handleText(post)}
					onCopy={() => {
						toast.success("copied!");
					}}
				>
					<Share />
				</CopyToClipboard>
			</div>
			<div className="img-dark-wrapper">
				<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
					<>
						<img src={post.coverImage} alt="" />
						<div className="img-dark"></div>
					</>
				</Link>
			</div>
			<div className="blog-info">
				<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
					<a className="link" title={post.title}>
						{post.title}
					</a>
				</Link>
				<div className="blog-excerpt">{post.excerpt}</div>
				<div className="blog-sub">
					<span className="username">@{post.author.name} </span>
					<span className="date">
						{formatDate(new Date(post.date), "yyyy-MM-dd")}
					</span>
				</div>
				<div className="blog-tag">
					{post.tag.map((tag) => {
						return <Tag key={tag}>{tag}</Tag>;
					})}
				</div>
			</div>
		</BlogCardWrapper>
	);
};

const NewBlog = ({ post }) => {
	const [link, setLink] = useState("");
	const handleText = (post) => {
		return `「${post.title}」 ${link}/${post.slug}`;
	};
	useEffect(() => {
		setLink(window.location.href);
	}, []);
	return (
		<NewBlogWrapper>
			<div className="expand">
				<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
					<a style={{ marginRight: "20px" }}>
						<Expand />
					</a>
				</Link>
				<CopyToClipboard
					text={handleText(post)}
					onCopy={() => {
						toast.success("copied!");
					}}
				>
					<Share />
				</CopyToClipboard>
			</div>
			<div className="left-part">
				<div className="img">
					<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
						<a>
							<img src={post.coverImage} alt="" />
							<div className="img-dark"></div>
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
				{/* 删除了预览全文 */}
				{/* <PostWrapper
					className='content'
					dangerouslySetInnerHTML={{ __html: post.content.slice(0, 1500) }}
				/> */}
				<div className="blog-excerpt">{post.excerpt}</div>

				<div className="ellip">...</div>
			</div>
			<div className="tag">
				{post.tag.map((tag) => {
					return <Tag key={tag}>{tag}</Tag>;
				})}
			</div>
		</NewBlogWrapper>
	);
};

const ListPage = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
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
	.blog-list {
		@media (max-width: 600px) {
			margin: 0 10px;
			padding: 3rem 0 0 0;
		}
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 0 0 0;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		.my-masonry-grid {
			@media (max-width: 1500px) {
				width: 90%;
			}
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

const BlogCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	padding: 0px;
	margin: 12px 8px;
	background: ${({ theme }) => theme.backgroundLight};
	color: ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	box-shadow: ${({ theme }) => theme.boxShadow};
	.fixed {
		position: absolute;
		bottom: 5px;
		right: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: ${({ theme }) => theme.borderRadius};
		padding: 5px 3px 0;
		svg {
			width: 1.5rem;
			height: 1.5rem;
			fill: ${({ theme }) => theme.text};
			cursor: pointer;
		}
	}
	.img-dark-wrapper {
		width: 100%;
		position: relative;
		.img-dark {
			display: ${({ theme }) => (theme.theme === "light" ? "none" : "block")};
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			z-index: 10;
		}
	}
	img {
		width: 100%;
		cursor: pointer;
		border-radius: ${({ theme }) => theme.borderRadius}
			${({ theme }) => theme.borderRadius} 0 0;
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
			width: 100%;
			margin: 0.5rem 0;
			/* text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden; */
			line-height: 2rem;
			font-size: 1rem;
			text-decoration: none;
			color: ${({ theme }) => theme.text};
			font-weight: 600;
			&:hover {
				color: ${({ theme }) => theme.themeColor};
			}
		}
		.blog-excerpt {
			margin: 0 0 0.5rem 0;
			line-height: 1.2rem;
			font-size: 0.75rem;
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
		.blog-tag {
			line-height: 2rem;
			font-size: 0.875rem;
			overflow: hidden;
		}
	}
`;

const NewBlogWrapper = styled.div`
	position: relative;
	width: 75%;
	@media (max-width: 1500px) {
		width: 90%;
	}
	@media (max-width: 600px) {
		width: 95%;
	}
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 0 0 2rem;
	margin: 12px 8px;
	background: ${({ theme }) => theme.backgroundLight};
	color: ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	box-shadow: ${({ theme }) => theme.boxShadow};
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
			img {
				width: 100%;
			}
			width: 100%;
			position: relative;
			.img-dark {
				display: ${({ theme }) => (theme.theme === "light" ? "none" : "block")};
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.3);
				z-index: 10;
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
			line-height: 2rem;
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
		width: 100%;
		flex: 6;
		.blog-excerpt {
			padding: 6px 12px;
			line-height: 1.2rem;
			text-align: center;
		}
		.ellip {
			padding: 6px 12px;
			text-align: center;
		}
	}
	.tag {
		position: absolute;
		bottom: 5px;
		left: 20px;
		line-height: 2rem;
		font-size: 0.875rem;
		overflow: hidden;
		text-align: left;
	}
`;

const PostWrapper = styled(PostStyles)`
	padding: 5px;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BaseLayout } from "@/components/Layout/base";
import { Button, TextButton } from "@/components/Button/index";
import { getAllBlogs, getAllPosts } from "@/utils/api";
import { formatDate } from "@/utils/formatDate";

export default function Archive({ posts, allPosts, allBlogs }) {
	const [LifeFoucs, setLife] = useState<"primary" | "ghost">("primary");
	const [TechFoucs, setTech] = useState<"primary" | "ghost">("primary");
	const handleArchive = (type) => {
		if (type === "Life") {
			setLife("ghost");
			setTech("primary");
		} else if (type === "Tech") {
			setLife("primary");
			setTech("ghost");
		} else if (type === "All") {
			setLife("primary");
			setTech("primary");
		}
	};
	const [filterPosts, setPosts] = useState(posts);
	useEffect(() => {
		if (LifeFoucs === "primary" && TechFoucs === "ghost") {
			setPosts(allBlogs);
		} else if (TechFoucs === "primary" && LifeFoucs === "ghost") {
			setPosts(allPosts);
		} else {
			setPosts(posts);
		}
	}, [LifeFoucs, TechFoucs]);
	return (
		<BaseLayout>
			<ArchiveWrapper>
				<div className='card'>
					<div className='switch'>
						<Button
							btnType={LifeFoucs}
							onClick={() => {
								handleArchive("Life");
							}}>
							Life {LifeFoucs === "primary" ? "x" : ""}
						</Button>
						<Button
							btnType={TechFoucs}
							onClick={() => {
								handleArchive("Tech");
							}}
							style={{ marginLeft: "5px" }}>
							Tech {TechFoucs === "primary" ? "x" : ""}
						</Button>
						<TextButton
							showUnderLine={true}
							onClick={() => {
								handleArchive("All");
							}}
							style={{ marginLeft: "5px" }}>
							All
						</TextButton>
					</div>
					{filterPosts.map((post) => {
						return (
							<div className='post-item' key={post.slug}>
								<a className='link'>
									<span className='date'>
										{formatDate(new Date(post.date), "yyyy-MM-dd")}
									</span>
									<Link
										as={`/${post.type}/${post.slug}`}
										href={`/${post.type}/[slug]`}>
										<span className='title'>{post.title}</span>
									</Link>
									<span className='type'>{post.type}</span>
								</a>
							</div>
						);
					})}
				</div>
			</ArchiveWrapper>
		</BaseLayout>
	);
}

const ArchiveWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin-top: 2rem;
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
		.switch {
			margin-bottom: 0.5rem;
		}
		.post-item {
			display: flex;
			width: 100%;
			align-items: center;
			.link {
				width: 100%;
				margin: 0.25rem 0;
				line-height: 2rem;
				font-size: 1rem;
				text-decoration: none;
				color: ${({ theme }) => theme.text};
				font-weight: 500;
				&:hover {
					color: ${({ theme }) => theme.themeColor};
				}
				.type {
					border-radius: 6px;
					background: ${({ theme }) => theme.themeColor};
					color: ${({ theme }) => theme.textReverse};
					padding: 2px 6px;
					margin: 0 5px 0 10px;
					font-family: consolas, sans-serif;
				}
				.date {
					margin: 0 10px 0 0;
					color: ${({ theme }) => theme.textGray};
					font-size: 0.875rem;
				}
				.title {
					font-weight: 400;
					cursor: pointer;
				}
			}
		}
	}
`;

export async function getStaticProps() {
	const allPosts = getAllPosts(["title", "date", "type", "slug"]);
	const allBlogs = getAllBlogs(["title", "date", "type", "slug"]);
	const posts = [...allBlogs, ...allPosts]
		.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		})
		.reverse();
	return {
		props: {
			posts,
			allPosts,
			allBlogs,
		},
	};
}

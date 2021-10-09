import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { BaseLayout } from "@/components/Layout/base";
import { getAllBlogs, getAllPosts } from "@/utils/api";
import { formatDate } from "@/utils/formatDate";

export default function Archive({ posts }) {
	return (
		<BaseLayout>
			<ArchiveWrapper>
				<div className='card'>
					{posts.map((post) => {
						return (
							<div className='post-item' key={post.slug}>
								<Link
									as={`/${post.type}/${post.slug}`}
									href={`/${post.type}/[slug]`}>
									<a className='link'>
										<span className='date'>
											{formatDate(new Date(post.date), "yyyy-MM-dd")}
										</span>
										<span className='title'>{post.title}</span>
										<span className='type'>{post.type}</span>
									</a>
								</Link>
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
		},
	};
}

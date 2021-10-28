import React from "react";
import Post from "@/components/Post/Post";
import { getPostBySlug, getAllPosts } from "@/utils/api";
import markdownToHtml from "@/utils/markdownToHtml";

export default function LifePost({ post }) {
	return <Post type='code' post={post}></Post>;
}

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

import React from "react";
import { getPostBySlug, getAllPosts } from "../utils/api";
import markdownToHtml from "../utils/markdownToHtml";
import { PostList } from "@/components/Post/PostList";

// @note react-reveal 之后文章多了可以用
export default function Document({ newOneContent, allPosts }) {
	return (
		<PostList newOneContent={newOneContent} allPosts={allPosts}></PostList>
	);
}

export async function getStaticProps() {
	const allPosts = getAllPosts([
		"title",
		"date",
		"slug",
		"author",
		"type",
		"tag",
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
		"tag",
		"content",
		"ogImage",
		"coverImage",
	]);
	const { content, ...rest } = newOneContent;
	const contentMarked = await markdownToHtml(content || "");
	return {
		props: {
			newOneContent: {
				content: contentMarked,
				...rest,
			},
			allPosts: [...allPosts],
		},
	};
}

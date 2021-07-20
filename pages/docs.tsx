import { getAllPosts, getAllBlogs} from "../utils/api";
import Link from "next/link";

export default function Document({ allPosts }) {
	return (
		<div className="w-screen h-screen">
			{allPosts.map((post) => {
				return (
					<div>
						<Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
							<a className="hover:underline">{post.title}</a>
						</Link>
						<span>{post.author.name}</span>
					</div>
				);
			})}
		</div>
	);
}

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
		props: { allPosts:[
			...allBlogs,...allPosts
		] },
	};
}

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const blogDirectory = join(process.cwd(), "_blogs");

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getBlogSlugs() {
	return fs.readdirSync(blogDirectory);
}

export function getPostBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	const items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === "slug") {
			items[field] = realSlug;
		}
		if (field === "content") {
			items[field] = content;
		}

		if (data[field]) {
			items[field] = data[field];
		}
	});

	return items;
}

export function getBlogBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(blogDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	const items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === "slug") {
			items[field] = realSlug;
		}
		if (field === "content") {
			items[field] = content;
		}

		if (data[field]) {
			items[field] = data[field];
		}
	});

	return items;
}


export function getAllPosts(fields = []) {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
	return posts;
}

export function getAllBlogs(fields = []) {
	const slugs = getBlogSlugs();
	const posts = slugs
		.map((slug) => getBlogBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
	return posts;
}
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const blogDirectory = join(process.cwd(), "_blogs");
const aboutDirectory = join(process.cwd(), "_about");
const shortDirectory = join(process.cwd(), "_short");

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

	return items as any;
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

	return items as any;
}

export function getAboutBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(aboutDirectory, `${realSlug}.md`);
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

	return items as any;
}

export function getShortBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(shortDirectory, `${realSlug}.md`);
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

	return items as any;
}

export function getAllPosts(fields = []) {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
	return posts as any;
}

export function getAllBlogs(fields = []) {
	const slugs = getBlogSlugs();
	const posts = slugs
		.map((slug) => getBlogBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
	return posts as any;
}

export function getAboutData(fields = []) {
	// only use the first md
	const slug = fs.readdirSync(aboutDirectory)[0];
	const post = getAboutBySlug(slug, fields);
	return post as any;
}

export function getShortData(fields = []) {
	// only use the first md
	const slug = fs.readdirSync(shortDirectory)[0];
	const post = getShortBySlug(slug, fields);
	return post as any;
}

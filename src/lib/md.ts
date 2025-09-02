import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "src/content");

export function getDocSlugs() {
  return fs.readdirSync(contentDir).map(file => file.replace(/\.md$/, ""));
}

export async function getDocBySlug(slug: string) {
  const fullPath = path.join(contentDir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return { slug, frontmatter: data, contentHtml };
}

export function getAllDocsMeta() {
  const slugs = getDocSlugs();
  return slugs.map(slug => {
    const fullPath = path.join(contentDir, `${slug}.md`);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(file);
    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
    };
  });
}


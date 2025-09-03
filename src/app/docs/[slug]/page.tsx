import { getDocSlugs, getDocBySlug } from "@/lib/md";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getDocSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function DocPage({ params }: Props) {
  const { slug } = params;
  const doc = await getDocBySlug(slug);

  return (
    <main className="prose mx-auto p-12 pt-22">
      <div className="">
        {/* Title */}
        <div className="">
          <h1 className="font-bold mb-4">{doc.frontmatter.title || slug}</h1>
        </div>
        {/* Content */}
        <div className="">
          <article dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
        </div>
      </div>
    </main>
  );
}

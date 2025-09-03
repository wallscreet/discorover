import { getAllDocsMeta } from "@/lib/md";
import DocsIndexClient from "./DocsIndexClient";

export default function DocsIndexPage() {
  const docs = getAllDocsMeta();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 mt-12 text-center">Documentation</h1>
      <DocsIndexClient docs={docs} />
    </main>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";

interface DocMeta {
  slug: string;
  title: string;
  description?: string;
}

export default function DocsIndexClient({ docs }: { docs: DocMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = docs.filter(doc =>
    [doc.title, doc.description]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search docs..."
        className="w-full p-2 mb-6 border rounded-lg"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="text-gray-500">No docs match your search.</p>
      )}

      <ul className="space-y-4">
        {filtered.map(doc => (
          <li key={doc.slug} className="p-4 border rounded-xl hover:shadow">
            <Link href={`/docs/${doc.slug}`}>
              <h2 className="text-xl font-semibold">{doc.title}</h2>
              {doc.description && (
                <p className="text-gray-600">{doc.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

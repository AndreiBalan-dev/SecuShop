"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Comment = {
  id: number;
  author: string;
  content: string;
};

export default function XSSProtectedPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    const res = await fetch("http://localhost:4000/api/xss/comments-protected");
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async () => {
    if (!author || !content) return;

    await fetch("http://localhost:4000/api/xss/comment-protected", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content }),
    });

    setAuthor("");
    setContent("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 space-y-10">
        <div className="pt-4">
          <Link href="/xss">
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md transition text-sm">
              ← Înapoi
            </button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-green-600">✅ XSS Protejată</h1>
        <p className="text-sm text-gray-600">
          Comentariile sunt filtrate cu <code>sanitize-html</code> și NU permit
          execuția de cod JS.
        </p>

        <section className="space-y-4 max-w-xl">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Autor
            </span>
            <input
              type="text"
              placeholder="Ex: Ana"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Comentariu
            </span>
            <textarea
              placeholder="Scrie un comentariu..."
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-28"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>

          <button
            onClick={handleSubmit}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Trimite
          </button>
        </section>

        <div className="space-y-4 pt-8">
          <h2 className="text-2xl font-semibold">💬 Comentarii protejate</h2>
          {comments.map((c) => (
            <div
              key={c.id}
              className="border border-green-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-md space-y-2"
            >
              <p className="font-semibold text-green-800">{c.author} a spus:</p>
              <p className="text-sm break-words whitespace-pre-wrap">
                {c.content}
              </p>
            </div>
          ))}
        </div>
        {/* Exemple de atacuri XSS */}
        <section className="bg-red-100 dark:bg-red-900/20 border border-red-400 rounded-md p-6 space-y-3 mt-10">
          <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
            🧨 Exemple de atacuri XSS reale
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Acestea sunt exemple de cod pe care un atacator le poate introduce
            în formularul vulnerabil.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <code>{`<script>alert("Hacked!")</script>`}</code> – Execută un
              mesaj JavaScript.
            </li>
            <li>
              <code>{`<img src="x" onerror="alert('XSS')" />`}</code> –
              Folosește imagine invalidă pentru a rula cod.
            </li>
            <li>
              <code>{`<iframe src="javascript:alert('XSS')"></iframe>`}</code> –
              Creează un iframe malițios.
            </li>
            <li>
              <code>{`<svg onload="alert('XSS')">`}</code> – SVG cu eveniment
              onload care declanșează script.
            </li>
            <li>
              <code>{`<a href="javascript:alert('XSS')">Click aici</a>`}</code>{" "}
              – Link periculos care pare inofensiv.
            </li>
            <li>
              <code>{`<body onload=alert('XSS')>`}</code> – Execută script
              imediat după încărcare.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

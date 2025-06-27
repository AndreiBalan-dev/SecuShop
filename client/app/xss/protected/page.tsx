"use client";
import { useEffect, useState } from "react";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

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
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop
          </h1>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="hover:underline">
              Produse
            </a>
            <a href="#" className="hover:underline">
              Oferte
            </a>
            <a href="#" className="hover:underline">
              Despre noi
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs">0 produse în coș</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Mouse Gamer RGB – Comentarii Protejate XSS
          </h2>
          <p className="text-green-100 text-sm">
            Această pagină filtrează comentariile pentru a preveni atacurile.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 text-gray-700 text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 flex gap-2">
          <a href="#" className="hover:underline">
            Acasă
          </a>
          <span>/</span>
          <a href="#" className="hover:underline">
            Electronice
          </a>
          <span>/</span>
          <span className="text-gray-500">Mouse Gamer RGB</span>
        </div>
      </div>

      <main className="bg-gray-50 text-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Categorii populare</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Electronice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gaming
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Îmbrăcăminte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Accesorii
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Promoții speciale</h3>
              <p className="text-sm">
                🎁 Transport gratuit la comenzile peste 200 RON!
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Avertisment */}
            <section className="bg-green-50 border border-green-300 text-green-800 p-4 rounded flex items-center gap-3">
              <span className="font-bold text-lg">✅ Protecție activă</span>
              <p className="text-sm">
                Comentariile sunt filtrate cu <code>sanitize-html</code>.
              </p>
            </section>

            {/* Produs */}
            <section className="bg-white border border-neutral-200 rounded shadow p-6 flex flex-col sm:flex-row gap-6">
              <img
                src="/sample-product.jpg"
                alt="Mouse Gamer RGB"
                className="w-full sm:w-56 rounded"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  Mouse Gamer RGB
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                    Bestseller
                  </span>
                </h2>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500">(124 recenzii)</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Mouse performant cu iluminare RGB și DPI ajustabil.
                </p>
                <p className="text-lg font-bold">149 RON</p>
                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow">
                  <ShoppingCartIcon className="h-5 w-5 inline mr-1" />
                  Adaugă în coș
                </button>
              </div>
            </section>

            {/* Formular comentarii */}
            <section className="bg-white border border-neutral-200 rounded shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                Scrie o recenzie (XSS Protejat)
              </h3>
              <label className="block">
                <span className="text-sm font-medium">Autor</span>
                <input
                  type="text"
                  placeholder="Ex: Ana"
                  className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Comentariu</span>
                <textarea
                  placeholder="Scrie un comentariu..."
                  className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
              >
                Trimite recenzia
              </button>
            </section>

            {/* Comentarii */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-green-700">
                Recenzii recente
              </h3>
              {comments.length === 0 ? (
                <p className="italic text-gray-500">Nicio recenzie momentan.</p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white border border-neutral-200 p-4 rounded shadow space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold uppercase">
                        {c.author[0]}
                      </div>
                      <p className="font-semibold">{c.author}</p>
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                      {c.content}
                    </p>
                  </div>
                ))
              )}
            </section>

            {/* Exemplu atacuri */}
            <section className="bg-red-100 border border-red-400 p-6 rounded space-y-3">
              <h4 className="text-lg font-semibold text-red-700">
                🧨 Exemple de atacuri XSS
              </h4>
              <p className="text-sm text-gray-700">
                Aceste atacuri NU mai funcționează în această variantă:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <code>{`<script>alert("XSS")</script>`}</code>
                </li>
                <li>
                  <code>{`<img src="x" onerror="alert('XSS')">`}</code>
                </li>
                <li>
                  <code>{`<a href="javascript:alert('XSS')">Click aici</a>`}</code>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă XSS Protejat
      </footer>
    </>
  );
}

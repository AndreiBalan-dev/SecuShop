"use client";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function OpenRedirectVulnerable() {
  const [redirectUrl, setRedirectUrl] = useState("http://localhost:3000");

  return (
    <>
      {/* Navbar */}
      <header className="bg-red-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop Checkout
          </h1>
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs">1 produs în coș</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Atenție: Redirect Vulnerabil
          </h2>
          <p className="text-red-100">
            Această pagină redirecționează utilizatorii către orice URL primit
            prin parametru.
          </p>
        </div>
      </section>

      <main className="bg-gray-50 text-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block space-y-6">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Comandă</h3>
              <ul className="space-y-2 text-sm">
                <li>• Coșul tău</li>
                <li>• Adresă livrare</li>
                <li>• Plata</li>
                <li className="font-semibold text-red-600">
                  • Autentificare (Vulnerabil)
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Login Form */}
            <section className="bg-white border border-neutral-200 rounded shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                🔓 Conectare cont (Vulnerabil)
              </h2>
              <p className="text-sm text-neutral-600">
                După autentificare, vei fi redirecționat către URL-ul
                specificat. Un atacator poate modifica acest URL pentru a te
                trimite către un site malițios.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-neutral-300 bg-white text-black px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="password"
                  placeholder="Parolă"
                  className="border border-neutral-300 bg-white text-black px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mt-4">
                  URL redirecționare după login
                </label>
                <input
                  type="text"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  className="w-full border border-neutral-300 bg-white text-black px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-neutral-500">
                  Exemplu periculos:{" "}
                  <code className="text-red-600">http://malicious.com</code>
                </p>
              </div>
              <button
                onClick={() => {
                  window.location.href = `http://localhost:4000/api/redirect/vulnerable?next=${encodeURIComponent(
                    redirectUrl
                  )}`;
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium shadow mt-4"
              >
                🚨 Execută Redirect Vulnerabil
              </button>
            </section>

            {/* Code Example */}
            <section className="bg-red-50 border border-red-300 p-5 rounded text-sm space-y-3">
              <p>🔓 Cod backend care permite redirect fără validare:</p>
              <pre className="bg-white p-4 rounded text-xs font-mono overflow-auto border border-neutral-200">
                {`app.get("/api/redirect/vulnerable", (req, res) => {
  const next = req.query.next;
  res.redirect(next); // ⚠️ Fără validare → risc de phishing!
});`}
              </pre>
              <p>
                Exemplu URL:
                <br />
                <code className="text-red-600">
                  /api/redirect/vulnerable?next=http://malicious.com
                </code>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă Open Redirect Vulnerabil
      </footer>
    </>
  );
}

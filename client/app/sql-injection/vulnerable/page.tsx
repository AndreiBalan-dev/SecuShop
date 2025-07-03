"use client";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type Product = { id: number; name: string; price: number };

const examplePayloads = [
  "' OR 1=1 --",
  "' UNION SELECT id, email, password FROM User --",
  "' UNION SELECT null, sqlite_version(), null --",
];

export default function SQLInjectionVulnerable() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [warning, setWarning] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");

  const suspiciousInput = /('|--|;|=|select|where|or|and|union)/i;

  const handleChange = (value: string) => {
    setTerm(value);
    setWarning(
      suspiciousInput.test(value)
        ? "⚠️ Posibilă tentativă de SQL Injection detectată!"
        : ""
    );
  };

  const handleSearch = async () => {
    const res = await fetch(
      `http://localhost:4000/api/products/search-vuln?term=${encodeURIComponent(
        term
      )}`
    );
    const data = await res.json();
    setResults(Array.isArray(data) ? data : []);
    setExecutedQuery(
      `SELECT id, name, price FROM Product WHERE name LIKE '%${term}%'`
    );
  };

  return (
    <>
      {/* Navbar */}
      <header className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop
          </h1>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#" className="hover:underline">
              Produse
            </a>
            <a href="#" className="hover:underline">
              Oferte
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
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Cumpără Inteligent. Cumpără Rapid.
          </h2>
          <p className="text-blue-100">
            Găsește cele mai bune produse la prețuri avantajoase.
          </p>
        </div>
      </section>

      <main className="bg-gray-50 text-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Categorii</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Electronice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Haine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cărți
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Jucării
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Cele mai vândute</h3>
              <ul className="space-y-2 text-sm">
                <li>• Căști Wireless</li>
                <li>• Hanorac SecuShop</li>
                <li>• Joc de societate</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Alert */}
            <section className="bg-red-50 border border-red-300 text-red-800 p-4 rounded flex items-center gap-3">
              <span className="font-bold text-lg">
                ⚠️ Vulnerabilitate activă!
              </span>
              <p className="text-sm">
                Această căutare folosește query-uri nesecurizate.
              </p>
            </section>

            {/* Search */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Caută produse</h2>
              <div className="flex gap-2 flex-wrap mb-3">
                {examplePayloads.map((payload) => (
                  <button
                    key={payload}
                    onClick={() => handleChange(payload)}
                    className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    {payload}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Ex: ' UNION SELECT..."
                  className="flex-1 border border-neutral-300 bg-white text-black px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium shadow"
                >
                  Caută
                </button>
              </div>
              {warning && (
                <p className="text-yellow-600 text-sm mt-1">{warning}</p>
              )}
            </section>

            {/* Results */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Rezultate produse</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.length === 0 ? (
                  <div className="col-span-full text-neutral-500 italic">
                    Niciun rezultat găsit.
                  </div>
                ) : (
                  results.map((p) => (
                    <div
                      key={p.id}
                      className="border border-neutral-200 bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                    >
                      <img
                        src="https://i.imgur.com/kcjqKCC.png"
                        alt={p.name}
                        className="h-48 w-full object-contain bg-neutral-100 rounded mb-3"
                      />
                      <div className="font-semibold text-base mb-1">
                        {p.name}
                      </div>
                      <div className="text-sm text-neutral-500 mb-4">
                        {p.price} RON
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded font-medium mt-auto">
                        🛒 Adaugă în coș
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Executed Query */}
            {executedQuery && (
              <section className="bg-white border border-red-300 p-4 rounded text-sm text-neutral-700 shadow">
                <p className="font-mono break-words">
                  <span className="text-red-600 font-semibold">
                    Interogare executată:
                  </span>{" "}
                  {executedQuery}
                </p>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Simulare educațională eCommerce
      </footer>
    </>
  );
}

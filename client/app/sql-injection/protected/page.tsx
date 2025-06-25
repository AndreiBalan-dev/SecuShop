"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

type Product = { id: number; name: string; price: number };

export default function SQLInjectionProtected() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [warning, setWarning] = useState("");

  const suspiciousInput = /('|--|;|=|select|where|or|and)/i;

  const handleChange = (value: string) => {
    setTerm(value);
    setWarning(
      suspiciousInput.test(value)
        ? "⚠️ Posibilă tentativă de SQL injection detectată!"
        : ""
    );
  };

  const handleSearch = async () => {
    const res = await fetch(
      `http://localhost:4000/api/products/search-safe?term=${term}`
    );
    const data = await res.json();
    setResults(Array.isArray(data) ? data : []);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 space-y-10">
        <h1 className="text-4xl font-bold text-green-600">✅ SQL Injection Protejat</h1>

        <p className="text-gray-600 text-sm">
          În acest demo, inputul este introdus într-o <strong>interogare parametrizată</strong>.
          Acest lucru previne injectarea codului SQL malițios.
        </p>

        <input
          type="text"
          value={term}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Ex: ' OR 1=1 --"
          className="border border-gray-400 px-4 py-2 rounded w-full max-w-lg bg-white dark:bg-gray-800"
        />

        {warning && (
          <p className="text-yellow-500 font-medium">{warning}</p>
        )}

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
        >
          Rulează interogare PROTEJATĂ
        </button>

        <section className="pt-10">
          <h2 className="text-xl text-green-600 font-semibold mb-2">Rezultate</h2>
          <ul className="space-y-2 text-sm">
            {results.length === 0 ? (
              <li className="text-gray-400 italic">Niciun rezultat.</li>
            ) : (
              results.map((p) => (
                <li
                  key={p.id}
                  className="border border-green-200 px-4 py-2 rounded"
                >
                  {p.name} – {p.price} RON
                </li>
              ))
            )}
          </ul>
        </section>

        <div className="pt-10">
          <a
            href="/sql-injection"
            className="text-sm text-green-600 hover:underline"
          >
            ← Înapoi la pagina SQL Injection
          </a>
        </div>
      </main>
    </>
  );
}

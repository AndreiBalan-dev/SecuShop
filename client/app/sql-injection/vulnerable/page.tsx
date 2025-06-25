"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

type Product = { id: number; name: string; price: number };

export default function SQLInjectionVulnerable() {
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
      `http://localhost:4000/api/products/search-vuln?term=${term}`
    );
    const data = await res.json();
    setResults(Array.isArray(data) ? data : []);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 space-y-10">
        <h1 className="text-4xl font-bold text-red-600">⚠️ SQL Injection Vulnerabil</h1>

        <p className="text-gray-600 text-sm">
          În acest demo, inputul este introdus direct în interogarea SQL — poți
          exploata aplicația tastând un payload ca <code>' OR 1=1 --</code>.
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
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 mt-4"
        >
          Rulează interogare VULNERABILĂ
        </button>

        <section className="pt-10">
          <h2 className="text-xl text-red-600 font-semibold mb-2">Rezultate</h2>
          <ul className="space-y-2 text-sm">
            {results.length === 0 ? (
              <li className="text-gray-400 italic">Niciun rezultat.</li>
            ) : (
              results.map((p) => (
                <li
                  key={p.id}
                  className="border border-red-200 px-4 py-2 rounded"
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
            className="text-sm text-red-600 hover:underline"
          >
            ← Înapoi la pagina SQL Injection
          </a>
        </div>
      </main>
    </>
  );
}

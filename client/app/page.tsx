"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const [term, setTerm] = useState("");
  const [vulnResults, setVulnResults] = useState<Product[]>([]);
  const [safeResults, setSafeResults] = useState<Product[]>([]);
  const [warning, setWarning] = useState("");

  const suspiciousInput = /('|--|;|=|select|where|or|and)/i;

  const handleChange = (value: string) => {
    setTerm(value);
    if (suspiciousInput.test(value)) {
      setWarning("⚠️ Posibila tentativa de SQL injection!");
    } else {
      setWarning("");
    }
  };

  const handleSearch = async (type: "vuln" | "safe") => {
    const res = await fetch(`http://localhost:4000/api/products/search-${type}?term=${term}`);
    const data = await res.json();
    type === "vuln" ? setVulnResults(data) : setSafeResults(data);
  };

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Demo: SQL Injection (Vulnerabil vs Protejat)</h1>

      <input
        type="text"
        value={term}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Ex: ' OR 1=1; --"
        className="border border-gray-400 px-4 py-2 rounded w-full max-w-md"
      />

      {warning && (
        <div className="text-yellow-600 mt-1 font-medium">{warning}</div>
      )}

      <div className="space-x-4">
        <button
          onClick={() => handleSearch("vuln")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cauta (Vulnerabil)
        </button>
        <button
          onClick={() => handleSearch("safe")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Cauta (Protejat)
        </button>
      </div>

      <section>
        <h2 className="text-xl mt-4 text-red-600 font-semibold">Rezultate Vulnerabil</h2>
        <ul className="mt-2 list-disc list-inside">
          {vulnResults.map((p) => (
            <li key={p.id}>
              {p.name} – {p.price} RON
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl mt-4 text-green-600 font-semibold">Rezultate Protejat</h2>
        <ul className="mt-2 list-disc list-inside">
          {safeResults.map((p) => (
            <li key={p.id}>
              {p.name} – {p.price} RON
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Product = { id: number; name: string; price: number };

export default function SQLInjection() {
  const [term, setTerm] = useState("");
  const [vulnResults, setVulnResults] = useState<Product[]>([]);
  const [safeResults, setSafeResults] = useState<Product[]>([]);
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

  const handleSearch = async (type: "vuln" | "safe") => {
    const res = await fetch(
      `http://localhost:4000/api/products/search-${type}?term=${term}`
    );
    const data = await res.json();

    if (!Array.isArray(data)) {
      setWarning("⚠️ Răspuns invalid de la server.");
      return;
    }

    type === "vuln" ? setVulnResults(data) : setSafeResults(data);
  };

  const vulnerableCode = `
const rawQuery = \`SELECT id, name, price FROM Product WHERE name LIKE '%\${term}%'\`;
await prisma.$queryRawUnsafe(rawQuery);
`;

  const safeCode = `
await prisma.$queryRaw(
  Prisma.sql\`SELECT id, name, price FROM Product WHERE name LIKE \${'%' + term + '%'}\`
);
`;

  return (
    <>
      <Navbar />
      <main className="p-8 max-w-6xl mx-auto space-y-12 text-gray-800 dark:text-gray-200">
        {/* Teorie */}
        <section className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg shadow">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            💉 SQL Injection
          </h1>
          <p className="text-lg leading-relaxed">
            SQL Injection este o vulnerabilitate critică ce apare atunci când
            inputul utilizatorului este introdus direct într-o interogare SQL
            fără a fi validat.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            În această pagină poți testa două metode diferite: una vulnerabilă
            și una sigură (protejată).
          </p>
        </section>

        {/* Input + Warning + Butoane */}
        <section className="text-center space-y-4">
          <input
            type="text"
            value={term}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Ex: ' OR 1=1 --"
            className="border border-gray-400 px-4 py-2 rounded w-full max-w-lg bg-white dark:bg-gray-800"
          />
          {warning && <p className="text-yellow-500 font-medium">{warning}</p>}
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => handleSearch("vuln")}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Rulează interogare VULNERABILĂ
            </button>
            <button
              onClick={() => handleSearch("safe")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Rulează interogare PROTEJATĂ
            </button>
          </div>
        </section>

        {/* Rezultate */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
          <div>
            <h2 className="text-xl text-red-600 font-semibold mb-2">
              Rezultate (Vulnerabil)
            </h2>
            <ul className="space-y-2 text-sm">
              {vulnResults.length === 0 ? (
                <li className="text-gray-400 italic">Niciun rezultat.</li>
              ) : (
                vulnResults.map((p) => (
                  <li
                    key={p.id}
                    className="border border-red-200 px-4 py-2 rounded"
                  >
                    {p.name} – {p.price} RON
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-green-600 font-semibold mb-2">
              Rezultate (Protejat)
            </h2>
            <ul className="space-y-2 text-sm">
              {safeResults.length === 0 ? (
                <li className="text-gray-400 italic">Niciun rezultat.</li>
              ) : (
                safeResults.map((p) => (
                  <li
                    key={p.id}
                    className="border border-green-200 px-4 py-2 rounded"
                  >
                    {p.name} – {p.price} RON
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* Exemple de input periculos */}
        <section className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border-l-4 border-red-500">
          <h2 className="text-2xl font-semibold mb-4">
            🧪 Exemple de input periculos
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300 text-sm md:text-base text-left">
            <li>
              <code>' OR 1=1 --</code>{" "}
              <span className="text-xs text-gray-500">
                (Afișează toate produsele)
              </span>
            </li>
            <li>
              <code>' UNION SELECT id, email, password FROM User --</code>{" "}
              <span className="text-xs text-gray-500">(Furt de conturi)</span>
            </li>
            <li>
              <code>' UNION SELECT null, sqlite_version(), null --</code>{" "}
              <span className="text-xs text-gray-500">
                (Versiune server SQL)
              </span>
            </li>
            <li>
              <code>a%' UNION SELECT 999, email, password FROM User --</code>{" "}
              <span className="text-xs text-gray-500">
                (Returnează conturi de utilizator)
              </span>
            </li>
          </ul>
        </section>

        {/* Cod Comparativ */}
        <section className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow space-y-6">
          <h2 className="text-2xl font-bold mb-4">🔍 Cod comparativ</h2>

          {/* Cod vulnerabil */}
          <div>
            <h3 className="font-semibold text-red-600 mb-2">
              ❌ Cod vulnerabil
            </h3>
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              wrapLongLines
            >
              {vulnerableCode}
            </SyntaxHighlighter>
            <p className="mt-2 text-sm text-red-500 dark:text-red-300">
              Acest cod concatenează direct inputul utilizatorului în
              interogarea SQL. Dacă cineva introduce{" "}
              <code className=" dark:bg-gray-700">' OR 1=1 --</code>, va forța
              interogarea să returneze toate produsele.<br></br>
              <strong>Prisma.$queryRawUnsafe</strong> nu validează inputul și
              permite execuția oricărui cod SQL, inclusiv comenzi periculoase.
            </p>
          </div>

          {/* Cod protejat */}
          <div>
            <h3 className="font-semibold text-green-600 mb-2">
              ✅ Cod protejat
            </h3>
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              wrapLongLines
            >
              {safeCode}
            </SyntaxHighlighter>
            <p className="mt-2 text-sm text-green-600 dark:text-green-300">
              Aici folosim <strong>interogare parametrizată</strong> cu{" "}
              <code>Prisma.sql</code>. <br></br> Inputul nu mai este interpretat
              ca parte din cod SQL, ci este tratat ca valoare de căutare.
              Astfel, atacuri ca{" "}
              <code className="dark:bg-gray-700">' OR 1=1 --</code> nu
              funcționează, pentru că inputul e izolat și sigur.
            </p>
          </div>
        </section>

        {/* Educație */}
        <section className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-6 rounded-lg shadow space-y-3">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300">
            🛡️ Cum te protejezi?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200 text-sm md:text-base">
            <li>
              🚫 Nu folosi <strong>concatenare de stringuri</strong> pentru a
              construi interogări SQL.
            </li>
            <li>
              ✅ Folosește <strong>interogări parametrizate</strong> sau ORM-uri
              ca <code>Prisma.sql</code>.
            </li>
            <li>✅ Validează inputul și pe frontend și pe backend.</li>
            <li>
              ✅ Fii atent la termeni suspecti ca <code>'</code>,{" "}
              <code>--</code>, <code>OR 1=1</code>, <code>UNION</code>.
            </li>
            <li>✅ Loghează și alertează când apar astfel de încercări.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

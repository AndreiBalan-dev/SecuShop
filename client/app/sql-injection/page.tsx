"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function SQLLandingPage() {
  const router = useRouter();

  const vulnerableCode = `
const rawQuery = \`SELECT id, name, price FROM Product WHERE name LIKE '%\${term}%'\`;
await prisma.$queryRawUnsafe(rawQuery);
  `;

  const protectedCode = `
await prisma.$queryRaw(
  Prisma.sql\`SELECT id, name, price FROM Product WHERE name LIKE \${'%' + term + '%'}\`
);
  `;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-red-600">💉 SQL Injection</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Vulnerabilitatea SQL Injection apare când inputul este inserat direct
            în interogări SQL fără validare. Vezi exemple reale și cum să previi.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/sql-injection/vulnerable")}
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 border border-red-400 text-red-600 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ⚠️ Varianta Vulnerabilă
            <p className="text-sm font-normal mt-1">
              Inputul utilizatorului este inserat direct în query. Poți vedea cum se exploatează.
            </p>
          </button>

          <button
            onClick={() => router.push("/sql-injection/protected")}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 border border-green-400 text-green-600 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ✅ Varianta Protejată
            <p className="text-sm font-normal mt-1">
              Folosește interogări parametrizate pentru a preveni injectarea codului.
            </p>
          </button>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-red-600">
            🧠 Cum funcționează SQL Injection?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>✅ Atacatorul trimite input malițios în formularul de căutare.</li>
            <li>❌ Serverul inserează direct acest input în query-ul SQL.</li>
            <li>🔥 Codul SQL este interpretat greșit și returnează date nedorite.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-red-600">🧪 Cod Comparativ</h2>

          <div>
            <h3 className="font-semibold text-red-600 mb-2">❌ Cod vulnerabil</h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {vulnerableCode}
            </SyntaxHighlighter>
          </div>

          <div>
            <h3 className="font-semibold text-green-600 mb-2">✅ Cod protejat</h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {protectedCode}
            </SyntaxHighlighter>
          </div>
        </section>
      </main>
    </>
  );
}

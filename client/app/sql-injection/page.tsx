"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

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
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 text-neutral-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-red-500">
            💉 SQL Injection
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 max-w-3xl mx-auto">
            SQL Injection apare când datele introduse de utilizator ajung direct
            în interogări SQL, permițând atacatorului să execute comenzi
            arbitrare în baza de date.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/sql-injection/vulnerable")}
            className="flex flex-col items-start bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Varianta vulnerabilă
            </span>
            <p className="text-sm mt-1">
              Inputul este inserat direct în query. Poți testa exploatarea.
            </p>
          </button>

          <button
            onClick={() => router.push("/sql-injection/protected")}
            className="flex flex-col items-start bg-green-600/10 hover:bg-green-600/20 border border-green-600 text-green-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="h-6 w-6" />
              Varianta protejată
            </span>
            <p className="text-sm mt-1">
              Interogare parametrizată care previne injectarea.
            </p>
          </button>
        </section>

        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-red-400">
            🧠 Cum funcționează SQL Injection?
          </h2>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 space-y-2">
            <ul className="list-disc pl-6 text-sm space-y-2 text-neutral-300">
              <li>
                Atacatorul introduce text malițios în formularul de căutare.
              </li>
              <li>Serverul inserează direct acest text în query-ul SQL.</li>
              <li>
                Baza de date interpretează comanda, permițând vizualizarea sau
                modificarea datelor.
              </li>
            </ul>
          </div>
        </section>

        {/* Visual Flow */}
        <section className="bg-neutral-800/50 border border-yellow-600 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-yellow-400">
            📊 Fluxul unui atac SQL Injection
          </h2>
          <p className="text-sm text-neutral-400">
            Diagrama de mai jos arată cum inputul nefiltrat compromite baza de
            date:
          </p>
          <div className="w-full border border-dashed border-neutral-600 rounded bg-neutral-900 h-64 flex items-center justify-center text-neutral-600">
            🖼️ [Aici inserezi o diagramă vizuală cu fluxul SQL Injection]
          </div>
        </section>

        {/* Code comparison */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            🧪 Cod Comparativ
          </h2>

          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-red-300 text-lg font-semibold">
              <BugAntIcon className="h-5 w-5" />
              Cod vulnerabil
            </h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {vulnerableCode}
            </SyntaxHighlighter>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-green-300 text-lg font-semibold">
              <ShieldCheckIcon className="h-5 w-5" />
              Cod protejat
            </h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {protectedCode}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* Consequences */}
        <section className="bg-red-600/10 border border-red-600 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-bold text-red-300 flex items-center gap-2">
            ⚠️ Ce poate face un atac SQL Injection?
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-neutral-300 text-sm">
            <li>Extrage date sensibile din tabele.</li>
            <li>Șterge sau modifică date.</li>
            <li>Execută comenzi administrative în DB.</li>
            <li>Escaladează privilegiile aplicației.</li>
          </ul>
        </section>

        {/* Protection Tips */}
        <section className="bg-green-600/10 border border-green-600 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-bold text-green-300 flex items-center gap-2">
            ✅ Cum previi atacurile?
          </h3>
          <ul className="list-disc pl-6 text-neutral-300 space-y-1 text-sm">
            <li>
              Folosește <code>$queryRaw</code> cu parametri, nu{" "}
              <code>$queryRawUnsafe</code>.
            </li>
            <li>Escapează inputul utilizatorului.</li>
            <li>Limitează permisiunile DB (least privilege).</li>
            <li>Activează logging și monitorizare.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function XSSLandingPage() {
  const router = useRouter();

  const unsafeCode = `<div dangerouslySetInnerHTML={{ __html: userComment }} />`;

  const safeCode = `import sanitizeHtml from "sanitize-html";

const clean = sanitizeHtml(userComment);
<div>{clean}</div>`;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 text-neutral-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-yellow-400">
            🧨 XSS (Cross-Site Scripting)
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 max-w-3xl mx-auto">
            XSS este o vulnerabilitate critică ce permite rularea de cod
            JavaScript injectat de atacatori în paginile web vizitate de alți
            utilizatori. În continuare, vei vedea cum funcționează și cum o poți
            preveni.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/xss/vulnerable")}
            className="flex flex-col items-start bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Varianta vulnerabilă
            </span>
            <p className="text-sm text-start mt-1">
              Codul NU filtrează inputul. Comentariile sunt inserate direct în
              DOM.
            </p>
          </button>

          <button
            onClick={() => router.push("/xss/protected")}
            className="flex flex-col items-start bg-green-600/10 hover:bg-green-600/20 border border-green-600 text-green-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="h-6 w-6" />
              Varianta protejată
            </span>
            <p className="text-sm mt-1">
              Codul curăță datele cu <code>sanitize-html</code> pentru a preveni
              XSS.
            </p>
          </button>
        </section>

        {/* Explanation */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-yellow-400">
              🔍 Cum apare vulnerabilitatea?
            </h2>
            <p className="text-neutral-400">
              Când inputul utilizatorului este inserat în DOM fără nicio
              filtrare, orice tag HTML sau script este executat în browser:
            </p>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {unsafeCode}
            </SyntaxHighlighter>
            <p className="text-neutral-400">
              Orice comentariu care conține <code>{"<script>"}</code> va rula
              automat în browserul altor vizitatori.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-green-400">
              🛡️ Cum prevenim atacul?
            </h2>
            <p className="text-neutral-400">
              Soluția corectă: <b>filtrarea inputului</b> înainte de afișare.
              Exemplu de cod sigur:
            </p>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {safeCode}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* Danger Explanation */}
        <section className="bg-red-600/10 border border-red-600 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-bold text-red-300 flex items-center gap-2">
            🚨 Ce se poate întâmpla în realitate?
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-neutral-300 text-sm">
            <li>
              Furt de <strong>cookie-uri</strong> și compromiterea contului.
            </li>
            <li>Injectarea de formulare de phishing.</li>
            <li>Linkuri către site-uri malițioase.</li>
            <li>Keyloggere care colectează datele tastate.</li>
          </ul>
          {/* <p className="text-neutral-400 text-sm">
            În timpul demonstrației practice, vei vedea exact cum aceste
            scenarii pot fi reproduse.
          </p> */}
        </section>

        {/* Educational Summary */}
        <section className="bg-green-600/10 border border-green-600 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-bold text-green-300 flex items-center gap-2">
            ✅ Cum te protejezi?
          </h3>
          <ul className="list-disc pl-6 text-neutral-300 space-y-1 text-sm">
            <li>Escapează orice input provenit de la utilizatori.</li>
            <li>
              Folosește librării precum <code>sanitize-html</code>.
            </li>
            <li>
              Evită <code>dangerouslySetInnerHTML</code> pe cât posibil.
            </li>
            <li>Activează Content Security Policy (CSP).</li>
          </ul>
          {/* <p className="text-neutral-400 text-sm italic">
            Vom discuta aceste măsuri pe larg în prezentare.
          </p> */}
        </section>
      </main>
    </>
  );
}

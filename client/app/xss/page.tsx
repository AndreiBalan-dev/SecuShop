"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function XSSLandingPage() {
  const router = useRouter();

  const unsafeCode = `<div dangerouslySetInnerHTML={{ __html: userComment }} />`;

  const safeCode = `import sanitizeHtml from "sanitize-html";

const clean = sanitizeHtml(userComment);
<div>{clean}</div>`;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 space-y-16">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-yellow-500">
            🧨 XSS (Cross-Site Scripting)
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            XSS este o vulnerabilitate care permite rularea de cod JavaScript
            injectat de atacatori în paginile web vizitate de alți utilizatori.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/xss/vulnerable")}
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 border border-red-400 text-red-500 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ⚠️ Varianta Vulnerabilă
            <p className="text-sm font-normal mt-1">
              Codul NU filtrează inputul. Comentariile se afișează direct cu
              <code> dangerouslySetInnerHTML </code>.
            </p>
          </button>

          <button
            onClick={() => router.push("/xss/protected")}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 border border-green-400 text-green-500 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ✅ Varianta Protejată
            <p className="text-sm font-normal mt-1">
              Codul folosește <code>sanitize-html</code> pentru a curăța
              conținutul și a preveni atacurile XSS.
            </p>
          </button>
        </section>

        {/* Explanation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            🔍 Cum funcționează vulnerabilitatea?
          </h2>
          <p>
            Atunci când inputul utilizatorului este inserat direct în DOM fără
            filtrare, orice tag HTML (inclusiv <code>{"<script>"}</code>) va fi
            executat în browser. În React, asta se face prin:
          </p>
          <SyntaxHighlighter language="tsx" style={oneDark}>
            {unsafeCode}
          </SyntaxHighlighter>
          <p>
            Pentru a preveni acest lucru, trebuie să <strong>filtrăm</strong>{" "}
            inputul înainte de a-l afișa. Exemplu de cod protejat:
          </p>
          <SyntaxHighlighter language="tsx" style={oneDark}>
            {safeCode}
          </SyntaxHighlighter>
        </section>

        {/* Final XSS danger explanation */}
        <section className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md text-sm space-y-2">
          <h3 className="text-red-700 dark:text-red-300 font-semibold text-base">
            🧨 Ce se poate întâmpla în realitate?
          </h3>
          <p className="text-black dark:text-red-100">
            Atacurile XSS pot părea nevinovate, dar în practică pot compromite
            complet conturile utilizatorilor. De exemplu:
          </p>
          <ul className="list-disc pl-5 text-black dark:text-red-100 space-y-1">
            <li>
              Un atacator poate fura{" "}
              <strong>cookie-urile de autentificare</strong> și să se conecteze
              ca alt utilizator.
            </li>
            <li>
              Poate injecta formulare false sau linkuri către site-uri
              malițioase.
            </li>
            <li>
              Poate crea un keylogger care trimite fiecare tastă apăsată către
              serverul atacatorului.
            </li>
          </ul>
          <p className="text-black dark:text-red-100">
            Prin această demonstrație vei înțelege diferența dintre o
            implementare corectă și una periculoasă. Experimentează, observă și
            protejează!
          </p>
        </section>
      </main>
    </>
  );
}

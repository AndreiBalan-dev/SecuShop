"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function OpenRedirectPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 text-neutral-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-blue-400">
            🔁 Open Redirect
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 max-w-3xl mx-auto">
            Open Redirect apare când aplicația permite redirecționarea
            utilizatorilor către linkuri externe fără validare. Este o
            vulnerabilitate folosită des în phishing și furt de credențiale.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/open-redirect/vulnerable")}
            className="flex flex-col items-start bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Varianta vulnerabilă
            </span>
            <p className="text-sm text-start mt-1">
              Exemplu unde orice URL este acceptat și redirecționarea se face
              fără restricții.
            </p>
          </button>

          <button
            onClick={() => router.push("/open-redirect/protected")}
            className="flex flex-col items-start bg-green-600/10 hover:bg-green-600/20 border border-green-600 text-green-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="h-6 w-6" />
              Varianta protejată
            </span>
            <p className="text-sm mt-1">
              Exemplu cu verificare strictă a destinației și redirect controlat.
            </p>
          </button>
        </section>

        {/* What is Open Redirect */}
        <section className="bg-neutral-800/50 border border-blue-600 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-blue-300">
            🔍 Ce este Open Redirect?
          </h2>
          <p className="text-sm text-neutral-300">
            Este atunci când aplicația primește un parametru <code>?next=</code>{" "}
            sau similar și îl folosește pentru a redirecționa utilizatorul fără
            validare.
          </p>
          <div className="bg-neutral-900 border border-neutral-700 rounded p-4 text-xs font-mono overflow-auto">
            https://exemplu.com/redirect?next=http://malicious-site.com
          </div>
          <p className="text-sm text-neutral-400">
            Utilizatorii pot fi păcăliți să creadă că fac click pe un link
            legitim, dar de fapt ajung pe un site fals.
          </p>
        </section>

        {/* Example of phishing */}
        <section className="bg-yellow-600/10 border border-yellow-600 rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
            🎣 Exemplu real de phishing
          </h2>
          <p className="text-sm text-neutral-300">
            Un atacator poate trimite un link cu redirect către un site
            malițios:
          </p>
          <div className="bg-neutral-900 border border-neutral-700 rounded p-4 text-xs font-mono overflow-auto">
            https://banca.ro/redirect?next=http://fake-login.com
          </div>
          <p className="text-sm text-neutral-400">
            După click, utilizatorul ajunge pe un formular de login fals unde
            datele lui sunt furate.
          </p>
        </section>

        {/* Visual Flow */}
        <section className="bg-neutral-800/50 border border-yellow-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-yellow-400">
            📊 Fluxul unui atac Open Redirect
          </h2>
          <div className="w-full border border-dashed border-neutral-600 rounded bg-neutral-900 h-64 flex items-center justify-center text-neutral-600">
            🖼️ [Aici inserezi o diagramă vizuală a fluxului Open Redirect]
          </div>
        </section>

        {/* Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-300">
            🧠 Vulnerabil vs Protejat
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-600/10 border border-red-600 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 text-red-300 font-semibold text-lg">
                <ExclamationTriangleIcon className="h-5 w-5" />
                Varianta vulnerabilă
              </h3>
              <p className="text-sm text-neutral-300">
                Orice URL din parametru este acceptat. Nu există validare.
              </p>
            </div>
            <div className="bg-green-600/10 border border-green-600 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 text-green-300 font-semibold text-lg">
                <ShieldCheckIcon className="h-5 w-5" />
                Varianta protejată
              </h3>
              <p className="text-sm text-neutral-300">
                Doar linkuri whitelisted sau căi interne sunt permise.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-green-600/10 border border-green-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-green-300">
            ✅ Cum previi Open Redirect?
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2 text-neutral-300">
            <li>
              Validează parametrii cu <code>new URL()</code> și verifică
              domeniul.
            </li>
            <li>
              Permite doar redirecturi interne (<code>/dashboard</code>,{" "}
              <code>/home</code>).
            </li>
            <li>
              Dacă redirect extern este necesar, afișează o pagină de
              confirmare.
            </li>
            <li>Nu presupune că parametrii URL sunt siguri.</li>
          </ul>
        </section>

        {/* Recap */}
        <section className="bg-gradient-to-r from-blue-800/30 to-green-800/30 border border-blue-600/30 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-bold text-blue-300">🔐 Recapitulare</h2>
          <p className="text-sm text-neutral-300">
            Open Redirect este simplu de exploatat și greu de detectat de
            utilizatori. Fii proactiv: validează, limitează și educă.
          </p>
        </section>
      </main>
    </>
  );
}

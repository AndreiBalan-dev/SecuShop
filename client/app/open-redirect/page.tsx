"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function OpenRedirectPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 space-y-14">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-green-600">
            🔁 Open Redirect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Open Redirect permite unui atacator să redirecționeze utilizatorii
            către site-uri externe, uneori malitioase, prin exploatarea unor
            linkuri aparent inofensive.
          </p>
        </section>

        {/* Redirect Options */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/open-redirect/vulnerable")}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 border border-green-400 text-green-600 font-semibold px-6 py-4 rounded-xl shadow-md transition"
          >
            ⚠️ Vezi varianta vulnerabilă
          </button>
          <button
            onClick={() => router.push("/open-redirect/protected")}
            className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 border border-blue-400 text-blue-600 font-semibold px-6 py-4 rounded-xl shadow-md transition"
          >
            ✅ Vezi varianta protejată
          </button>
        </section>

        {/* Ce este Open Redirect */}
        <section className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-5 rounded shadow space-y-3 text-sm">
          <h2 className="text-lg font-semibold text-green-700 dark:text-green-200">
            🔎 Ce este Open Redirect?
          </h2>
          <p>
            Este o vulnerabilitate care apare când o aplicație permite
            redirecționarea către orice URL extern fără verificare. De obicei
            exploatată prin URL-uri precum:
          </p>
          <div className="bg-white dark:bg-green-950 border border-green-300 dark:border-green-800 rounded p-4 text-xs font-mono overflow-auto">
            http://securizat.ro/redirect?next=http://malicious.com
          </div>
          <p>
            Un atacator poate păcăli un utilizator să creadă că e pe un site de
            încredere și apoi să-l redirecționeze către un site periculos.
          </p>
        </section>

        {/* Real-world example */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded shadow space-y-3 text-sm">
          <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-200">
            🎣 Exemplu real de phishing
          </h2>
          <p>Utilizatorul primește un link pe email sau social media:</p>
          <div className="bg-white dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-800 rounded p-4 text-xs font-mono overflow-auto">
            https://site-bancar.com/redirect?next=http://fake-banca-login.com
          </div>
          <p>
            După ce face click, ajunge pe un site fals unde i se cere să se
            autentifice. Datele pot fi furate fără ca el să observe.
          </p>
        </section>

        {/* Comparatie */}
        <section className="bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 p-6 rounded shadow space-y-3 text-sm">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
            🧠 Vulnerabil vs Protejat
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-red-600">❌ Vulnerabil:</strong> orice
              link din parametru este acceptat. Nicio validare.
            </li>
            <li>
              <strong className="text-green-600">✅ Protejat:</strong> se
              acceptă doar linkuri whitelisted (ex: propriul tău domeniu sau
              doar căi interne: <code>/home</code>, <code>/profile</code>).
            </li>
            <li>
              <strong className="text-gray-600">🔗</strong> Ideal este să eviți
              complet redirecturi externe sau să folosești tokenuri semnate.
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300">
            💡 Best Practices pentru protecție
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-800 dark:text-gray-200">
            <li>
              ✅ Validează parametrii URL cu <code>new URL()</code> și verifică
              hostname-ul.
            </li>
            <li>
              ✅ Permite doar redirecturi interne (cu <code>/</code> la
              început).
            </li>
            <li>
              ✅ Nu accepta redirecturi cu <code>http://</code> sau{" "}
              <code>https://</code> externe decât dacă ai whitelist clar.
            </li>
            <li>
              ✅ Dacă e necesar redirect extern, folosește o pagină intermediară
              de tip: „Urmează să părăsești site-ul...”
            </li>
          </ul>
        </section>

        {/* Recap Banner */}
        <section className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg shadow text-sm">
          <h2 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
            🔐 Recapitulare
          </h2>
          <p>
            Redirecționarea este o unealtă utilă dar periculoasă dacă nu e
            controlată. Aplică întotdeauna verificări stricte pe backend, educă
            utilizatorii și nu presupune că parametrii URL sunt siguri.
          </p>
        </section>
      </main>
    </>
  );
}

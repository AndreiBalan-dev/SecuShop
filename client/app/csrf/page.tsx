"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function CSRFLandingPage() {
  const router = useRouter();

  const vulnerableCode = `// ❌ Cod vulnerabil (fără CSRF protection)
router.post("/transfer-vulnerable", (req, res) => {
  const amount = parseFloat(req.body.amount);
  balance -= amount;
  res.json({ message: "Transfer reușit (dar vulnerabil)!" });
});`;

  const protectedCode = `// ✅ Cod protejat (cu middleware CSRF)
router.post("/transfer-protected", csrfProtection, (req, res) => {
  const amount = parseFloat(req.body.amount);
  balance -= amount;
  res.json({ message: "Transfer securizat!" });
});`;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 text-neutral-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-pink-400">
            🛡️ CSRF (Cross-Site Request Forgery)
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 max-w-3xl mx-auto">
            CSRF permite trimiterea cererilor POST de către atacatori în numele
            utilizatorilor autentificați. Această pagină explică și demonstrează
            cum funcționează și cum se poate preveni.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/csrf/vulnerable")}
            className="flex flex-col items-start bg-pink-600/10 hover:bg-pink-600/20 border border-pink-600 text-pink-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Varianta vulnerabilă
            </span>
            <p className="text-sm mt-1">
              Fără niciun mecanism de protecție. Cererile POST externe
              funcționează direct.
            </p>
          </button>

          <button
            onClick={() => router.push("/csrf/protected")}
            className="flex flex-col items-start bg-green-600/10 hover:bg-green-600/20 border border-green-600 text-green-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="h-6 w-6" />
              Varianta protejată
            </span>
            <p className="text-sm mt-1">
              Folosește token CSRF verificat automat la fiecare cerere POST.
            </p>
          </button>
        </section>

        {/* How CSRF Works */}
        <section className="bg-neutral-800/50 border border-pink-600 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-300">
            🔍 Cum funcționează un atac CSRF?
          </h2>
          <p className="text-sm text-neutral-300">
            Browserul trimite automat cookie-urile de sesiune la fiecare cerere.
            Dacă utilizatorul este logat și vizitează un site malițios, acel
            site poate trimite o cerere POST în numele lui.
          </p>
          <ul className="list-disc pl-6 text-sm space-y-2 text-neutral-300">
            <li>
              ✅ Atacatorul creează un formular ascuns sau un script de fetch.
            </li>
            <li>✅ Browserul atașează cookie-ul de sesiune.</li>
            <li>❌ Serverul fără protecție procesează cererea ca legitimă.</li>
          </ul>
        </section>

        {/* Visual Flow */}
        <section className="bg-neutral-800/50 border border-yellow-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            📊 Fluxul unui atac CSRF
          </h2>
          <div className="w-full space-y-4">
            <img
              src="https://i.imgur.com/hcFpzhz.png"
              alt="Varianta vulnerabila"
              className="w-full rounded border border-neutral-700"
            />
            <img
              src="https://i.imgur.com/Ofn5yAs.png"
              alt="Varianta protejata"
              className="w-full rounded border border-neutral-700"
            />
          </div>
        </section>
        {/* Code Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-pink-300">
            🧪 Cod comparativ: vulnerabil vs protejat
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-600/10 border border-pink-600 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 text-pink-300 font-semibold text-lg">
                <ExclamationTriangleIcon className="h-5 w-5" />
                Cod vulnerabil
              </h3>
              <SyntaxHighlighter language="tsx" style={oneDark}>
                {vulnerableCode}
              </SyntaxHighlighter>
            </div>

            <div className="bg-green-600/10 border border-green-600 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 text-green-300 font-semibold text-lg">
                <ShieldCheckIcon className="h-5 w-5" />
                Cod protejat
              </h3>
              <SyntaxHighlighter language="tsx" style={oneDark}>
                {protectedCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-green-600/10 border border-green-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-green-300">
            ✅ Cum previi CSRF?
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2 text-neutral-300">
            <li>Folosește token CSRF unic pe fiecare formular.</li>
            <li>
              Verifică <code>SameSite</code> în cookie-uri (ex.{" "}
              <code>SameSite=Strict</code>).
            </li>
            <li>
              Nu permite metode state-changing (POST/PUT/DELETE) fără protecție.
            </li>
            <li>Activează CORS strict dacă ai API-uri expuse public.</li>
          </ul>
        </section>

        {/* Recap */}
        <section className="bg-gradient-to-r from-pink-800/30 to-pink-900/20 border border-pink-600/30 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-bold text-pink-300">🔐 Recapitulare</h2>
          <p className="text-sm text-neutral-300">
            CSRF atacă încrederea aplicației în utilizator. Protejează
            endpoint-urile cu tokenuri, validează cererile și implementează{" "}
            <code>SameSite</code>.
          </p>
        </section>
      </main>
    </>
  );
}

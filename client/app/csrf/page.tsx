"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
      <main className="max-w-5xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 space-y-16">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-pink-600">
            🛡️ CSRF (Cross-Site Request Forgery)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Atacurile <strong>CSRF</strong> forțează utilizatorii autentificați
            să trimită cereri malițioase fără consimțământul lor. Aici vei
            învăța cum funcționează și cum să le previi.
          </p>
        </section>

        {/* Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/csrf/vulnerable")}
            className="bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/40 dark:hover:bg-pink-900/60 border border-pink-400 text-pink-600 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ⚠️ Varianta Vulnerabilă
            <p className="text-sm font-normal mt-1">
              Nu are niciun mecanism de protecție. Atacatorii pot trimite cereri
              POST direct dintr-un iframe sau site extern.
            </p>
          </button>

          <button
            onClick={() => router.push("/csrf/protected")}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 border border-green-400 text-green-600 font-semibold px-6 py-4 rounded-xl shadow-md transition text-left"
          >
            ✅ Varianta Protejată
            <p className="text-sm font-normal mt-1">
              Folosește token CSRF și middleware `csurf` pentru a verifica
              autenticitatea cererilor.
            </p>
          </button>
        </section>

        {/* Explicație CSRF */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-pink-600">
            📚 Cum funcționează un atac CSRF?
          </h2>
          <p>
            CSRF exploatează faptul că un browser trimite automat cookie-urile
            la fiecare cerere. Dacă un utilizator este logat într-o aplicație și
            vizitează un site malițios, acel site poate trimite o cerere POST
            către serverul autentic — iar serverul o execută crezând că este
            legitimă.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>✅ Atacatorul construiește un formular ascuns.</li>
            <li>✅ Browserul trimite cookie-urile autentificate.</li>
            <li>❌ Serverul fără protecție execută cererea fără întrebări.</li>
          </ul>
        </section>

        {/* Cod Comparativ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-pink-600">
            🧪 Comparatie: Cod vulnerabil vs cod protejat
          </h2>

          <div>
            <h3 className="font-semibold text-pink-600 mb-2">
              ❌ Cod vulnerabil
            </h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {vulnerableCode}
            </SyntaxHighlighter>
          </div>

          <div>
            <h3 className="font-semibold text-green-600 mb-2">
              ✅ Cod protejat
            </h3>
            <SyntaxHighlighter language="tsx" style={oneDark}>
              {protectedCode}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* Final Section */}
        <section className="bg-pink-100 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4 rounded-md text-sm space-y-2">
          <h3 className="text-pink-800 dark:text-pink-200 font-semibold">
            🔐 Lecția de reținut:
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-black dark:text-pink-100">
            <li>CSRF atacă încrederea aplicației în utilizator, nu invers.</li>
            <li>
              Orice endpoint care modifică datele trebuie protejat cu un token
              unic.
            </li>
            <li>
              Tokenul CSRF NU poate fi accesat de un site terț, deci cererile
              malițioase eșuează.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

"use client";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            🔐 Bun venit în <span className="text-accent">SecuShop</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <strong>SecuShop</strong> este o platformă eCommerce simulată,
            creată pentru a demonstra vulnerabilități reale de securitate și
            soluții eficiente împotriva acestora. Află cum acționează atacatorii
            - și cum să-ți aperi aplicația corect.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Realizat de <strong>Bălan Andrei Marian</strong> pentru{" "}
            <strong>Școala de Vară Cybersecurity - Ovidius Camp 2025</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            🧪 Explorează Vulnerabilitățile
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li>
              <a
                href="/sql-injection"
                className="block border border-red-500 rounded-lg p-4 hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                <h3 className="text-red-600 font-bold text-lg">
                  💉 SQL Injection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Exploatează interogări nesigure în baza de date și învață cum
                  le poți securiza cu parametri.
                </p>
              </a>
            </li>
            <li>
              <a
                href="/xss"
                className="block border border-yellow-500 rounded-lg p-4 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition"
              >
                <h3 className="text-yellow-600 font-bold text-lg">
                  🧨 XSS (Cross-site Scripting)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Injectează și execută scripturi prin input-uri, apoi aplică
                  măsuri de protecție prin filtrare.
                </p>
              </a>
            </li>
            <li>
              <a
                href="/csrf"
                className="block border border-pink-500 rounded-lg p-4 hover:bg-pink-50 dark:hover:bg-pink-900 transition"
              >
                <h3 className="text-pink-600 font-bold text-lg">🛡️ CSRF</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Execută acțiuni neautorizate în numele utilizatorilor - și
                  apără-te cu tokeni și anteturi personalizate.
                </p>
              </a>
            </li>
            <li>
              <a
                href="/auth-bypass"
                className="block border border-purple-500 rounded-lg p-4 hover:bg-purple-50 dark:hover:bg-purple-900 transition"
              >
                <h3 className="text-purple-600 font-bold text-lg">
                  🚪 Auth Bypass
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ocolește logica de autentificare și descoperă de ce validarea
                  rolurilor este crucială.
                </p>
              </a>
            </li>
            <li>
              <a
                href="/open-redirect"
                className="block border border-green-500 rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 transition"
              >
                <h3 className="text-green-600 font-bold text-lg">
                  🔁 Open Redirect
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Redirecționează utilizatori spre site-uri malițioase prin
                  linkuri nesigure - și evită asta prin validare.
                </p>
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

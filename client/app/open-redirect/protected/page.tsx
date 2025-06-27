"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function OpenRedirectProtected() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("http://localhost:3000");

  return (
    <>
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop Secure Checkout
          </h1>
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs">1 produs în coș</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Redirecționare Securizată
          </h2>
          <p className="text-green-100">
            Această pagină validează URL-ul pentru a preveni redirecte
            malițioase.
          </p>
        </div>
      </section>

      <main className="bg-gray-50 text-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block space-y-6">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Comandă</h3>
              <ul className="space-y-2 text-sm">
                <li>• Coșul tău</li>
                <li>• Adresă livrare</li>
                <li>• Plata</li>
                <li className="font-semibold text-green-600">
                  • Autentificare (Protejat)
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Login Form */}
            <section className="bg-white border border-neutral-200 rounded shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                🔐 Conectare cont (Protejat)
              </h2>
              <p className="text-sm text-neutral-600">
                După autentificare, vei fi redirecționat doar către un URL valid
                din domeniul aplicației.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-neutral-300 bg-white text-black px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="password"
                  placeholder="Parolă"
                  className="border border-neutral-300 bg-white text-black px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mt-4">
                  URL redirecționare după login
                </label>
                <input
                  type="text"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  className="w-full border border-neutral-300 bg-white text-black px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-neutral-500">
                  Exemplu valid:{" "}
                  <code className="text-green-600">
                    http://localhost:3000/profile
                  </code>
                </p>
              </div>
              <button
                onClick={() => {
                  router.push(
                    `/api/redirect-safe?next=${encodeURIComponent(redirectUrl)}`
                  );
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium shadow mt-4"
              >
                🔒 Execută Redirect Securizat
              </button>
            </section>

            {/* Backend Explanation */}
            <section className="bg-green-50 border border-green-300 p-5 rounded text-sm space-y-3">
              <p>
                🛡️ Backend-ul validează parametrul <code>next</code> și permite
                redirecționarea doar către domeniul{" "}
                <strong>localhost:3000</strong>.
              </p>
              <pre className="bg-white p-4 rounded text-xs font-mono overflow-auto border border-neutral-200">
                {`app.get("/api/redirect-safe", (req, res) => {
  const next = req.query.next as string;
  try {
    const url = new URL(next);
    if (url.hostname !== "localhost" || url.port !== "3000") {
      throw new Error("Redirect extern nepermis");
    }
    return res.redirect(next);
  } catch {
    return res.redirect("/"); // fallback sigur
  }
});`}
              </pre>
              <p>
                Dacă URL-ul este extern (ex: <code>malicious.com</code>),
                serverul va ignora cererea și va redirecționa spre pagina
                principală.
              </p>
            </section>

            {/* Educational Comparison */}
            <section className="bg-white border border-green-200 p-5 rounded shadow space-y-2">
              <h2 className="text-lg font-bold text-green-700">
                🔍 Diferență față de varianta vulnerabilă:
              </h2>
              <ul className="list-disc pl-5 text-sm text-neutral-800">
                <li>
                  🔓 <strong>Vulnerabil</strong>: redirectează către orice URL
                  inclusiv site-uri de phishing.
                </li>
                <li>
                  🔐 <strong>Protejat</strong>: acceptă doar redirecționări
                  către domeniul propriu.
                </li>
                <li>
                  ✅ Acest mecanism este recomandat pentru aplicațiile ce
                  folosesc linkuri "back to previous page" sau "continue".
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă Open Redirect Protejat
      </footer>
    </>
  );
}

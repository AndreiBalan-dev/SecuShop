"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCartIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

export default function VulnerableAdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="bg-purple-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldExclamationIcon className="h-7 w-7" />
            SecuShop Admin Panel
          </h1>
          <span className="text-xs">Cont utilizator: victim@secushop.test</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-purple-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <h2 className="text-3xl font-bold">
            Dashboard Administrare (Vulnerabil)
          </h2>
          <p className="text-purple-100">
            Această pagină verifică doar <code>localStorage</code>. Oricine
            poate deveni admin cu un singur script.
          </p>
        </div>
      </section>

      <main className="bg-gray-50 min-h-screen text-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-6 hidden md:block">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Navigare admin</h3>
              <ul className="space-y-2 text-sm">
                <li className="font-semibold text-purple-600">• Dashboard</li>
                <li>• Comenzi</li>
                <li>• Utilizatori</li>
                <li>• Setări sistem</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {!isAdmin ? (
              <section className="bg-red-50 border border-red-300 text-red-800 p-6 rounded shadow space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ShieldExclamationIcon className="h-5 w-5" />❌ Acces interzis
                </h2>
                <p>
                  Nu ești recunoscut ca admin. Dar pentru că aplicația este
                  vulnerabilă, poți modifica <code>localStorage</code> și
                  reîncărca pagina.
                </p>
                <div className="bg-black text-green-400 font-mono p-3 rounded">
                  localStorage.setItem("role", "admin")
                </div>
                <button
                  onClick={() => {
                    localStorage.setItem("role", "admin");
                    router.refresh();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow mt-2"
                >
                  🧪 Simulează atacul (auto-hack)
                </button>
              </section>
            ) : (
              <>
                {/* Access Granted */}
                <section className="bg-green-50 border border-green-300 text-green-800 p-6 rounded shadow space-y-3">
                  <h2 className="text-lg font-semibold">
                    ✅ Ai acces complet la dashboard
                  </h2>
                  <p>
                    Sistemul crede că ești admin doar pentru că ai setat
                    <code> localStorage </code>. Nu există verificare reală!
                  </p>
                </section>

                {/* Admin Widgets */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Comenzi active
                    </h3>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Utilizatori înregistrați
                    </h3>
                    <p className="text-2xl font-bold">487</p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Venit lunar
                    </h3>
                    <p className="text-2xl font-bold">34.500 RON</p>
                  </div>
                </section>

                {/* Sensitive Controls */}
                <section className="bg-white border border-neutral-200 rounded shadow p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">
                    🔧 Control administrativ critic
                  </h3>
                  <p className="text-sm text-gray-600">
                    Acest buton ar putea șterge date sau reseta serverul. Și
                    totul e accesibil fără autentificare reală.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
                    🚨 Șterge toate comenzile (exemplu periculos)
                  </button>
                </section>
              </>
            )}

            {/* Code Explanation */}
            <section className="bg-gray-100 border border-neutral-200 rounded shadow p-6 space-y-2 text-sm">
              <h2 className="font-bold text-purple-700">
                📜 Cod frontend vulnerabil
              </h2>
              <div className="bg-white border border-neutral-200 p-4 rounded text-xs font-mono overflow-auto">
                <pre>{`const role = localStorage.getItem("role");
if (role === "admin") {
  setIsAdmin(true);
}`}</pre>
              </div>
              <p>
                ❌ Nu există verificare de sesiune, token sau cookie securizat.
              </p>
            </section>

            {/* Remove Role */}
            {isAdmin && (
              <div className="text-center">
                <button
                  onClick={() => {
                    localStorage.removeItem("role");
                    router.refresh();
                  }}
                  className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  🔄 Revocă accesul admin
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă Auth Bypass Vulnerabil
      </footer>
    </>
  );
}

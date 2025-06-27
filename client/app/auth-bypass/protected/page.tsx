"use client";
import { useEffect, useState } from "react";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

export default function ProtectedAdminPage() {
  const [status, setStatus] = useState<
    "loading" | "unauthorized" | "authorized"
  >("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/dashboard", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          setStatus("unauthorized");
        } else if (res.ok) {
          setStatus("authorized");
        } else {
          setStatus("unauthorized");
        }
      } catch {
        setStatus("unauthorized");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheckIcon className="h-7 w-7" />
            SecuShop Admin Panel
          </h1>
          <span className="text-xs">
            Acces securizat cu sesiune server-side
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-green-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <h2 className="text-3xl font-bold">
            Dashboard Administrare (Protejat)
          </h2>
          <p className="text-green-100">
            Acces permis doar utilizatorilor autentificați prin sesiune
            verificată.
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
                <li className="font-semibold text-green-700">• Dashboard</li>
                <li>• Comenzi</li>
                <li>• Utilizatori</li>
                <li>• Setări sistem</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {status === "loading" && (
              <section className="bg-white border border-neutral-200 p-6 rounded shadow text-center">
                <p className="text-gray-600">🔄 Se verifică sesiunea...</p>
              </section>
            )}

            {status === "unauthorized" && (
              <section className="bg-red-50 border border-red-300 text-red-800 p-6 rounded shadow space-y-3 text-center">
                <h2 className="text-lg font-semibold flex items-center gap-2 justify-center">
                  <ShieldExclamationIcon className="h-5 w-5" />❌ Acces interzis
                </h2>
                <p>
                  Serverul a respins accesul – nu ai sesiune validă de admin.
                </p>
                <p className="text-sm text-gray-700">
                  Te rugăm să te loghezi ca admin înainte de a accesa acest
                  dashboard.
                </p>
              </section>
            )}

            {status === "authorized" && (
              <>
                <section className="bg-green-50 border border-green-300 text-green-800 p-6 rounded shadow space-y-3">
                  <h2 className="text-lg font-semibold">✅ Acces permis</h2>
                  <p>
                    Rolul tău de <strong>admin</strong> a fost verificat cu
                    succes de server.
                  </p>
                  <p className="text-sm text-gray-700">
                    Această zonă este securizată – manipularea localStorage nu
                    funcționează.
                  </p>
                </section>

                {/* Admin Widgets */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Comenzi active
                    </h3>
                    <p className="text-2xl font-bold">14</p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Utilizatori înregistrați
                    </h3>
                    <p className="text-2xl font-bold">512</p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded shadow p-4">
                    <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                      Venit lunar
                    </h3>
                    <p className="text-2xl font-bold">40.200 RON</p>
                  </div>
                </section>

                {/* Sensitive Controls */}
                <section className="bg-white border border-neutral-200 rounded shadow p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">
                    🔐 Control administrativ
                  </h3>
                  <p className="text-sm text-gray-600">
                    Aceste funcții pot fi accesate doar cu sesiune validă.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
                    🚨 Șterge toate comenzile (exemplu protejat)
                  </button>
                </section>
              </>
            )}

            {/* Code Explanation */}
            <section className="bg-gray-100 border border-neutral-200 rounded shadow p-6 space-y-2 text-sm">
              <h2 className="font-bold text-green-700">
                📜 Cum funcționează protecția
              </h2>
              <p>
                Backend-ul validează sesiunea utilizatorului prin{" "}
                <code>connect.sid</code>. Cookie-ul este HTTP-only și nu poate
                fi modificat din JavaScript.
              </p>
              <div className="bg-white border border-neutral-200 p-4 rounded text-xs font-mono overflow-auto">
                <pre>{`app.get("/api/admin/dashboard", (req, res) => {
  if (req.session.role === "admin") {
    res.send("✅ Acces permis la dashboard");
  } else {
    res.status(401).send("❌ Acces interzis");
  }
});`}</pre>
              </div>
              <ul className="list-disc pl-6 text-sm text-gray-800">
                <li>✅ Nu depinde de localStorage</li>
                <li>✅ Nu poate fi falsificat din consolă</li>
                <li>✅ Fiecare cerere e verificată pe server</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă Auth Bypass Protejat
      </footer>
    </>
  );
}

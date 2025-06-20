"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto space-y-12 text-gray-800 dark:text-gray-200">
        {/* Title */}
        <section className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-purple-600">
            ⚠️ Admin Dashboard (Vulnerabil)
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Această pagină verifică doar <code>localStorage</code> ca să vadă
            dacă ești admin – fără validare din backend.
          </p>
        </section>

        {/* Access Check */}
        {!isAdmin ? (
          <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 p-5 rounded-md shadow text-center space-y-3">
            <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
              ❌ Acces interzis
            </h2>
            <p>
              Nu ești recunoscut ca admin. Dar pentru că aplicația este
              vulnerabilă...
            </p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              ...poți pur și simplu să deschizi consola browserului și să
              rulezi:
            </p>
            <div className="bg-black text-green-400 font-mono p-3 rounded">
              localStorage.setItem("role", "admin")
            </div>
            <p>...apoi reîncarci pagina. 🎯</p>

            <button
              onClick={() => {
                localStorage.setItem("role", "admin");
                router.refresh();
              }}
              className="mt-4 px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              🧪 Simulează atacul (auto-hack)
            </button>
          </div>
        ) : (
          <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-5 rounded-md shadow space-y-3">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">
              ✅ Ai acces la dashboard
            </h2>
            <p>
              Aplicația crede că ești admin pentru că ai modificat
              <code> localStorage </code>.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dar nu există nicio verificare reală pe server. Oricine poate
              accesa aceste date sensibile!
            </p>
          </div>
        )}

        {/* Cod demonstrativ */}
        <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded shadow space-y-2 text-sm">
          <h2 className="font-bold text-purple-700 dark:text-purple-300">
            📜 Cod folosit în această pagină:
          </h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-4 text-xs font-mono overflow-auto">
            <pre>{`const role = localStorage.getItem("role");
if (role === "admin") {
  setIsAdmin(true);
}`}</pre>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            ✅ NU există nicio verificare cu serverul, sesiune sau cookie
            securizat.
          </p>
        </section>

        {/* Delete button */}
        <div className="text-center">
          <button
            onClick={() => {
              localStorage.removeItem("role");
              router.refresh();
            }}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            🔄 Șterge rolul și reîncearcă
          </button>
        </div>

        {/* Summary */}
        <section className="bg-red-50 dark:bg-red-900/20 p-6 rounded shadow space-y-2 text-sm">
          <h2 className="text-lg font-bold text-red-600 dark:text-red-300">
            ❗ De ce e greșit acest sistem?
          </h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>
              <strong>Frontendul nu e un loc sigur</strong> – utilizatorul are
              control complet.
            </li>
            <li>
              <code>localStorage</code> e vizibil și modificabil din consola
              browserului.
            </li>
            <li>
              Backendul nu verifică nimic – nu contează cine trimite requestul.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

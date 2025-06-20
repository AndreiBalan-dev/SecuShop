"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProtectedAdminPage() {
  const [status, setStatus] = useState<
    "loading" | "unauthorized" | "authorized"
  >("loading");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/dashboard", {
          credentials: "include",
        });

        if (res.status === 401) {
          setStatus("unauthorized");
        } else if (res.ok) {
          setStatus("authorized");
        } else {
          setStatus("unauthorized");
        }
      } catch (err) {
        setStatus("unauthorized");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-8 max-w-4xl mx-auto space-y-10 text-center text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold text-green-600">
          🛡️ Admin Dashboard (Protejat)
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Această pagină este protejată real, prin sesiune validată pe backend.
        </p>

        {/* Status UI */}
        {status === "loading" && (
          <p className="text-gray-500 dark:text-gray-300 italic">
            Se verifică permisiunile...
          </p>
        )}

        {status === "unauthorized" && (
          <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 text-red-800 p-4 rounded space-y-2">
            <p>❌ Acces interzis!</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Serverul a verificat sesiunea și a refuzat accesul — nu ai rol
              valid sau nu ești logat.
            </p>
          </div>
        )}

        {status === "authorized" && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-800 p-6 rounded shadow space-y-2">
            <p>✅ Acces permis!</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Rolul tău a fost verificat cu succes prin sesiunea{" "}
              <code>connect.sid</code> în cookie. Acest dashboard e vizibil doar
              utilizatorilor autentificați ca <strong>admin</strong>.
            </p>
          </div>
        )}

        {/* Code Explanation */}
        <section className="bg-gray-100 dark:bg-gray-900 p-6 rounded shadow space-y-3 text-left">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
            🧠 Cum funcționează această protecție?
          </h2>
          <p className="text-sm">
            Când te loghezi, serverul setează un cookie numit{" "}
            <code>connect.sid</code> care identifică sesiunea ta. Acest cookie
            este <strong>HTTP-only</strong>, deci nu poate fi citit sau
            modificat din JavaScript.
          </p>

          <div className="bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded p-4 text-xs font-mono overflow-auto">
            <strong>// Backend (Express + express-session)</strong>
            <pre>{`app.get("/api/admin/dashboard", (req, res) => {
  if (req.session.role === "admin") {
    res.send("✅ Acces permis la dashboard");
  } else {
    res.status(401).send("❌ Acces interzis");
  }
});`}</pre>
          </div>

          <ul className="list-disc pl-6 text-sm text-gray-800 dark:text-gray-200">
            <li>
              ✅ Folosește <code>express-session</code> pentru a gestiona
              sesiuni sigure.
            </li>
            <li>✅ Nu expune datele de autentificare pe frontend.</li>
            <li>
              ✅ Nu folosește <code>localStorage</code> – nimic nu poate fi
              falsificat din consolă.
            </li>
            <li>
              ✅ Orice cerere către server este verificată automat pe baza
              cookie-ului.
            </li>
          </ul>
        </section>

        {/* Comparison Reminder */}
        <section className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded shadow space-y-2 text-left text-sm">
          <h2 className="text-lg font-bold text-purple-700 dark:text-purple-300">
            🔁 Comparat cu varianta vulnerabilă:
          </h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>
              ❌ În varianta vulnerabilă, se verifică doar{" "}
              <code>localStorage</code> – care e manipulabil.
            </li>
            <li>
              ✅ În varianta protejată, rolul este salvat în backend și validat
              de server, nu de browser.
            </li>
            <li>
              🔐 Cookie-ul <code>connect.sid</code> nu poate fi accesat de
              JavaScript → protecție reală.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

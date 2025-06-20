"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AuthBypassPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 space-y-14">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-purple-600">🚪 Auth Bypass</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ocolirea autentificării (Auth Bypass) înseamnă accesarea de zone
            protejate fără a fi logat sau fără a avea drepturile necesare.
          </p>
        </section>

        {/* Demo Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/auth-bypass/vulnerable")}
            className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 border border-purple-400 text-purple-600 font-semibold px-6 py-4 rounded-xl shadow-md transition"
          >
            ⚠️ Vezi varianta vulnerabilă
          </button>
          <button
            onClick={() => router.push("/auth-bypass/protected")}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 border border-green-400 text-green-600 font-semibold px-6 py-4 rounded-xl shadow-md transition"
          >
            ✅ Vezi varianta protejată
          </button>
        </section>

        {/* Auth Buttons */}
        <section className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={async () => {
              await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: "andrei", role: "admin" }),
              });
              localStorage.setItem("role", "admin");
              alert("Ai fost logat ca admin!");
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            🔑 Login ca Admin
          </button>

          <button
            onClick={async () => {
              await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: "ionut", role: "user" }),
              });
              localStorage.setItem("role", "user");
              alert("Ai fost logat ca user!");
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            👤 Login ca User
          </button>

          <button
            onClick={async () => {
              await fetch("http://localhost:4000/api/auth/logout", {
                method: "POST",
                credentials: "include",
              });
              localStorage.removeItem("role");
              alert("Ai fost delogat!");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🚪 Logout
          </button>
        </section>

        {/* Vulnerability Explanation */}
        <section className="bg-purple-100 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-md shadow space-y-4 text-sm">
          <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
            ⚠️ Varianta vulnerabilă
          </h2>
          <p>
            Aplicația verifică doar <code>localStorage</code> ca să decidă dacă
            ești admin. Acesta poate fi modificat ușor de atacator.
          </p>

          <div className="bg-white dark:bg-purple-950 border border-purple-300 dark:border-purple-800 rounded p-4 text-xs font-mono overflow-auto">
            <strong>// Frontend</strong>
            <pre>{`const role = localStorage.getItem("role");
if (role === "admin") {
  // Acces permis 😬
}`}</pre>
          </div>

          <p className="italic text-purple-800 dark:text-purple-100">
            🔓 Oricine poate rula în consola browserului:
          </p>
          <div className="bg-black text-green-400 font-mono p-3 rounded">
            localStorage.setItem("role", "admin")
          </div>
        </section>

        {/* Secure Explanation */}
        <section className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-md shadow space-y-4 text-sm">
          <h2 className="text-lg font-semibold text-green-700 dark:text-green-200">
            ✅ Varianta protejată
          </h2>
          <p>
            Backendul setează o sesiune stocată în <code>req.session</code> și
            salvată în cookie <code>connect.sid</code>. Aceasta NU poate fi
            modificată din browser.
          </p>

          <div className="bg-white dark:bg-green-950 border border-green-300 dark:border-green-800 rounded p-4 text-xs font-mono overflow-auto">
            <strong>// Backend protejat</strong>
            <pre>{`app.get("/api/admin", (req, res) => {
  if (req.session.role === "admin") {
    res.send("✅ Acces permis la admin panel");
  } else {
    res.status(403).send("❌ Acces interzis");
  }
});`}</pre>
          </div>

          <ul className="list-disc pl-6 space-y-1 mt-2 text-sm text-gray-800 dark:text-gray-200">
            <li>✅ Verificarea se face în backend, nu în UI</li>
            <li>
              ✅ Cookie-ul <code>connect.sid</code> este HTTP-only
            </li>
            <li>✅ Nu poate fi modificat de atacatori</li>
            <li>✅ Funcționează indiferent dacă frontendul e compromis</li>
          </ul>
        </section>

        {/* Why Sessions Matter */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded shadow space-y-3">
          <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300">
            🧠 De ce folosim sesiuni și <code>connect.sid</code>?
          </h2>
          <p>
            Atunci când te loghezi, serverul creează o sesiune unică (cu un ID)
            și o trimite ca HTTP-only cookie în browserul tău. Această sesiune
            este salvată pe server (sau în memorie) și NU poate fi modificată de
            client.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>
              ✅ Cookie-ul <code>connect.sid</code> e protejat automat de
              JavaScript (nu apare în <code>document.cookie</code>)
            </li>
            <li>
              ✅ <code>req.session</code> este verificat la fiecare cerere –
              inclusiv rolul tău.
            </li>
            <li>✅ Nu e nevoie să trimiți tokeni manuali sau localStorage!</li>
          </ul>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            Astfel, dacă frontendul e compromis, atacatorul NU poate accesa zona
            de admin – pentru că backendul are control complet.
          </p>
        </section>
      </main>
    </>
  );
}

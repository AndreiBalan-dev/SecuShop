"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function AuthBypassPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 text-neutral-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-purple-400">
            🚪 Auth Bypass
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Ocolirea autentificării înseamnă accesarea zonelor protejate fără
            permisiuni. Aici vezi cum funcționează și cum te protejezi.
          </p>
        </section>

        {/* Demo Buttons */}
        <section className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/auth-bypass/vulnerable")}
            className="flex flex-col items-start bg-purple-600/10 hover:bg-purple-600/20 border border-purple-600 text-purple-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Varianta vulnerabilă
            </span>
            <p className="text-sm mt-1">
              Verifică doar <code>localStorage</code>. Oricine poate fenta
              accesul.
            </p>
          </button>
          <button
            onClick={() => router.push("/auth-bypass/protected")}
            className="flex flex-col items-start bg-green-600/10 hover:bg-green-600/20 border border-green-600 text-green-300 font-semibold px-6 py-5 rounded-xl shadow transition"
          >
            <span className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="h-6 w-6" />
              Varianta protejată
            </span>
            <p className="text-sm mt-1">
              Verificare securizată în backend cu sesiuni HTTP-only.
            </p>
          </button>
        </section>

        {/* Auth Actions */}
        <section className="grid md:grid-cols-3 gap-4">
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
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg shadow transition"
          >
            <UserIcon className="h-5 w-5" />
            Login ca Admin
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
            className="flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-800 text-white px-4 py-3 rounded-lg shadow transition"
          >
            <UserIcon className="h-5 w-5" />
            Login ca User
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
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg shadow transition"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </section>

        {/* Vulnerable Explanation */}
        <section className="bg-purple-600/10 border border-purple-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5" />
            Varianta vulnerabilă
          </h2>
          <p className="text-sm text-neutral-300">
            Aplicația verifică doar <code>localStorage</code> pentru rol.
            Oricine poate rula acest cod în consola browserului:
          </p>
          <div className="bg-black text-green-400 font-mono p-3 rounded text-sm">
            localStorage.setItem("role", "admin")
          </div>
          <p className="text-sm text-neutral-300">
            Apoi utilizatorul are acces complet fără login real.
          </p>
        </section>

        {/* Protected Explanation */}
        <section className="bg-green-600/10 border border-green-600 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-green-300 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5" />
            Varianta protejată
          </h2>
          <p className="text-sm text-neutral-300">
            Backendul salvează sesiunea în <code>req.session</code>, cu cookie{" "}
            <code>connect.sid</code>.
          </p>
          <div className="bg-neutral-900 border border-green-700 rounded p-4 text-xs font-mono overflow-auto">
            {`app.get("/api/admin", (req, res) => {
  if (req.session.role === "admin") {
    res.send("✅ Acces permis la admin panel");
  } else {
    res.status(403).send("❌ Acces interzis");
  }
});`}
          </div>
          <ul className="list-disc pl-6 text-sm text-neutral-300 space-y-1">
            <li>✅ Verificare pe server, nu în UI</li>
            <li>✅ Cookie HTTP-only</li>
            <li>✅ Rezistent la modificări din frontend</li>
          </ul>
        </section>

        {/* Why Sessions Matter */}
        <section className="bg-neutral-800/50 border border-purple-600 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-bold text-purple-300">
            🧠 De ce folosim sesiuni și <code>connect.sid</code>?
          </h2>
          <p className="text-sm text-neutral-300">
            Serverul creează o sesiune unică la login și trimite un cookie
            HTTP-only. Acesta nu poate fi modificat din JavaScript.
          </p>
          <ul className="list-disc pl-6 text-sm text-neutral-300 space-y-1">
            <li>
              ✅ <code>connect.sid</code> e invizibil în{" "}
              <code>document.cookie</code>.
            </li>
            <li>
              ✅ <code>req.session</code> e verificat la fiecare request.
            </li>
            <li>✅ Fără localStorage, fără tokeni expuși.</li>
          </ul>
          <p className="text-xs italic text-neutral-500">
            Dacă frontendul e compromis, atacatorul tot nu poate accesa zona
            protejată.
          </p>
        </section>
      </main>
    </>
  );
}

"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function OpenRedirectProtected() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-gray-800 dark:text-gray-200">
        {/* Title */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-600">
            ✅ Open Redirect (Protejat)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            În această versiune, redirecționările sunt permise doar dacă URL-ul
            aparține domeniului aplicației. Astfel, prevenim atacuri de tip
            phishing.
          </p>
        </section>

        {/* Input & Button */}
        <section className="text-center space-y-4">
          <input
            type="text"
            placeholder="Ex: http://localhost:3000/profile"
            defaultValue="http://localhost:3000"
            id="redirect-safe"
            className="w-full max-w-lg border border-gray-400 px-4 py-2 rounded bg-white dark:bg-gray-800"
          />
          <button
            onClick={() => {
              const u = (
                document.getElementById("redirect-safe") as HTMLInputElement
              ).value;
              router.push(`/api/redirect-safe?next=${encodeURIComponent(u)}`);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Execută redirect securizat
          </button>
        </section>

        {/* Backend Explanation */}
        <section className="bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded text-sm space-y-3">
          <p>
            🛡️ Backend-ul validează parametrul <code>next</code> și permite
            redirecționarea doar către domeniul <strong>localhost:3000</strong>.
          </p>
          <pre className="bg-white dark:bg-gray-900 p-4 rounded text-xs font-mono overflow-auto">
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
            Dacă URL-ul este extern (ex: <code>malicious.com</code>), serverul
            va ignora cererea și va redirecționa spre pagina principală.
          </p>
        </section>

        {/* Educational Comparison */}
        <section className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-5 rounded shadow space-y-2">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
            🔍 Diferență față de varianta vulnerabilă:
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-100">
            <li>
              🔓 <strong>Vulnerabil</strong>: redirectează către orice URL dacă
              e în query – inclusiv site-uri de phishing.
            </li>
            <li>
              🔐 <strong>Protejat</strong>: acceptă doar redirecționări către
              domeniul tău, filtrând adrese externe.
            </li>
            <li>
              ✅ Acest mecanism este recomandat pentru aplicațiile care oferă
              linkuri de tip "back to previous page" sau "continue to...".
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

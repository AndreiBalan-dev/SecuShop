"use client";
import Navbar from "@/components/Navbar";

export default function OpenRedirectVulnerable() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-gray-800 dark:text-gray-200">
        {/* Titlu și explicații */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-600">
            ⚠️ Open Redirect (Vulnerabil)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            În această variantă, aplicația redirecționează către orice URL
            primit prin parametru – fără validare. Acest lucru poate fi
            exploatat pentru phishing sau deturnare de trafic.
          </p>
        </section>

        {/* Formular și buton */}
        <section className="text-center space-y-4">
          <input
            type="text"
            placeholder="Introdu URL de redirecționare"
            defaultValue="http://localhost:3000"
            id="redirect"
            className="w-full max-w-lg border border-gray-400 px-4 py-2 rounded bg-white dark:bg-gray-800"
          />
          <button
            onClick={() => {
              const u = (
                document.getElementById("redirect") as HTMLInputElement
              ).value;
              // Redirecționăm direct spre backend (nu Next.js)
              window.location.href = `http://localhost:4000/api/redirect/vulnerable?next=${encodeURIComponent(
                u
              )}`;
            }}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            🚨 Execută Redirect Vulnerabil
          </button>
        </section>

        {/* Cod și explicație */}
        <section className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded text-sm">
          <p>
            🔓 Codul backend acceptă orice URL și redirecționează fără validare:
          </p>
          <pre className="bg-white dark:bg-gray-900 p-4 rounded text-xs font-mono overflow-auto">
            {`app.get("/api/redirect/vulnerable", (req, res) => {
  const next = req.query.next;
  res.redirect(next); // ⚠️ Fără validare → risc de phishing!
});`}
          </pre>
          <p className="mt-2">
            Exemplu periculos: <br />
            <code>/api/redirect/vulnerable?next=http://malicious.com</code>
          </p>
        </section>
      </main>
    </>
  );
}

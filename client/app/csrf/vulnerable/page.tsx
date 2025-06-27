"use client";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CSRFVulnerablePage() {
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [transferLog, setTransferLog] = useState<string[]>([]);

  const fetchBalance = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/csrf/balance", {
        credentials: "include",
      });
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error("Eroare la fetchBalance", err);
    }
  };

  const handleTransfer = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/csrf/transfer-vulnerable",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ amount: "100" }),
        }
      );
      const data = await res.json();

      setStatus(data.message);
      setTransferLog((prev) => [
        `✔️ Transfer de 100 RON realizat. (${new Date().toLocaleTimeString()})`,
        ...prev,
      ]);
      fetchBalance();
    } catch (err) {
      setStatus("❌ Eroare la efectuarea transferului.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="bg-pink-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop Wallet
          </h1>
          <span className="text-xs">Cont utilizator: victim@secushop.test</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Transfer Fonduri (Vulnerabil CSRF)
          </h2>
          <p className="text-pink-100">
            Acest exemplu arată cum un atacator poate trimite cereri POST în
            numele tău.
          </p>
        </div>
      </section>

      <main className="bg-gray-50 text-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block space-y-6">
            <div className="bg-white border border-neutral-200 rounded shadow p-4">
              <h3 className="font-semibold mb-3">Contul meu</h3>
              <ul className="space-y-2 text-sm">
                <li>• Profil</li>
                <li>• Istoric comenzi</li>
                <li className="font-semibold text-pink-600">• Portofel</li>
                <li>• Setări</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Alert */}
            <section className="bg-pink-50 border border-pink-300 text-pink-800 p-4 rounded">
              <p>
                <strong>Avertisment:</strong> Backend-ul acceptă cereri POST
                fără validare. Acest lucru permite transferuri neautorizate
                (CSRF).
              </p>
            </section>

            {/* Balance */}
            <div className="p-4 bg-white border border-neutral-200 rounded shadow flex justify-between items-center">
              <p className="text-lg font-semibold">
                💰 Sold curent:{" "}
                <span className="text-pink-700">{balance} RON</span>
              </p>
              <button
                onClick={handleTransfer}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-medium shadow"
              >
                🚨 Trimite 100 RON
              </button>
            </div>

            {status && (
              <div className="p-4 border rounded bg-pink-100 border-pink-300 text-pink-800">
                {status}
              </div>
            )}

            {/* Transaction Log */}
            <section className="bg-white border border-neutral-200 rounded shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                📜 Istoric tranzacții
              </h2>
              {transferLog.length === 0 ? (
                <p className="text-sm italic text-gray-500">
                  Niciun transfer efectuat în această sesiune.
                </p>
              ) : (
                <ul className="text-sm space-y-2 list-disc pl-6">
                  {transferLog.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              )}
            </section>

            {/* Iframe Exploit */}
            <section className="bg-pink-50 border border-pink-300 p-6 rounded space-y-3">
              <h2 className="text-lg font-semibold text-red-600">
                🔓 Simulare atac CSRF real
              </h2>
              <p className="text-sm text-gray-700">
                Un site malițios poate include un iframe ascuns care trimite
                cereri POST fără acordul tău.
              </p>
              <iframe
                src="http://localhost:4000/attacker.html"
                className="w-full border border-pink-300 rounded-md h-28"
              />
              <p className="text-xs text-gray-500 italic">
                Această iframe simulează un atac real. Dacă vezi tranzacții noi
                în istoric, exploit-ul a funcționat.
              </p>
            </section>

            <div className="pt-6">
              <a href="/csrf" className="text-sm text-pink-600 hover:underline">
                ← Înapoi la pagina CSRF
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă CSRF Vulnerabil
      </footer>
    </>
  );
}

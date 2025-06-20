"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 space-y-10">
        <h1 className="text-4xl font-bold text-pink-600">🛡️ CSRF Vulnerabil</h1>

        <p className="text-gray-600 text-sm">
          <strong>Simulare victimă:</strong> Ești autentificat automat ca{" "}
          <code>victim@secushop.test</code> folosind cookies. Acest exemplu
          arată ce se întâmplă dacă backendul nu verifică proveniența cererii.
        </p>

        <div className="p-4 bg-pink-50 dark:bg-pink-900/20 border border-pink-300 rounded-md">
          <p className="text-lg font-semibold">
            💰 Sold actual: <span className="text-pink-700">{balance} RON</span>
          </p>
        </div>

        <button
          onClick={handleTransfer}
          className="bg-pink-600 text-white px-6 py-3 rounded hover:brightness-110"
        >
          Trimite 100 RON altui utilizator
        </button>

        {status && (
          <div className="p-4 border rounded bg-pink-100 dark:bg-pink-900/20 border-pink-300 text-pink-800 dark:text-pink-200">
            {status}
          </div>
        )}

        <div className="pt-8 space-y-4">
          <h2 className="text-lg font-semibold">📜 Jurnal mock transferuri</h2>
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
        </div>

        <div className="pt-10 space-y-4">
          <h2 className="text-lg font-semibold text-red-600">
            🔓 Exploatare reală (iframe malițios)
          </h2>
          <p className="text-sm text-gray-600">
            Un site malițios poate include un iframe sau formular ascuns care
            trimite cereri POST fără acordul utilizatorului:
          </p>

          <iframe
            src="http://localhost:4000/attacker.html"
            className="w-full border border-pink-300 rounded-md h-28"
          />

          <p className="text-xs text-gray-400 italic">
            Această iframe simulează un atac real CSRF care folosește
            autentificarea activă a victimei pentru a transfera bani în fundal.
          </p>
        </div>

        <div className="pt-10">
          <a href="/csrf" className="text-sm text-pink-600 hover:underline">
            ← Înapoi la pagina CSRF
          </a>
        </div>
      </main>
    </>
  );
}

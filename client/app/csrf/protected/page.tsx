"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CSRFProtectedPage() {
  const pathname = usePathname();
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [transferLog, setTransferLog] = useState<string[]>([]);

  const fetchTokenAndBalance = async () => {
    try {
      const [tokenRes, balanceRes] = await Promise.all([
        fetch("http://localhost:4000/api/csrf/token", {
          credentials: "include",
        }),
        fetch("http://localhost:4000/api/csrf/balance", {
          credentials: "include",
        }),
      ]);

      const tokenData = await tokenRes.json();
      const balanceData = await balanceRes.json();

      setCsrfToken(tokenData.token);
      setBalance(balanceData.balance);
    } catch (err) {
      console.error("Eroare la initializare", err);
    }
  };

  useEffect(() => {
    fetchTokenAndBalance();
  }, []);

  const handleTransfer = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/csrf/transfer-protected",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-csrf-token": csrfToken,
          },
          body: new URLSearchParams({ amount: "100" }),
        }
      );

      const data = await res.json();

      setStatus(data.message || "Transfer efectuat!");
      setTransferLog((prev) => [
        `✔️ Transfer protejat de 100 RON realizat. (${new Date().toLocaleTimeString()})`,
        ...prev,
      ]);
      fetchTokenAndBalance();
    } catch (err) {
      setStatus("❌ Transfer blocat. Token CSRF invalid sau lipsă.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 space-y-10">
        <h1 className="text-4xl font-bold text-green-600">✅ CSRF Protejat</h1>

        <p className="text-sm text-gray-600">
          Acest formular <strong>verifică tokenul CSRF</strong> înainte de a
          trimite cererea POST. Orice cerere fără un token valid este{" "}
          <strong>respinsă</strong> automat de server.
        </p>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 rounded-md">
          <p className="text-lg font-semibold">
            💰 Sold actual:{" "}
            <span className="text-green-700">{balance} RON</span>
          </p>
        </div>

        <button
          onClick={handleTransfer}
          disabled={!csrfToken}
          className="bg-green-600 text-white px-6 py-3 rounded hover:brightness-110 disabled:opacity-50"
        >
          Trimite 100 RON altui utilizator
        </button>

        {status && (
          <div className="p-4 border rounded bg-green-100 dark:bg-green-900/20 border-green-300 text-green-800 dark:text-green-200">
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
            🔐 De ce iframe-ul malițios NU mai funcționează?
          </h2>
          <p className="text-sm text-gray-600">
            Atacurile CSRF se bazează pe trimiterea automată a cookie-urilor.
            Totuși, acum cererea este respinsă pentru că{" "}
            <strong>lipsește tokenul CSRF</strong> — iar un site extern NU poate
            obține acest token.
          </p>

          <iframe
            src={`http://localhost:4000/attacker.html?target=${pathname}`}
            className="w-full border border-green-300 rounded-md h-28"
          />

          <p className="text-xs text-gray-400 italic">
            Acest iframe încearcă să trimită cererea, dar serverul o respinge
            automat pentru că lipsește tokenul CSRF valid.
          </p>
        </div>

        <div className="pt-10">
          <a href="/csrf" className="text-sm text-green-600 hover:underline">
            ← Înapoi la pagina CSRF
          </a>
        </div>
      </main>
    </>
  );
}

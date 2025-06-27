"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCartIcon className="h-7 w-7" />
            SecuShop Wallet
          </h1>
          <span className="text-xs">Cont utilizator: victim@secushop.test</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Transfer Fonduri (Protejat CSRF)
          </h2>
          <p className="text-green-100">
            Acest formular folosește token CSRF. Cererile neautorizate sunt
            blocate automat.
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
                <li className="font-semibold text-green-600">• Portofel</li>
                <li>• Setări</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Info */}
            <section className="bg-green-50 border border-green-300 text-green-800 p-4 rounded">
              <p>
                ✅ Cererile POST necesită tokenul CSRF unic generat per sesiune.
              </p>
            </section>

            {/* Balance and Button */}
            <div className="p-4 bg-white border border-neutral-200 rounded shadow flex justify-between items-center">
              <p className="text-lg font-semibold">
                💰 Sold curent:{" "}
                <span className="text-green-700">{balance} RON</span>
              </p>
              <button
                onClick={handleTransfer}
                disabled={!csrfToken}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium shadow disabled:opacity-50"
              >
                🔒 Trimite 100 RON
              </button>
            </div>

            {status && (
              <div className="p-4 border rounded bg-green-100 border-green-300 text-green-800">
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

            {/* Iframe Explanation */}
            <section className="bg-green-50 border border-green-300 p-6 rounded space-y-3">
              <h2 className="text-lg font-semibold text-green-700">
                🔐 De ce iframe-ul malițios NU mai funcționează?
              </h2>
              <p className="text-sm text-gray-700">
                Atacurile CSRF se bazează pe trimiterea automată a
                cookie-urilor. Dar acum cererea este respinsă pentru că{" "}
                <strong>lipsește tokenul CSRF</strong>, iar un site extern NU îl
                poate obține.
              </p>
              <iframe
                src={`http://localhost:4000/attacker.html?target=${pathname}`}
                className="w-full border border-green-300 rounded-md h-28"
              />
              <p className="text-xs text-gray-500 italic">
                Această iframe încearcă să trimită cererea, dar serverul o
                respinge automat.
              </p>
            </section>

            <div className="pt-6">
              <a
                href="/csrf"
                className="text-sm text-green-600 hover:underline"
              >
                ← Înapoi la pagina CSRF
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 text-neutral-500 text-xs text-center py-6">
        © 2025 SecuShop™ · Pagina demonstrativă CSRF Protejat
      </footer>
    </>
  );
}

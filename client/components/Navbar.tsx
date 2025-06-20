"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-accent text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors"
        >
          🔐 SecuShop
        </Link>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-medium">
          <Link
            href="/sql-injection"
            className="hover:text-red-200 transition-colors"
          >
            💉 SQL Injection
          </Link>
          <Link href="/xss" className="hover:text-yellow-200 transition-colors">
            🧨 XSS (Cross-site Scripting)
          </Link>
          <Link href="/csrf" className="hover:text-pink-200 transition-colors">
            🛡️ CSRF
          </Link>
          <Link
            href="/auth-bypass"
            className="hover:text-purple-200 transition-colors"
          >
            🚪 Auth Bypass
          </Link>
          <Link
            href="/open-redirect"
            className="hover:text-green-200 transition-colors"
          >
            🔁 Open Redirect
          </Link>
        </div>
      </div>
    </nav>
  );
}

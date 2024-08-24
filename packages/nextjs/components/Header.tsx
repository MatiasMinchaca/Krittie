"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  if (pathname === "/debug") return null;

  return (
    <>
      <header className="container flex justify-between py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Krittie</h1>
        </Link>
      </header>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
}

export default Header;

'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu"
import {getWLDSession} from "~~/app/actions"
import {useEffect} from 'react'


function Header() {
  const pathname = usePathname();
  if (pathname === "/debug" || pathname === "/") return null;

  const router = useRouter();

 /*  useEffect(() => {
    (async () => {
      const session = await getWLDSession();
      if (!session && pathname !== "/") {
        router.push('/');
      }
    })()
  }, []) */

  return (
    <>
      <header className="container flex justify-between py-4">
        <Link href="/">
          <h1 className="text-3xl font-bold font-krittie">Krittie</h1>
        </Link>
      </header>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
}

export default Header;

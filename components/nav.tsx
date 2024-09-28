'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname()
  
  const isHome = pathname === "/"
 
  return (
    <nav className="py-1 sticky top-0 bg-background flex items-center justify-between h-[3.25rem]">
      <Link className="text-xl font-bold" href="/">
        wallpal.
      </Link>
      <div className="text-sm font-medium space-x-1">
        <Link
          className={cn("px-3 rounded text-muted-foreground py-1.5 transition",{
            "bg-secondary shadow-sm border text-secondary-foreground": isHome,
          })}
          href="/"
        >
          Home
        </Link>
        <Link    className={cn("px-3 rounded text-muted-foreground py-1.5 transition",{
            "bg-secondary shadow-sm border text-secondary-foreground": !isHome,
          })} href="/gallery">
          Gallery
        </Link>
      </div>
    </nav>
  );
}

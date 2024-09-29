"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="py-1 z-50 sticky top-0 bg-background flex items-center justify-between h-[3.25rem]">
      <Link
        className="text-2xl font-bold transition-colors hover:text-primary"
        href="/"
      >
        wallpal.
      </Link>
      <div className="text-sm flex items-center font-medium gap-2">
        <a
          href="https://github.com/devRabbani/wallpal"
          target="_blank"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "mr-1",
          })}
          rel="noopener noreferrer"
        >
          <Github className="h-5 w-5" />
        </a>

        <Link
          className={cn(
            "px-3 rounded text-muted-foreground py-1.5 transition",
            {
              "bg-secondary shadow-sm border text-secondary-foreground":
                pathname === "/",
            }
          )}
          href="/"
        >
          Home
        </Link>
        <Link
          className={cn(
            "px-3 rounded text-muted-foreground py-1.5 transition",
            {
              "bg-secondary shadow-sm border text-secondary-foreground":
                pathname === "/gallery",
            }
          )}
          href="/gallery"
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}

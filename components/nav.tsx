import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="py-1 flex items-center justify-between h-[3.25rem]">
      <Link className="text-xl font-bold" href="/">
        wallpal.
      </Link>
      <div className="text-sm font-medium space-x-1">
        <Link
          className="px-3 bg-secondary rounded shadow-sm py-1.5"
          href="/login"
        >
          Home
        </Link>
        <Link className="px-3 py-1.5" href="/login">
          Gallery
        </Link>
      </div>
    </nav>
  );
}

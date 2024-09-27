import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="py-3 bg-muted flex items-center justify-between">
      <Link className="text-lg font-medium" href="/">
        Wallpal
      </Link>
      <div className="space-x-2 text-sm">
        <Link href="/login">Home</Link>
        <Link href="/login">Gallery</Link>
      </div>
    </nav>
  );
}

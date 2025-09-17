"use client";

import Link from "next/link";
import { useState } from "react";
// TODO: add theme switcher

export default function Navbar() {
  // toggle mobile
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 rounded-full bg-zinc-950 px-2 py-1 dark:bg-zinc-950">
      <nav className="relative flex items-center justify-center">
        {/* desktop links */}
        <div id="nav-links" className="flex flex-row gap-10 pl-4">
          <Link href="/gallery" className="block hover:underline">
            Browse gallery
          </Link>
        </div>
        {/* logo */}
        <div>
          <Link href="/" className="text-lg text-zinc-950 dark:text-zinc-50">
            Voile
          </Link>
        </div>
        {/* theme switcher + get started */}
        <div className="font-body flex flex-row gap-10 pr-1">
          {/* theme switcher */}
          {/* get started */}
          <button
            type="button"
            className="rounded-md bg-zinc-950 px-4 py-2 font-sans text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
          >
            <Link href="/auth/login">Get started</Link>
          </button>
        </div>
        {/* mobile menu */}
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 p-2"
            aria-label="Toggle Menu"
          >
            <span
              className={`h-0.5 w-6 bg-zinc-50 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-zinc-50 transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-zinc-50 transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      {/* mobile links */}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-zinc-950 p-4 flex flex-col gap-4 md:hidden">
          <Link href="/gallery" className="block text-zinc-50 hover:underline">
            Browse gallery
          </Link>
          <button className="rounded-md bg-zinc-950 px-4 py-2 font-sans text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950">
            <Link href="/auth/login">Get started</Link>
          </button>
          {/* Theme switcher placeholder */}
        </div>
      )}
    </header>
  );
}

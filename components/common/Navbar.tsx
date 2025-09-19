"use client";

import Link from "next/link";
import { useState } from "react";
// search sheet
import { SheetDemo } from "./SheetDemo";
// TODO: add theme switcher

export default function Navbar() {
  // toggle mobile
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-4 left-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 rounded-full bg-zinc-950/40 text-zinc-50 px-2 py-3 dark:bg-zinc-50/40 dark:text-zinc-950 backdrop-blur-md">
      <nav className="relative flex items-center justify-between mx-10">
        {/* desktop links */}
        <div id="nav-links" className="flex flex-row gap-10 pl-4">
          <Link
            href="/gallery"
            className="hidden md:block lg:block hover:underline"
          >
            Browse gallery
          </Link>
        </div>
        {/* logo */}
        <div>
          <Link
            href="/"
            className="text-xl  text-zinc-50 px-2 py-1 hover:underline dark:text-zinc-950"
          >
            Voile
          </Link>
        </div>
        {/* theme switcher + get started */}
        <div className="font-body hidden md:flex lg:flex flex-row gap-10 pr-1">
          {/* theme switcher */}
          {/* search */}
          <SheetDemo />
          {/* get started */}
          <button
            type="button"
            className="rounded-md
            hover:bg-zinc-600 hover:text-zinc-300 md:block bg-zinc-50 px-4 py-2 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <Link href="/auth/login">Get started</Link>
          </button>
        </div>
        {/* mobile menu */}
        {/* Mobile Hamburger */}
        <div className="md:hidden lg:hidden">
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
        <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-zinc-950 flex flex-col gap-6 py-6 px-4  md:hidden">
          <Link
            href="/gallery"
            className="block text-center text-zinc-50 hover:underline"
          >
            Browse gallery
          </Link>
          <div className="flex flex-row justify-between mx-3 gap-4">
            <button className="rounded-md w-full bg-zinc-50 px-4 py-2 font-sans text-zinc-950 dark:bg-zinc-50 dark:text-zinc-950">
              <Link href="/auth/login">Get started</Link>
            </button>
            {/* search */}
            <SheetDemo />
          </div>
          {/* Theme switcher placeholder */}
        </div>
      )}
    </header>
  );
}

"use client";

import Image from "next/image"; // image optimization
// i had imported voile lady in public, okay?

export default function GlassFile() {
  return (
    <section id="hero" className="relative z-20 h-[40%s]">
      <div
        id="hero wrapper"
        className="grid [grid-template-columns:repeat(10,1fr)] [grid-template-rows:repeat(10,1fr)]"
      >
        <span className="z-0 col-start-1 col-end-11 row-start-1 row-end-11 flex h-full justify-center md:block">
          <Image
            src="/images/hero.png"
            fill
            alt="Picture of a lady in monochrome."
            className="h-full w-full object-cover"
          />
        </span>

        <div
          id="overlay"
          className="z-2 col-start-1 col-end-6 row-start-1 row-end-11 backdrop-blur backdrop-filter"
        ></div>
        <p className="font-bebas place-self-left z-50 col-start-2 col-end-2 row-start-3 row-end-3 text-4xl font-medium text-gray-50 sm:text-5xl md:bottom-[35rem] md:left-[40%]">
          Voile
        </p>
        <p className="font-bebas place-self-left z-50 col-start-9 col-end-9 row-start-7 row-end-7 text-4xl font-medium text-gray-50 sm:text-5xl md:bottom-[35rem] md:left-[40%]">
          Lyon
        </p>
      </div>
    </section>
  );
}

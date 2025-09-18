import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-bg text-text py-10 my-20 sm:mx-10 flex flex-col"
    >
      {/* Quote */}
      <div
        id="quote-wrapper"
        className="border-b-2 border-night dark:border-pale py-4"
      >
        <div className="text-center py-5 px-3">
          <p className="font-bold text-3xl sm:text-5xl font-bebas">
            &quot;Just do it.&quot;
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        id="footer-content"
        className="flex flex-col sm:flex-row justify-between sm:justify-around gap-10 sm:gap-0 py-6 px-6 sm:px-0"
      >
        {/* Title + Socials */}
        <div id="title-socials-container" className="text-center sm:text-left">
          <div id="title-container" className="flex flex-col mb-4 sm:mb-0">
            <p className="font-medium text-3xl sm:text-4xl">Voile</p>
          </div>
          <div
            id="socials-container"
            className="flex flex-col font-body gap-2 items-center sm:items-start"
          >
            <Link href="https://www.linkedin.com/in/prajanya-subramanian">
              <p className="hover:font-bold text-footer-text hover:text-text">
                LinkedIn
              </p>
            </Link>
            <Link href="https://github.com/aigle-levant/voile-fashion">
              <p className="hover:font-bold text-footer-text hover:text-text">
                GitHub
              </p>
            </Link>
            <Link href="https://x.com/aiglelevant">
              <p className="hover:font-bold text-footer-text hover:text-text">
                X [Twitter]
              </p>
            </Link>
          </div>
        </div>

        {/* Links */}
        <div
          id="links-container"
          className="flex flex-col sm:flex-row justify-center sm:justify-around gap-8 sm:gap-14 text-center sm:text-left"
        >
          {/* Get Started */}
          <div id="get-started-links-container" className="flex flex-col">
            <p className="font-heading font-bold mb-2 text-xl sm:text-2xl">
              Get started
            </p>
            <div
              id="get-started-links"
              className="font-body flex flex-col gap-1"
            >
              <Link href="/auth/login">
                <p className="hover:font-bold">Login</p>
              </Link>
              <Link href="/auth/sign-up">
                <p className="hover:font-bold">Sign up</p>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div id="features-links-container" className="flex flex-col">
            <p className="font-heading font-bold mb-2 text-xl sm:text-2xl">
              Features
            </p>
            <div id="features-links" className="font-body flex flex-col gap-1">
              <Link href="/gallery">
                <p className="hover:font-bold">Gallery</p>
              </Link>
              <Link href="/profile">
                <p className="hover:font-bold">View profile</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        id="footer-bottom-content"
        className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 sm:px-10 mt-10 text-sm text-footer-text"
      >
        <div id="license">
          <p>© {new Date().getFullYear()} Voile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

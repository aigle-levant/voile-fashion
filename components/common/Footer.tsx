import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg text-text py-4 flex flex-col">
      <div
        id="quote-wrapper"
        className="border-b-2 border-night dark:border-pale py-4"
      >
        <div className="text-center py-5 px-3 ">
          <p className="font-bold text-4xl font-besley">
            &quot;Just do it.&quot;
          </p>
        </div>
      </div>
      <div id="footer-content" className="flex flex-row justify-around py-6">
        <div id="title-socials-container">
          <div id="title-container" className="flex flex-col">
            <p className="font-besley font-light mb-4 text-4xl">Voile</p>
          </div>
          <div id="socials-container" className="flex flex-col font-body gap-2">
            <Link href="https://www.linkedin.com/in/prajanya-subramanian">
              <p className="hover:font-bold text-footer-text hover:text-text">
                LinkedIn
              </p>
            </Link>
            <Link href="https://github.com/aigle-levant/doripomo">
              <p className="hover:font-bold text-footer-text hover:text-text">
                GitHub
              </p>
            </Link>
            <Link href="https://x.com/aiglelevant">
              <p className="hover:font-bold text-footer-text hover:text-text">
                X [also known as Twitter]
              </p>
            </Link>
          </div>
        </div>
        <div
          id="links-container"
          className="flex flex-row justify-around gap-14"
        >
          <div id="get-started-links-container" className="flex flex-col">
            <p className="font-heading font-bold mb-2 text-2xl">Get started</p>
            <div id="get-started-links" className="font-body flex flex-col">
              <Link href="/auth/login">
                <p className="hover:font-bold">Login</p>
              </Link>
              <Link href="/auth/sign-up">
                <p className="hover:font-bold">Sign up</p>
              </Link>
            </div>
          </div>
          <div id="features-links-container" className="flex flex-col">
            <p className="font-heading font-bold mb-2 text-2xl">
              Features we offer
            </p>
            <div id="features-links-container" className="flex flex-col">
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
      <div id="footer-bottom-content" className="flex flex-row px-10">
        <div id="license">
          <p>© {new Date().getFullYear()} Doripomo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

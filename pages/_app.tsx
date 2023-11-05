import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="header">
        <div className="navigation">
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>
        </div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

import type { AppProps } from "next/app";
import Head from "next/head";
import { Roboto } from '@next/font/google'

import "../styles/globals.css";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Alfr3d</title>
        <meta name="description" content="Alfr3d's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

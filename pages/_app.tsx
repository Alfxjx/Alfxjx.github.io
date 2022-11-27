import type { AppProps } from 'next/app'
import Head from 'next/head'
import localFont from '@next/font/local'

import '../styles/globals.css'

const SmileySansFont = localFont({ src: '../public/assets/fonts/SmileySans-Oblique.ttf' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Alfr3d</title>
        <meta name="description" content="Alfr3d's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={SmileySansFont.className}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

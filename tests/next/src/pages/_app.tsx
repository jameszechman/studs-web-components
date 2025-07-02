import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@studs/react/studs-base.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

import '../styles/globals.css';
import type { AppProps } from "next/app";
import Navigation from '../components/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '88px', paddingBottom: '40px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

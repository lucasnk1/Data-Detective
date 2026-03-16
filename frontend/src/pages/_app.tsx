import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { loadTheme } from "@/lib/theme";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // aplica tema salvo (se existir)
    try {
      loadTheme();
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <Head>
        <title>Data Detective</title>
        <meta name="description" content="Jogo educativo de investigação com SQL (PT-BR)" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

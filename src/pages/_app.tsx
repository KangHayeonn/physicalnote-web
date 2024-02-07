import { SWRConfig } from "swr";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  function fetcher(url: string) {
    return fetch(url).then((response) => response.json());
  }

  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher }}>
        <div className="flex flex-col w-full min-h-screen">
          <Head>
            <title>피지컬노트 : 감독</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            {/* <link rel="icon" href="" /> */}
          </Head>
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </SWRConfig>
    </RecoilRoot>
  );
}

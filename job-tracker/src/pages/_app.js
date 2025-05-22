// import "@/styles/globals.css";
import GlobalStyle from "@/styles/global";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <GlobalStyle />
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </>
  )
}

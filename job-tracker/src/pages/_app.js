import GlobalStyle from "@/styles/global";
import Head from "next/head";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Job Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Track your job applications and interviews with ease." />
        <meta name="keywords" content="job tracker, job applications, interview tracker, job search, career management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

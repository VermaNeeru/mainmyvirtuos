import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import apolloClient from '@/lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedPages = ["/forgot_password", "/login", "/forgot_username", "/testing"]; // Add the path of the excluded page(s) here

  const isLayoutEnabled = !excludedPages.includes(router.pathname);
  console.log(isLayoutEnabled)
  return (

    <>
      <ApolloProvider client={apolloClient}>
        {isLayoutEnabled ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </>


  )

}

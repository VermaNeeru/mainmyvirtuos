import Layout from '@/Component/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from '@/Component/Head'

export default function App({ Component, pageProps }: AppProps) {
  return (

    <>
      <Head Component={Component} pageProps={pageProps} />
      <Layout >
        <Component {...pageProps} />

      </Layout>
    </>

  )

}

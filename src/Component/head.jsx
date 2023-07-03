import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta property="og:image" content="https://myurl.com/ogImage.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
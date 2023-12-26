import Layout from '@/components/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState, useMemo } from 'react'; // Import useEffect and useMemo
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Use useMemo to memoize the excludedPages array
  const excludedPages = useMemo(
    () => ["/forgot_password", "/login", "/forgot_username", "/testing"],
    []
  );

  const isLayoutEnabled = !excludedPages.includes(router.pathname);

  const [authTokenChecked, setAuthTokenChecked] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (!authToken && !excludedPages.includes(router.pathname)) {
      router.push('/login');
    } else {
      setAuthTokenChecked(true);
    }
  }, [router.pathname, excludedPages, router]);

  if (!authTokenChecked) {
    return <p>Loading...</p>;
  }

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {isLayoutEnabled ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  );
}

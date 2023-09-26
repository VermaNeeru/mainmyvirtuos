// import Layout from '@/components/layout'
// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { useRouter } from "next/router";
// // import { ApolloProvider } from "@apollo/client";
// import apolloClient from '@/lib/apolloClient';
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import Cookies from 'js-cookie';
// export default function App({ Component, pageProps }: AppProps) {
//   const router = useRouter(); 
//   const excludedPages = ["/forgot_password", "/login", "/forgot_username", "/testing"]; // Add the path of the excluded page(s) here

//   const isLayoutEnabled = !excludedPages.includes(router.pathname);
//   console.log(isLayoutEnabled)
//  // Check if the auth token is present in cookies using js-cookie
//  const authToken = Cookies.get('authToken'); // Replace 'authToken' with your actual cookie name
//  console.log("from home",authToken)

//   const client = new ApolloClient({
//     uri: 'http://localhost:5000/graphql', // Replace with your GraphQL server URL
//     cache: new InMemoryCache(),
//   });

//   return (

//     <>
//       <ApolloProvider client={client}>
//       {/* <ApolloProvider client={apolloClient}> */}
//         {isLayoutEnabled ? (
//           <Layout>
//             <Component {...pageProps} />
//           </Layout>
//         ) : (
//           <Component {...pageProps} />
//         )}
//       </ApolloProvider>
//     </>


//   )

// }
import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'; // Import useEffect
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedPages = ["/forgot_password", "/login", "/forgot_username", "/testing"]; // Add the path of the excluded page(s) here

  const isLayoutEnabled = !excludedPages.includes(router.pathname);

  const [authTokenChecked, setAuthTokenChecked] = useState(false); // Track if the token check has been completed

  useEffect(() => {
    // Check if the auth token is present in cookies using js-cookie
    const authToken = Cookies.get('authToken'); // Replace 'authToken' with your actual cookie name

    // If there's no auth token and the current page is not excluded, redirect to login
    if (!authToken && !excludedPages.includes(router.pathname)) {
      router.push('/login'); // Redirect to the login page
    } else {
      setAuthTokenChecked(true); // Set the token check as complete
    }
  }, [router.pathname]); // Watch for changes to router.pathname

  // Render nothing until the authToken check is complete
  if (!authTokenChecked) {
    return <p>Loading...</p>
  }


  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // Replace with your GraphQL server URL
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

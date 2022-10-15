import NoSSR from 'react-no-ssr';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <Component {...pageProps} />
    </NoSSR>
  );
}

export default MyApp;

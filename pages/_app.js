import NoSSR from 'react-no-ssr';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from 'theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${(props) => props.theme.colors.light};
    background: ${(props) => props.theme.colors.sky};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NoSSR>
        <GlobalStyle />
        <Component {...pageProps} />
      </NoSSR>
    </ThemeProvider>
  );
}

export default MyApp;

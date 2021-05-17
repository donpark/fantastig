import Head from "next/head";
import type { AppProps /*, AppContext as NextAppContext */ } from "next/app";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { App } from "models/App";
import { AppProvider } from "models/AppContext";
import { getLayout as getSiteLayout } from "components/SiteLayout";
import defaultTheme from "components/DefaultTheme";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
    const getLayout = Component["getLayout"] || getSiteLayout || ((page: any) => page);
    const page = getLayout(<Component {...pageProps} />);
    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <AppProvider>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    {page}
                </ThemeProvider>
            </AppProvider>
        </>
    );
}

export default MyApp;

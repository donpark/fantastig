import React from "react";

import { Header } from "components/Header";

interface Props {
    pageProps: any;
}

const SiteLayout: React.FC<Props> = ({ pageProps, children }) => {
    const { pageTitle } = pageProps;
    return (
        <>
            <Header title={pageTitle} />
            <main>{children}</main>
        </>
    );
};

export default SiteLayout;

// HACK: this is used to share same SiteLayout instance across pages.
export const getLayout = (page: any) => {
    return <SiteLayout pageProps={page.props}>{page}</SiteLayout>;
};

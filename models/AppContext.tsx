import { createContext, useContext, useEffect } from "react";
import { makeObservable, observable } from "mobx";
import { User } from "next-auth";

import { App } from "models/App";
import { Character } from "models/Character";

import { AuthProvider } from "components/Auth";

export const AppContext = createContext<App>(null);

interface Props {}

export const AppProvider: React.FC<Props> = ({ children }) => {
    const app = new App();
    return (
        <AppContext.Provider value={app}>
            {/* <AuthProvider session={pageProps.session}> */}
            {children}
            {/* </AuthProvider> */}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}

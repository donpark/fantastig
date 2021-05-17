import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { signIn, signOut, useSession, getSession, Provider } from "next-auth/client";

import { Avatar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

interface Props {}

const twitterStyle = { color: "white", backgroundColor: "#55ACEE" };

export const NextAuthUI: React.FC<Props> = observer((props) => {
    const [nextSession, loading] = useSession();
    // if (nextSession) {
    //     console.log("Auth rendering", nextSession.user);
    // }
    const onSignin = () => {
        signIn("twitter");
    };
    const onSignout = () => {
        signOut();
    };
    return (
        <>
            {!nextSession && !loading && (
                <IconButton style={twitterStyle} onClick={onSignin}>
                    <TwitterIcon />
                    <Typography>Sign in with Twitter</Typography>
                </IconButton>
            )}
            {nextSession?.user && (
                <Button style={twitterStyle} onClick={onSignout}>
                    <TwitterIcon />
                    <span style={{ textTransform: "initial", paddingLeft: "0.5em", paddingRight: "0.5em" }}>
                        Log out @{nextSession.user["nick"]}
                    </span>
                    <Avatar
                        alt={nextSession.user.name}
                        src={nextSession.user.image}
                        style={{ width: "24px", height: "24px" }}
                    />
                </Button>
            )}
        </>
    );
});

export const Auth = NextAuthUI;

interface AuthProviderProps {
    session: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = observer(({ session, children }) => {
    return <Provider session={session}> {children} </Provider>;
});

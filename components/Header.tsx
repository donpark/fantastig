import React, { useContext, useRef } from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import { Auth } from "components/Auth";

interface Props {
    title: string;
}

export const Header: React.FC<Props> = observer(({ title }) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Link href="/">
                    <a>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            FantastiG
                        </Typography>
                    </a>
                </Link>
                {/* <Auth /> */}
            </Toolbar>
        </AppBar>
    );
});

import type { AppProps /*, AppContext as NextAppContext */ } from "next/app";
import Head from "next/head";
import { observer } from "mobx-react";

import { Box, Button, Grid, Toolbar } from "@material-ui/core";

import { useAppContext } from "models/AppContext";
// import { ICharacter } from "models/Character";
// import { characterStore } from "models/CharacterStore";

import { CharacterList } from "components/CharacterList";
import { CharacterMaker } from "components/CharacterMaker";

import styles from "../styles/Home.module.css";
import { useEffect } from "react";

interface Props {
    // characters: ICharacter[];
}

const Home: React.FC<Props> = observer(({}) => {
    const app = useAppContext();
    useEffect(() => {
        if (app.characters.length === 0) {
            app.loadCharacters();
        }
    }, [app.characters]);
    return (
        <>
            <Head>
                <title>FantastiG</title>
                <meta name="description" content="FantastiG character manager" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container direction="column" spacing={1}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    spacing={1}
                    style={{ padding: "2em", justifyContent: "flex-end" }}
                >
                    <CharacterMaker />
                </Grid>
                <Grid item xs={12} container direction="row" spacing={4} style={{ justifyContent: "space-around" }}>
                    <CharacterList characters={app.characters} />
                </Grid>
            </Grid>
        </>
    );
});

export default Home;

// export async function getServerSideProps(context: any) {
//     const characters = (await characterStore.list()).filter((item) => item.owner === "testuser");
//     return {
//         props: {
//             characters,
//         },
//     };
// }

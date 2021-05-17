import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { observer } from "mobx-react";

import { Box, Button, ButtonGroup, Container, Grid, Toolbar } from "@material-ui/core";

import { Character, ICharacter } from "models/Character";

import { AlertDialog } from "components/AlertDialog";
import { CharacterSheet } from "components/CharacterSheet";
import { useAppContext } from "models/AppContext";
import { useEffect } from "react";

interface Props {
    // character: ICharacter;
}

const CharacterPage: React.FC<Props> = observer(({}) => {
    const app = useAppContext();
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState<Character>(null);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    useEffect(() => {
        app.loadCharacters().then(() => {
            if (id) {
                const ch = app.getCharacter(id as string);
                if (ch) {
                    setCharacter(ch);
                }
            }
        });
    }, [id]);

    // TODO: set true if current user is owner, false otherwise.
    const editable = true;
    const desc = characterDescription(character);
    const title = `FantastiG${desc ? ` | ${desc}` : ""}`;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {character && (
                <Container>
                    <Grid container direction="column" spacing={1}>
                        <ActionBar character={character} editable={editable} />
                        <CharacterSheet character={character} editable={editable} />
                    </Grid>
                </Container>
            )}
        </>
    );
});

export default CharacterPage;

function characterDescription(character?: Character) {
    if (character) {
        const { name, race, sex, clazz } = character;
        return `${name || "Unnamed"} ${sex} ${race} ${clazz}`;
    } else {
        return "";
    }
}

interface ActionBarProps {
    character: Character;
    editable: boolean;
}

const ActionBar: React.FC<ActionBarProps> = observer(({ character, editable }) => {
    const router = useRouter();
    const app = useAppContext();
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

    const handleSave = async () => {
        app.saveCharacter(character);
    };
    const handleDelete = async () => {
        setDeleteAlert(true);
    };
    const handleDeleteConfirm = async (ok) => {
        if (ok) {
            await app.removeCharacter(character.id);
            router.replace("/");
        } else {
            setDeleteAlert(false);
        }
    };
    const desc = character.name
        ? `character named ${character.name}`
        : `unnamed ${character.sex} ${character.race} ${character.clazz} character`;
    return (
        <Grid
            item
            xs={12}
            container
            direction="row"
            spacing={2}
            style={{ margin: "1em 0", justifyContent: "flex-end" }}
        >
            <ButtonGroup variant="text" color="primary">
                <Button color="primary" aria-label="save changes" disabled={!editable} onClick={handleSave}>
                    Save Changes
                </Button>
                <Button color="primary" aria-label="delete character" disabled={!editable} onClick={handleDelete}>
                    Delete Character&hellip;
                </Button>
                <AlertDialog
                    open={deleteAlert}
                    title="Delete Character"
                    content={`Delete ${desc}?`}
                    okText="Delete"
                    onClose={handleDeleteConfirm}
                />
            </ButtonGroup>
        </Grid>
    );
});

// export async function getServerSideProps(context: any) {
//     const id = context.params.id;
//     const character = await characterStore.get(id);
//     return {
//         props: {
//             character,
//         },
//     };
// }

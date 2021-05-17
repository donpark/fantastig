import { useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react";

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Character, ICharacter } from "models/Character";
import { generateCharacter } from "models/Generator";

import { CharacterSheet } from "components/CharacterSheet";
import { useAppContext } from "models/AppContext";

interface Props {}

export const CharacterMaker: React.FC<Props> = observer(({}) => {
    const app = useAppContext();
    const [open, setOpen] = useState<boolean>(false);
    const [character, setCharacter] = useState<Character>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        const data = generateCharacter();
        data.owner = "testuser";
        setCharacter(new Character(data));
        setOpen(true);
    };
    const handleCreate = async () => {
        await app.addCharacter(character.toJSON());
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" aria-label="create new character" onClick={handleOpen}>
                Create character&hellip;
            </Button>
            {character && (
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleCancel}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {`Give this character a name to breathe new life into ${
                            character.sex === "Male" ? "him" : "her"
                        }.`}
                    </DialogTitle>
                    <DialogContent>
                        <CharacterSheet character={character} editable={true} />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} color="primary" disabled={!character?.name}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
});

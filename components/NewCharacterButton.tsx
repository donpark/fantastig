import { useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react";

import { Button, GridList, GridListTile, ListSubheader } from "@material-ui/core";

import { Character, ICharacter } from "models/Character";
import { generateCharacter } from "models/Generator";

import { CharacterCard } from "components/CharacterCard";
import { useAppContext } from "models/AppContext";

interface Props {}

export const NewCharacterButton: React.FC<Props> = observer(({}) => {
    const app = useAppContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [character, setCharacter] = useState<Character>(null);

    const openWizard = () => {
        const data = generateCharacter();
        data.owner = "testuser";
        setCharacter(new Character(data));
        setIsOpen(true);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" aria-label="create new character" onClick={openWizard}>
                Create character&hellip;
            </Button>
        </div>
    );
});

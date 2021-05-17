import Link from "next/link";
import { observer } from "mobx-react";

import { GridList, GridListTile, IconButton, ListSubheader } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import type { ICharacter } from "models/Character";
import { CharacterCard } from "components/CharacterCard";

interface Props {
    characters: ICharacter[];
}

export const CharacterList: React.FC<Props> = observer(({ characters }) => {
    const rootStyle = {
        display: "flex",
        // flexWrap: "wrap",
        justifyContent: "space-around",
    };

    const gridListStyle = {
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
    };
    return (
        <div style={rootStyle}>
            <GridList style={gridListStyle}>
                <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
                    <ListSubheader component="div">&nbsp;</ListSubheader>
                </GridListTile>
                {characters.map((character) => (
                    <Link href={`/character/${character.id}`} key={character.id}>
                        <a>
                            <CharacterCard
                                character={character}
                                actionIcon={
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                }
                            />
                        </a>
                    </Link>
                ))}
            </GridList>
        </div>
    );
});

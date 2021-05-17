import React, { useContext, useRef } from "react";
import { observer } from "mobx-react";

import { Box, Card, GridListTile, GridListTileBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import type { ICharacter } from "models/Character";
import { DEFAULT_PORTRAIT } from "models/config";

interface Props {
    character: ICharacter;
    actionIcon?: React.ReactNode;
}

export const CharacterCard: React.FC<Props> = observer(({ character, actionIcon }) => {
    const { id, name, race, sex, clazz, stats, image } = character;
    const title = name || "Unnamed";
    const desc = `${sex} ${race} ${clazz}`;
    const alt = `${title} ${desc}`;
    return (
        <GridListTile key={id}>
            <img
                src={image || DEFAULT_PORTRAIT}
                alt={alt}
                style={{
                    width: "100%",
                }}
            />
            <GridListTileBar title={title} subtitle={<span>{desc}</span>} actionIcon={actionIcon} />
        </GridListTile>
    );
});

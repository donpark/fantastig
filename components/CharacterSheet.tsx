import React, { useContext, useRef } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import { useAppContext } from "models/AppContext";
import type { Character } from "models/Character";
import { knownRaces, knownSexes, knownClasses, randomPortraitURL, availablePortraitURLs } from "models/Generator";
import { DEFAULT_PORTRAIT } from "models/config";

import { CharacterCard } from "components/CharacterCard";

interface Props {
    character: Character;
    editable: boolean;
}

export const CharacterSheet: React.FC<Props> = observer(({ character, editable }) => {
    const router = useRouter();
    const app = useAppContext();
    const { name, race, sex, clazz, stats, image } = character;
    const inputProps = {
        readOnly: !editable,
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editable) {
            character.setName(event.target.value);
        }
    };
    const handleRaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editable) {
            character.setRace(event.target.value);
            character.setImage(randomPortraitURL(character));
        }
    };
    const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editable) {
            character.setSex(event.target.value);
            character.setImage(randomPortraitURL(character));
        }
    };
    const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editable) {
            character.setClass(event.target.value);
        }
    };
    const randomPortrait = () => {
        if (editable) {
            character.setImage(randomPortraitURL(character));
        }
    };
    const prevPortrait = () => {
        const portraits = availablePortraitURLs(character);
        const curIndex = portraits.indexOf(character.image);
        if (curIndex !== -1) {
            const newIndex = (curIndex + portraits.length - 1) % portraits.length;
            console.log("prevPortrait", { curIndex, newIndex });
            character.setImage(portraits[newIndex]);
        }
    };
    const nextPortrait = () => {
        const portraits = availablePortraitURLs(character);
        const curIndex = portraits.indexOf(character.image);
        if (curIndex !== -1) {
            const newIndex = (curIndex + 1) % portraits.length;
            character.setImage(portraits[(curIndex + 1) % portraits.length]);
        }
    };

    return (
        <Grid
            item
            xs={12}
            container
            direction="row"
            spacing={1}
            style={{ margin: "1em 0", justifyContent: "space-between" }}
        >
            <Grid item xs={4} container direction="column" spacing={3} style={{ justifyContent: "flex-start" }}>
                <Box component="div" style={{ alignItems: "center", justifyContent: "space-between" }}>
                    <CharacterCard character={character} />
                    {editable && (
                        <div style={{ textAlign: "center" }}>
                            <ButtonGroup size="small">
                                <IconButton color="primary" aria-label="previous portrait" onClick={prevPortrait}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="change portrait" onClick={randomPortrait}>
                                    <CasinoIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="next portrait" onClick={nextPortrait}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </ButtonGroup>
                        </div>
                    )}
                </Box>
            </Grid>
            <Grid item xs={8} container direction="column" spacing={3} style={{ justifyContent: "flex-start" }}>
                <Grid item container direction="row">
                    <Grid item xs={6} container direction="column">
                        <h2>Character</h2>
                        <Box component="div" style={{ margin: "0 0 2em 0" }}>
                            <FormControl>
                                <TextField
                                    label="Name"
                                    defaultValue={name}
                                    InputProps={inputProps}
                                    placeholder="Character name"
                                    onChange={handleNameChange}
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box component="div" style={{ margin: "1em 0" }}>
                            <FormControl>
                                <InputLabel id="race-label">Race</InputLabel>
                                <Select
                                    labelId="race-label"
                                    value={race}
                                    onChange={handleRaceChange}
                                    readOnly={!editable}
                                >
                                    {knownRaces.map((value) => (
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box component="div" style={{ margin: "1em 0" }}>
                            <FormControl>
                                <InputLabel id="sex-label">Sex</InputLabel>
                                <Select labelId="sex-label" value={sex} onChange={handleSexChange} readOnly={!editable}>
                                    {knownSexes.map((value) => (
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box component="div" style={{ margin: "1em 0" }}>
                            <FormControl>
                                <InputLabel id="class-label">Class</InputLabel>
                                <Select
                                    labelId="class-label"
                                    value={clazz}
                                    onChange={handleClassChange}
                                    readOnly={!editable}
                                >
                                    {knownClasses.map((value) => (
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6} container direction="column">
                        <h2>Stats</h2>
                        <Box component="div" key="str" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Strength"
                                defaultValue={stats["STR"]}
                                InputProps={inputProps}
                            />
                        </Box>
                        <Box component="div" key="dex" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Dexterity"
                                defaultValue={stats["DEX"]}
                                InputProps={inputProps}
                            />
                        </Box>
                        <Box component="div" key="con" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Constitution"
                                defaultValue={stats["CON"]}
                                InputProps={inputProps}
                            />
                        </Box>
                        <Box component="div" key="int" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Intelligence"
                                defaultValue={stats["INT"]}
                                InputProps={inputProps}
                            />
                        </Box>
                        <Box component="div" key="wis" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Wisdom"
                                defaultValue={stats["WIS"]}
                                InputProps={inputProps}
                            />
                        </Box>
                        <Box component="div" key="cha" style={{ margin: "0.5em 0" }}>
                            <TextField
                                type="number"
                                label="Charisma"
                                defaultValue={stats["CHA"]}
                                InputProps={inputProps}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

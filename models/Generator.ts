
import { ulid } from "ulid";
import type { ICharacter } from "models/Character";

export function generateCharacter(): ICharacter {
    // TODO: support race/class/stat constraints.
    const character: ICharacter = {
        id: `c${ulid()}`,
        name: '',
        race: rollArray(knownRaces),
        sex: rollArray(knownSexes),
        clazz: rollArray(knownClasses),
        stats: {
            STR: rollStat(),
            DEX: rollStat(),
            CON: rollStat(),
            INT: rollStat(),
            WIS: rollStat(),
            CHA: rollStat(),
        },
    };
    character.image = randomPortraitURL(character);
    return character;
}

function diceRoll(sides: number) {
    return Math.ceil(Math.random() * sides);
}

function diceRolls(sides: number, count: number) {
    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(diceRoll(sides));
    }
    return rolls;
}

function sumOfArray(values: number[]) {
    return values.reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
}

function rollArray(values: any[]) {
    return values[Math.floor(Math.random() * values.length)];
}

export function rollStat() {
    // Uses sum of top three results from 6-sided dice rolled 4 times.
    const rolls = diceRolls(6, 4);
    return sumOfArray(rolls.slice().sort((a, b) => b - a).slice(0, 3));
}

export const knownRaces = [
    "Dwarf",
    "Elf",
    "Halfling",
    "Human",
    "Tiefling",
];

export const knownSexes = [
    "Male",
    "Female",
]

export const knownClasses = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
]

function buildPortraitURL(race: string, sex: string, sequence: number): string {
    return `/img/portraits/${race}/${sex}/${portraitRacePrefix[race]}${portraitSexPrefix[sex]}_0${sequence}.png`;
}

export function randomPortraitURL(c: ICharacter) {
    const dice = diceRoll(4);
    return buildPortraitURL(c.race, c.sex, dice);
}

export function availablePortraitURLs(c: ICharacter) {
    const urls: string[] = [];
    for (let i = 1; i <= 4; i++) {
        urls.push(buildPortraitURL(c.race, c.sex, i));
    }
    return urls;
}

const portraitRacePrefix = {
    Dwarf: 'D',
    Elf: 'E',
    Halfling: 'HL',
    Human: 'H',
    Tiefling: 'T',
};

const portraitSexPrefix = {
    Male: 'M',
    Female: 'F',
}

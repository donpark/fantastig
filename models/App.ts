import { User } from "next-auth";
import { action, makeObservable, observable, toJS } from "mobx";

import { Character, ICharacter } from "models/Character";
import { generateCharacter } from "models/Generator";
import { createCharacter, deleteCharacter, getCharacters, updateCharacter } from "./API";

export class App {
    user: User | null;
    characters: Character[] = [];

    constructor() {
        makeObservable(this, {
            user: observable,
            characters: observable,

            setUser: action,
            setCharacters: action,
            saveCharacter: action,
            addCharacter: action,
            removeCharacter: action,
        });
    }

    setUser(user: User | null) {
        this.user = user;
    }

    setCharacters(characters: Character[]) {
        this.characters = characters;
    }

    async loadCharacters() {
        const chars = await getCharacters("testuser");
        this.setCharacters(chars.map((data) => new Character(data)));
    }

    getCharacter(id: string) {
        if (!id) return null;
        return this.characters.find(item => item.id === id);
    }

    async addCharacter(character: ICharacter) {
        character = await createCharacter(character);
        this.characters = [new Character(character), ...this.characters];
    }

    async removeCharacter(id: string) {
        await deleteCharacter(id);
        const index = this.characters.findIndex((c) => c.id === id);
        if (index !== -1) {
            this.characters = [...this.characters.slice(0, index), ...this.characters.slice(index + 1)];
        }
    }

    async saveCharacter(ch: Character) {
        console.log('saveCharacter', { ch: toJS(ch) });
        if (!ch.modified) {
            console.log('not modified')
            return;
        }
        await updateCharacter(ch.id, ch.toJSON());
        ch.clearModified();
    }
}

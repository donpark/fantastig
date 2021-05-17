import { action, makeObservable, observable } from "mobx";
import { User } from "next-auth";

export type StatType = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface ICharacter {
    id: string;   // character id
    name: string;
    race: string;
    sex: string;
    clazz: string;
    stats: Record<StatType, number>;
    image?: string;  // portrait URL 
    owner?: string; // user id
}

export class Character implements ICharacter {
    id: string;   // character id
    name: string;
    race: string;
    sex: string;
    clazz: string;
    stats: Record<StatType, number>;
    image?: string;  // portrait URL 
    owner?: string; // user id

    modified: boolean;

    constructor(data: ICharacter) {
        Object.assign(this, data);
        this.modified = false;

        makeObservable(this, {
            name: observable,
            race: observable,
            sex: observable,
            clazz: observable,
            stats: observable,
            image: observable,
            owner: observable,

            setName: action,
            setRace: action,
            setSex: action,
            setClass: action,
            setStat: action,
            setImage: action,
            setOwner: action,
            clearModified: action,
        });
    }

    setName(name: string) {
        this.name = name;
        this.modified = true;
    }

    setRace(race: string) {
        this.race = race;
        this.modified = true;
    }

    setSex(sex: string) {
        this.sex = sex;
        this.modified = true;
    }

    setClass(clazz: string) {
        this.clazz = clazz;
        this.modified = true;
    }

    setStat(type: StatType, value: number) {
        this.stats[type] = value;
        this.modified = true;
    }

    setImage(image: string) {
        this.image = image;
        this.modified = true;
    }

    setOwner(owner: string) {
        this.owner = owner;
        this.modified = true;
    }

    clearModified() {
        this.modified = false;
    }

    toJSON(): any {
        const { id, name, race, sex, clazz, stats, image, owner } = this;
        return {
            id, name, race, sex, clazz, stats, image, owner
        }
    }
}

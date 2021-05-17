import { promises as fs, mkdirSync } from "fs";
import path from "path";
import type { IStore } from "models/Store";

class FileSystemStore<T = any> implements IStore<T> {
    dir: string;

    constructor(file: string) {
        this.dir = path.resolve(file);

        // TODO: if exists, ensure it's a directory

        mkdirSync(this.dir, { recursive: true });
    }

    async close(): Promise<void> {
        // nothing to do
    }

    async list(): Promise<T[]> {
        const fileNames = await fs.readdir(this.dir);
        const fileTexts = await Promise.all(fileNames.map((fileName) => {
            const file = path.resolve(this.dir, fileName);
            return fs.readFile(file, { encoding: 'utf8' });
        }));
        return fileTexts.map(fileText => JSON.parse(fileText) as T);
    }

    async get(key: string): Promise<T> {
        const file = this.dataFile(key);
        const text = await fs.readFile(file, { encoding: 'utf8' });
        return JSON.parse(text) as T;
    }

    async put(key: string, value: T): Promise<T> {
        const file = this.dataFile(key);
        await fs.writeFile(file, JSON.stringify(value), { encoding: 'utf8' });
        return value;
    }

    async del(key: string): Promise<void> {
        const file = this.dataFile(key);
        return fs.unlink(file);
    }

    private dataFile(key: string): string {
        return path.resolve(this.dir, `${key}.json`);
    }
}


export function getStore<T = any>(file: string): IStore<T> {
    return new FileSystemStore<T>(file);
}

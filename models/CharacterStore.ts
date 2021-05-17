import type { ICharacter } from "models/Character";
import { getStore } from "models/FileSystemStore";

export const characterStore = getStore<ICharacter>("./.data/chars");

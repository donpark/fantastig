import type { ICharacter } from "models/Character";

export async function getCharacters(user?: string): Promise<ICharacter[]> {
    const url = new URL("/api/character", location.href);
    if (user) {
        url.searchParams.append('user', user);
    }
    return fetch(url.href).then(res => res.json())
}

export async function createCharacter(data: ICharacter): Promise<ICharacter> {
    return fetch(`/api/character`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(res => res.json())
}

export async function getCharacter(id: string): Promise<ICharacter> {
    return fetch(`/api/character/${id}`).then(res => res.json())
}

export async function updateCharacter(id: string, data: ICharacter): Promise<ICharacter> {
    return fetch(`/api/character/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }).then(res => res.json())
}

export async function deleteCharacter(id: string): Promise<boolean> {
    return fetch(`/api/character/${id}`, {
        method: 'DELETE',
    }).then(res => res.ok)
}

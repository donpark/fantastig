## Character Data

### CharacterData

    id: string;
    name: string;
    race: string;
    clazz: string;
    stats: Record<StatType, number>;
    owner: string;

## Character API

### `GET /api/character`

Returns array of all characters. Public.

### `GET /api/character?user={user_id}`

Returns array of all characters belonging to specified user. Public.

### `POST /api/character`

Create new character. Request body needs to character data encoded as JSON.

### `GET /api/character/{character_id}`

Get a character's data. Public.

### `POST /api/character/{character_id}`

Placeholder for character data actions. Not implemented.

### `PUT /api/character/{character_id}`

Update a character's data. Requester must be character owner.

### `DELETE /api/character/{character_id}`

Delete a character. Requester must be character owner.

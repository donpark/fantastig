import type { NextApiRequest, NextApiResponse } from 'next';

import { ICharacter } from 'models/Character';
import { characterStore } from "models/CharacterStore";

// import { getRequestAuth } from 'models/NextAuthServer';

interface UserResponse {

}

export default async (req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
    const {
        query: { user },
    } = req;

    // const auth = await getRequestAuth(req);
    // if (!auth) {
    //     res.status(401);
    //     return
    // }

    switch (req.method) {
        case 'GET':
            try {
                let chars = await characterStore.list();
                if (user) {
                    // filter if user-specific
                    chars = chars.filter(char => char.owner === user);
                }
                res.json(chars);
            } catch (err) {
                console.error(err);
                throw new Error(`character save error: ${err}`);
            }
            break;
        case 'POST':
            if (typeof req.body !== "string") {
                throw new Error("invalid request body");
            }
            const data = JSON.parse(req.body) as ICharacter;
            const result = await characterStore.put(data.id, data);
            res.json(result);
            break;
        case 'PUT':
        case 'DELETE':
            res.status(401);
            break;
    }
}

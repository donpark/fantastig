import type { NextApiRequest, NextApiResponse } from "next";

import { ICharacter } from "models/Character";
import { characterStore } from "models/CharacterStore";

// import { getRequestAuth } from 'models/NextAuthServer';

interface UserResponse { }


export default async (req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
    const {
        query: { id },
    } = req;

    // const auth = await getRequestAuth(req);
    // if (!auth) {
    //     res.status(401);
    //     return
    // }

    if (!id) {
        res.status(400);
        return;
    }


    try {
        switch (req.method) {
            case "GET":
                res.json(await characterStore.get(id as string));
                break;
            case "PUT":
                if (typeof req.body !== "string") {
                    throw new Error("invalid request body");
                }
                // TODO: check owner match
                const data = JSON.parse(req.body) as ICharacter;
                const result = await characterStore.put(data.id, data);
                res.json(result);
            case "POST":
                // not implemented
                res.status(501);
                break;
            case "DELETE":
                // TODO: check owner match
                await characterStore.del(id as string);
                res.json({});
                break;
        }
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

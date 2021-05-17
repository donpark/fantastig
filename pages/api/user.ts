import type { NextApiRequest, NextApiResponse } from 'next';

// import { getRequestAuth } from 'models/NextAuthServer';

interface UserResponse {

}

export default async (req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
    const {
        query: { uid },
    } = req;

    // const auth = await getRequestAuth(req);
    // if (!auth) {
    //     res.status(401);
    //     return
    // }

    switch (req.method) {
        case 'GET':
        case 'POST': 
    }
    if (req.method !== 'POST') {
        throw new Error('unsupported method');
    }
    if (typeof req.body !== 'string') {
        throw new Error('invalid request body');
    }

    res.json({
        test: 'hello',
    })
}
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/Users';

export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const allUser = await User.find({}).select("_id email firstname lastname profilePic");
        res.status(200).json({ allUser });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}

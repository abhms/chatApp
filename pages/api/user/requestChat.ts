import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/Users';
import Approved from '@/models/Approved';

export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const secretKey = process.env.JWT_SECRET!;

            const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: 'Authorization token missing' });
            }
            const decodedToken = jwt.verify(token, secretKey) as { userId: string };

            const user = await User.findById(decodedToken.userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const allApp = await Approved.find({ sender: user.email })
            res.status(201).json(allApp)
        } catch (error) {
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    } else if (req.method === 'POST') {

        try {
            const { receiver, status } = req.body;

            const secretKey = process.env.JWT_SECRET!;

            const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: 'Authorization token missing' });
            }

            const decodedToken = jwt.verify(token, secretKey) as { userId: string };

            const user = await User.findById(decodedToken.userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const existingApproved = await Approved.findOne({ receiver: receiver, sender: user.email });

            if (existingApproved) {
                existingApproved.status = status;
                await existingApproved.save();
                res.status(200).json(existingApproved);
            } else {
                const newApproved = new Approved({
                    sender: user.email,
                    receiver: receiver,
                    status: status,
                });
                await newApproved.save();
                res.status(201).json(newApproved);
            }
        } catch (error) {
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

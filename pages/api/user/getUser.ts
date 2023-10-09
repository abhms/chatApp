import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/Users';


export default async function getUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

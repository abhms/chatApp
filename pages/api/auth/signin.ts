import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    console.log(req.body, "resss");

    if (req.method === 'POST') {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Incorrect Email Address' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '8h',
      });

      console.log(token, 'tototoo');
      res.status(200).json({ message: 'You are now logged in', token });
    } else {
      // Return 405 Method Not Allowed for non-POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

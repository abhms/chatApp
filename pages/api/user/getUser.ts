import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/Users';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const secretKey = process.env.JWT_SECRET!;
    
    // Get user ID from token or any other authentication mechanism
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decodedToken = jwt.verify(token, secretKey) as { userId: string };

    if (req.method === 'GET') {
      // GET method for fetching user details
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user });
    } else if (req.method === 'POST') {
      // POST method for updating user details
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user details based on the request body
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;

      // If there is a new profilePic, update it
      // if (req.file) {
      //   user.profilePic = req.file.path; // Update with the path to the uploaded file
      // }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'User details updated successfully', user });
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

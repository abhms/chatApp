import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/Users';

const secretKey = process.env.JWT_SECRET!; 

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { firstname,lastname, email, password ,fileUrl} = req.body;

    const match = await User.findOne({ email });
    if (match) {
      return res.status(409).json({message:'User already exists'});
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hash,
      profilePic:fileUrl
    });

    await newUser.save();
    const token = jwt.sign({  userId: newUser._id}, secretKey, {
      expiresIn: '24h',
    });
   
    res.status(200).json({ message: 'User created successfully' ,token});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

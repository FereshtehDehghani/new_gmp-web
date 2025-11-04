import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export  function storageTokenhandler(req: NextApiRequest, res: NextApiResponse) {
  // Assume user authentication is successful and a JWT is generated
  const token = 'your_jwt_token_here';

  // Set the cookie with the JWT
  res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600 // 1 hour expiration
  }));

  res.status(200).json({ message: 'Logged in successfully!' });
}



export  function retrievingTokanHandler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the cookie from the request
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  // Check for the token's existence
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed! No token provided.' });
  }

  // Here, add logic to verify the token's validity
  res.status(200).json({ message: 'Token verified successfully!', token });
}
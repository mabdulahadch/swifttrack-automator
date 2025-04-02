import { generateJWT, verifyJWT } from './auth-utils';
import { cookies } from 'next/headers';

export const generateToken = (userId: string) => {
  return generateJWT(userId);
};

export const verifyToken = async () => {
  const cookieStore = await cookies(); // Await the cookies() function
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    return verifyJWT(token);
  } catch (error) {
    return null;
  }
};

export const getUserFromToken = async () => {
  const user = await verifyToken(); // Ensure we await the async function
  return user || null;
};

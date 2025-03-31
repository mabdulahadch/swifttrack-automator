
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    redirect('/login');
  }
  
  const user = verifyToken(token);
  
  if (!user) {
    // Token is invalid, clear it and redirect to login
    redirect('/login');
  }
  
  // Redirect to dashboard with user ID
  redirect(`/dashboard/${user.id}`);
}

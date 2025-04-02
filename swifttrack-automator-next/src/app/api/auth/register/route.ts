import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { hashPassword, generateJWT } from '@/lib/auth-utils';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, password } = await request.json();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Generate token for the new user
    const token = generateJWT(user._id.toString());
    
    // Create the response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful',
        user: { id: user._id, name: user.name, email: user.email }
      },
      { status: 201 }
    );
    
    // Set the auth token cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}
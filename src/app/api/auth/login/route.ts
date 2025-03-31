
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // Find the user and include the password for verification
    const user = await User.findOne({ email }).select('+password').exec();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = generateToken(user._id.toString());

    // Create the response
    const response = NextResponse.json({
      success: true,
      userId: user._id.toString(),
      user: {
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber
      },
      message: 'Login successful'
    });
    
    // Set the cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

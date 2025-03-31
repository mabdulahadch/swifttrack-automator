
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password, phoneNumber, address } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phoneNumber,
      address: address || '',
    });
    
    const user = await newUser.save();

    // Generate JWT
    const token = generateToken(user._id.toString());

    // Set the cookie
    const response = NextResponse.json({
      success: true,
      userId: user._id.toString(),
      message: 'Registration successful'
    });
    
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

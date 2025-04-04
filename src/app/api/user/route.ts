
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
  try {
    const user = getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
<<<<<<< HEAD
    const userData = await User.findById((await user).id).select('-password');
=======
    const userData = await User.findById(user.id).select('-password').exec();
>>>>>>> d0a1f7a6ba64c0cee7ad06a61d01edfb2dc3f09c
    
    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        createdAt: userData.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

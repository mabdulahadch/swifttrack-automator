
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import { getUserFromToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const orderData = await request.json();
    
    // Generate a tracking ID
    const trackingId = `TRK-${Math.floor(Math.random() * 100000)}`;
    
    const newOrder = new Order({
      ...orderData,
      userId: user.id,
      trackingId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const order = await newOrder.save();
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: order._id.toString(),
        trackingId: order.trackingId,
        ...orderData
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    await dbConnect();
    
    const query: any = { userId: user.id };
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
      
    const total = await Order.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: orders.map(order => ({
        id: order._id.toString(),
        trackingId: order.trackingId,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        address: order.address,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        estimatedDelivery: order.estimatedDelivery,
        items: order.items
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

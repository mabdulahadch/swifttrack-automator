
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import { getUserFromToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const order = await Order.findOne({
      _id: params.id,
      userId: user.id
    });
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      order: {
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
      }
    });
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const updates = await request.json();
    
    const order = await Order.findOneAndUpdate(
      {
        _id: params.id,
        userId: user.id
      },
      {
        ...updates,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: {
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
      }
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}

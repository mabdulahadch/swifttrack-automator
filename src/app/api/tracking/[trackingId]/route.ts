
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';

export async function GET(
  request: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    await dbConnect();
    
    const order = await Order.findOne({ trackingId: params.trackingId });
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Generate tracking events based on status
    const events = [];
    const now = new Date();
    
    events.push({
      status: 'order_received',
      timestamp: new Date(order.createdAt).toISOString(),
      location: 'Processing Center'
    });
    
    if (['processing', 'dispatched', 'in_transit', 'delivered'].includes(order.status)) {
      events.push({
        status: 'processing',
        timestamp: new Date(now.getTime() - 86400000).toISOString(),
        location: 'Processing Center'
      });
    }
    
    if (['dispatched', 'in_transit', 'delivered'].includes(order.status)) {
      events.push({
        status: 'dispatched',
        timestamp: new Date(now.getTime() - 43200000).toISOString(),
        location: 'Distribution Hub'
      });
    }
    
    if (['in_transit', 'delivered'].includes(order.status)) {
      events.push({
        status: 'in_transit',
        timestamp: new Date(now.getTime() - 21600000).toISOString(),
        location: 'En Route'
      });
    }
    
    if (order.status === 'delivered') {
      events.push({
        status: 'delivered',
        timestamp: new Date().toISOString(),
        location: 'Customer Address'
      });
    }
    
    return NextResponse.json({
      success: true,
      trackingId: order.trackingId,
      currentStatus: order.status,
      estimatedDelivery: order.estimatedDelivery || new Date(now.getTime() + 86400000).toISOString(),
      events
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}


'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order, OrderStatus } from "@/types";
import { mockOrders } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const RecentOrders = () => {
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusClass = (status: OrderStatus) => {
    const statusClasses = {
      pending: "status-badge-pending",
      processing: "status-badge-processing",
      dispatched: "status-badge-dispatched",
      delivered: "status-badge-delivered",
      failed: "status-badge-failed",
    };
    return statusClasses[status];
  };

  const getStatusDot = (status: OrderStatus) => {
    const statusDots = {
      pending: "status-dot-pending",
      processing: "status-dot-processing",
      dispatched: "status-dot-dispatched",
      delivered: "status-dot-delivered",
      failed: "status-dot-failed",
    };
    return statusDots[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="col-span-3 border shadow-sm">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.trackingId}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customerName}</span>
                    <span className="text-sm text-muted-foreground">{order.customerPhone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={`${getStatusDot(order.status)}`}></span>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{formatDate(order.createdAt)}</span>
                    {order.estimatedDelivery && (
                      <span className="text-xs text-muted-foreground">
                        Est. Delivery: {formatDate(order.estimatedDelivery)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;

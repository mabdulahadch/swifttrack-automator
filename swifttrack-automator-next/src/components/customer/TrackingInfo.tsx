
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { mockOrders } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TrackingInfo = () => {
  const [trackingId, setTrackingId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    const order = mockOrders.find(
      (order) => order.trackingId.toLowerCase() === trackingId.toLowerCase()
    );

    if (order) {
      setSearchedOrder(order);
      setError("");
    } else {
      setError("No order found with this tracking ID");
      setSearchedOrder(null);
    }
  };

  const renderStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-8 w-8 text-status-pending" />;
      case "processing":
        return <Package className="h-8 w-8 text-status-processing" />;
      case "dispatched":
        return <Truck className="h-8 w-8 text-status-dispatched" />;
      case "delivered":
        return <CheckCircle className="h-8 w-8 text-status-delivered" />;
      case "failed":
        return <AlertCircle className="h-8 w-8 text-status-failed" />;
      default:
        return <Clock className="h-8 w-8 text-gray-400" />;
    }
  };

  const renderStatusSteps = (status: OrderStatus) => {
    const steps = [
      { id: "pending", label: "Order Received" },
      { id: "processing", label: "Processing" },
      { id: "dispatched", label: "Dispatched" },
      { id: "delivered", label: "Delivered" },
    ];

    const statusIndex = steps.findIndex((step) => step.id === status);
    const isFailed = status === "failed";

    return (
      <div className="relative mt-8 mb-6">
        {/* Progress bar background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted transform -translate-y-1/2"></div>
        
        {/* Active progress */}
        {!isFailed && (
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary transform -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(statusIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        )}
        
        {/* Steps */}
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            const isActive = index <= statusIndex && !isFailed;
            const isCurrent = index === statusIndex && !isFailed;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center 
                    ${isCurrent ? 'bg-primary text-white' : 
                      isActive ? 'bg-primary text-white' : 
                      isFailed && index === 0 ? 'bg-status-failed text-white' : 'bg-muted text-muted-foreground'}`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 text-center w-20
                  ${isCurrent ? 'text-primary font-medium' : 
                    isActive ? 'text-foreground' : 
                    isFailed && index === 0 ? 'text-status-failed' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Failed status notice */}
        {isFailed && (
          <div className="mt-4 flex justify-center">
            <span className="text-sm text-status-failed flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Delivery failed. Please contact customer support.
            </span>
          </div>
        )}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Track Your Order</CardTitle>
          <p className="text-center text-muted-foreground">
            Enter your tracking number to see the status of your order
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter tracking ID (e.g. ST-7823912)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>Track Order</Button>
          </div>
          {error && <p className="text-status-failed text-sm mt-2">{error}</p>}
          
          {/* Example tracking ID help */}
          <p className="text-xs text-muted-foreground mt-3">
            Try these sample tracking IDs: ST-7823912, ST-7823913, ST-7823914, ST-7823915, ST-7823916
          </p>
        </CardContent>
      </Card>

      {searchedOrder && (
        <Card className="shadow animate-fade-in">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Tracking Details</CardTitle>
                <p className="text-muted-foreground">
                  Tracking ID: <span className="font-medium">{searchedOrder.trackingId}</span>
                </p>
              </div>
              <div className="flex items-center">
                {renderStatusIcon(searchedOrder.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {renderStatusSteps(searchedOrder.status)}
            
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>
                    <span className={`status-badge ${`status-badge-${searchedOrder.status}`}`}>
                      {searchedOrder.status.charAt(0).toUpperCase() + searchedOrder.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Customer</TableCell>
                  <TableCell>{searchedOrder.customerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Delivery Address</TableCell>
                  <TableCell>{searchedOrder.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Order Date</TableCell>
                  <TableCell>{formatDate(searchedOrder.createdAt)}</TableCell>
                </TableRow>
                {searchedOrder.estimatedDelivery && (
                  <TableRow>
                    <TableCell className="font-medium">Estimated Delivery</TableCell>
                    <TableCell>{formatDate(searchedOrder.estimatedDelivery)}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="font-medium">Items</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-5">
                      {searchedOrder.items.map((item) => (
                        <li key={item.id}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackingInfo;

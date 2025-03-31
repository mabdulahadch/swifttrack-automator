
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ArrowRight, CheckCircle, Clock, Truck } from "lucide-react";
import { toast } from "sonner";

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/tracking/${trackingId}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackingInfo(data);
      } else {
        toast.error(data.message || "Tracking information not found");
        setTrackingInfo(null);
      }
    } catch (error) {
      toast.error("Error fetching tracking information");
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'order_received':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'dispatched':
      case 'in_transit':
        return <Truck className="h-5 w-5 text-primary" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">SwiftTrack Order Tracking</h1>
          <p className="text-muted-foreground">
            Track your package by entering your tracking number below
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track Your Package</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder="Enter tracking number (e.g. TRK-12345)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Track"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {trackingInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Tracking ID: {trackingInfo.trackingId}</span>
                <span className="text-sm font-normal px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {trackingInfo.currentStatus.charAt(0).toUpperCase() + trackingInfo.currentStatus.slice(1).replace('_', ' ')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {new Date(trackingInfo.estimatedDelivery).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="relative">
                {trackingInfo.events.map((event: any, index: number) => (
                  <div key={index} className="flex mb-6 relative">
                    <div className="mr-4 z-10 bg-background">
                      {getStatusIcon(event.status)}
                    </div>
                    {index < trackingInfo.events.length - 1 && (
                      <div className="absolute left-2.5 top-5 w-0.5 h-full bg-muted -z-10"></div>
                    )}
                    <div>
                      <p className="font-medium">
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ')}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;

"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackingInfo from "@/components/customer/TrackingInfo";
import { Link } from "react-router-dom";

const Tracking = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order Tracking</h1>
            <p className="text-muted-foreground">Track the status of your delivery</p>
          </div>
        </div>
        
        <TrackingInfo />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Need help? Contact our support team at support@swifttrack.pk</p>
          <p className="mt-1">© 2023 SwiftTrack Automator. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Tracking;

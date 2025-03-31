
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";
import Automation from "@/pages/Automation";
import Notifications from "@/pages/Notifications";
import Reports from "@/pages/Reports";
import Routing from "@/pages/Routing";
import Tracking from "@/pages/Tracking";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tracking" element={<Tracking />} />

          {/* Protected Routes - Redirect to login if not authenticated */}
          <Route path="/dashboard/:userId" element={<Index />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/routing" element={<Routing />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;

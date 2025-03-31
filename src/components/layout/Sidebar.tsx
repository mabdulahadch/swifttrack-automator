
'use client';

import { 
  Package, 
  Truck, 
  Home,
  Users,
  Bell, 
  BarChart,
  Settings,
  CalendarClock,
  Map,
  LogOut
} from "lucide-react";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Extract userId from the URL if we're on a dashboard page
  const userId = pathname.startsWith('/dashboard/') 
    ? pathname.split('/')[2] 
    : '';
  
  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      route: userId ? `/dashboard/${userId}` : "/"
    },
    { 
      icon: Package, 
      label: "Orders", 
      route: "/orders"
    },
    { 
      icon: Truck, 
      label: "Dispatch", 
      route: "/dispatch"
    },
    { 
      icon: Map, 
      label: "Routing", 
      route: "/routing"
    },
    { 
      icon: Users, 
      label: "Customers", 
      route: "/customers"
    },
    { 
      icon: CalendarClock, 
      label: "Automation", 
      route: "/automation"
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      route: "/notifications"
    },
    { 
      icon: BarChart, 
      label: "Reports", 
      route: "/reports"
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success("Logged out successfully");
        router.push('/login');
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">SwiftTrack</h2>
        <p className="text-xs text-muted-foreground">Automator</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link href={item.route} className="flex items-center">
                  <item.icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;

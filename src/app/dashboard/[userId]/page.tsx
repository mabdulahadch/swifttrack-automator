
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardPage({ 
  params 
}: { 
  params: { userId: string } 
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    redirect("/login");
  }
  
  const user = verifyToken(token);
  
  if (!user || user.id !== params.userId) {
    // Either token is invalid or user is trying to access another user's dashboard
    redirect("/login");
  }
  
  return <Dashboard userId={params.userId} />;
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardComponent from "@/components/dashboard/Dashboard";

export default async function DashboardPage({ 
  params 
}: { 
  params: { userId: string } 
}) {
  const cookieStore = cookies();
  const tokenCookie = await cookieStore.get("token");
  const token = tokenCookie ? tokenCookie.value : null;
  
  if (!token) {
    redirect("/login");
  }
  
  const user = verifyToken(token);
  
  if (!user || user.id !== params.userId) {
    redirect("/login");
  }
  
  return <DashboardComponent userId={params.userId} />;
}
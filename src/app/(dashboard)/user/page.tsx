'use client';

import { BarChart2, CreditCard, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { recentActivity } from "@/lib/constants/usermock";
import { useAuth } from "@/core/auth/AuthProvider";
import { plans, freePlan } from '@/lib/constants/usermock';
import { useEffect, useState } from "react";
import { getCurrentProfile } from "@/core/auth/server";
import { usePathname } from "next/navigation";

export default function UserDashboard() {
  const [{profile}] = useAuth();
  const pathname = usePathname();
  const [currentPlan, setCurrentPlan] = useState(freePlan); 
  const [currentUser, setCurrentUser] = useState(profile)

  const setSubscription = async () => {
    const user = await getCurrentProfile();
    setCurrentUser(user);
    plans.map((plan)=> {
      if(plan.id === user.subscription_plan?.toLocaleLowerCase()) setCurrentPlan(plan);
    })
  }

  useEffect(()=> {
    setSubscription()
  },[pathname])

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            Welcome back, {currentUser.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your account and recent activity.
          </p>
        </div>

        {/* Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You have less than 100 credits remaining. Consider purchasing additional credits to avoid interruptions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#2B6CB0]" />
                  <span className="text-2xl font-bold">{currentUser.subscription_plan.toLocaleUpperCase()}</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Professional plan with monthly billing</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credits Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="text-2xl font-bold">{currentUser.credits_balance}</span>
                </div>
                <span className="text-xs text-red-500">-15%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Used 15% of credits this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-5 w-5 text-[#2B6CB0]" />
                  <span className="text-2xl font-bold">65 Credits</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Across all AI agents</p>
            </CardContent>
          </Card>
        </div>

        {/* Plan Details and Recent Activity */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Plan Details */}
          <Card className="md:col-span-1 bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">{currentPlan.name}</p>
                  <span className="text-2xl font-bold">{currentPlan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    /{currentPlan.interval}
                  </span>
                </div>
                <Badge className="bg-[#2B6CB0]/10 text-[#2B6CB0] hover:bg-[#2B6CB0]/20">Active</Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Plan Features:</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#8b5cf6]/10 p-4">
              <Link href="/user/credits">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  Upgrade Plan
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Credit Usage Table */}
          <Card className="md:col-span-2 bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Recent Credit Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#8b5cf6]/10">
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Agent</th>
                      <th className="text-left p-3 font-medium">Activity</th>
                      <th className="text-left p-3 font-medium">Credits Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                        <td className="p-3">{activity.date}</td>
                        <td className="p-3">{activity.agent}</td>
                        <td className="p-3">{activity.activity}</td>
                        <td className="p-3">{activity.creditsUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#8b5cf6]/10 p-4">
              <Link href="/user/usage" className="text-[#2B6CB0] hover:text-[#8b5cf6] transition-colors">
                View All Activity →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
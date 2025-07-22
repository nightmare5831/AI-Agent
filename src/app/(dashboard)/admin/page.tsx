'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, AlertTriangle, Search, Loader2, RefreshCw } from "lucide-react";
import { useLanguage } from '@/lib/i18n/language-context';
import { getAdminUsers, getAdminStats, getCreditUsageOverTime, type AdminUser, type AdminStats, type CreditUsageData } from '@/core/admin/get-admin-data';

export default function AdminPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterPlan, setFilterPlan] = useState("all");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [creditUsageData, setCreditUsageData] = useState<CreditUsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const [users, stats, creditUsage] = await Promise.all([
        getAdminUsers(),
        getAdminStats(),
        getCreditUsageOverTime()
      ]);
      setAdminUsers(users);
      setAdminStats(stats);
      setCreditUsageData(creditUsage);
      setError(null);
    } catch (err) {
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const filteredUsers = adminUsers.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = filterActive ? user.status !== "inactive" : true;

    const planMatch =
      filterPlan === "all" || user.plan.toLowerCase() === filterPlan.toLowerCase();

    return searchMatch && statusMatch && planMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8b5cf6]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => fetchAdminData()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Welcome section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
                {t.dashboard.adminTitle}
              </h1>
              <p className="text-muted-foreground">
                {t.dashboard.adminSubtitle}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="relative border-[#8b5cf6]/20"
                onClick={() => fetchAdminData(true)}
                disabled={refreshing}
              >
                <RefreshCw className={`h-5 w-5 text-[#8b5cf6] ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="outline" className="relative border-[#8b5cf6]/20">
                <Bell className="h-5 w-5 text-[#8b5cf6]" />
                <span className="absolute -top-1 -right-1 bg-[#2B6CB0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {adminStats?.lowCreditAccounts || 0}
                </span>
              </Button>
              <Button className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]">
                {t.dashboard.systemSettings}
              </Button>
            </div>
          </div>
        </div>

        {/* Alert */}
        {adminStats && adminStats.lowCreditAccounts > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {adminStats.lowCreditAccounts} users have credits below 20% of their plan allocation. Consider sending a reminder email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Credit Usage Over Time</CardTitle>
              <CardDescription>Total credits used across all users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={creditUsageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
                    <XAxis dataKey="name" stroke="#2D3748" />
                    <YAxis stroke="#2D3748" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="usage"
                      stroke="#2B6CB0"
                      fill="#63B3ED"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Key metrics and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{t.dashboard.totalUsers}</span>
                  <span className="font-semibold">{adminStats?.totalUsers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.dashboard.activeSubscriptions}</span>
                  <span className="font-semibold">
                    {adminStats?.activeSubscriptions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Low Credit Accounts</span>
                  <span className="text-yellow-500 font-semibold">{adminStats?.lowCreditAccounts || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Expired Subscriptions</span>
                  <span className="text-red-500 font-semibold">{adminStats?.expiredSubscriptions || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Credits Used (30d)</span>
                  <span className="font-semibold">{adminStats?.creditsUsed30d.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">New Users (30d)</span>
                  <span className="font-semibold">{adminStats?.newUsers30d || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <CardTitle>{t.dashboard.userManagement}</CardTitle>
                <CardDescription>
                  View and manage user accounts and their credits
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 md:w-auto border-[#8b5cf6]/20"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={filterActive ? "default" : "outline"}
                    onClick={() => setFilterActive(!filterActive)}
                    className={filterActive ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                  >
                    Active Only
                  </Button>
                  <select
                    className="rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                  >
                    <option value="all">All Plans</option>
                    <option value="free">Free</option>
                    <option value="essential">Essential</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#8b5cf6]/10">
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Plan</th>
                    <th className="text-left p-3 font-medium">Credits</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Last Active</th>
                    <th className="text-right p-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.plan}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{user.credits}</span>
                          {user.credits < 20 && user.credits > 0 && (
                            <Badge variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low</Badge>
                          )}
                          {user.credits === 0 && (
                            <Badge variant="error" className="bg-red-100 text-red-800 hover:bg-red-100">Empty</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            user.status === "warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                            "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3">{user.lastActive}</td>
                      <td className="p-3 text-right">
                        <Button variant="outline" size="sm" className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
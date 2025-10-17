'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, RefreshCcw, AlertCircle, Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Request } from "@/lib/request";
import { toast } from "sonner";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [planStats, setPlanStats] = useState<any[]>([]);
  const [statusStats, setStatusStats] = useState<any[]>([]);
  const [stats, setStats] = useState({ active: 0, total: 0, revenue: 0, upcoming: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await Request.Get('/api/admin/subscriptions');
      setSubscriptions(data.subscriptions || []);
      setStats(data.stats || { active: 0, total: 0, revenue: 0, upcoming: 0, overdue: 0 });
      setPlanStats(data.planStats || []);
      setStatusStats(data.statusStats || []);
    } catch (error) {
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort subscriptions
  const filteredSubscriptions = subscriptions
    .filter((sub) => {
      const searchMatch = 
        sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase());

      const planMatch = selectedPlan === "all" || sub.plan.toLowerCase() === selectedPlan.toLowerCase();

      return searchMatch && planMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case "date-desc":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "amount-asc":
          return parseFloat(a.amount.replace("R$", "")) - parseFloat(b.amount.replace("R$", ""));
        case "amount-desc":
          return parseFloat(b.amount.replace("R$", "")) - parseFloat(a.amount.replace("R$", ""));
        default:
          return 0;
      }
    });

  const getBadgeVariant = (status : string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "trial":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "canceled":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            Subscription Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage user subscriptions and billing
          </p>
        </div>

        {/* Alert */}
        {stats.overdue > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {stats.overdue} subscription payment{stats.overdue > 1 ? 's are' : ' is'} overdue. A payment reminder has been sent.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#2B6CB0]">{stats.active}</span>
                <span className="text-sm text-muted-foreground">out of {stats.total} total</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">R${stats.revenue.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">recurring monthly</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Next Renewal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#8b5cf6]">{stats.upcoming}</span>
                <span className="text-sm text-muted-foreground">subscriptions in next 7 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
              <CardDescription>Subscriptions by plan type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-[#8b5cf6]" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {planStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
              <CardDescription>Breakdown by current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-[#8b5cf6]" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {statusStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <CardTitle>All Subscriptions</CardTitle>
                <CardDescription>
                  Manage and view all user subscription plans
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Run Billing Cycle
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by customer name or email..."
                  className="pl-10 w-full border-[#8b5cf6]/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="all">All Plans</option>
                  <option value="essential">Essential</option>
                  <option value="professional">Professional</option>
                  <option value="completo">Completo</option>
                </select>
                <select
                  className="rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Amount (Highest First)</option>
                  <option value="amount-asc">Amount (Lowest First)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#8b5cf6]" />
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#8b5cf6]/10">
                      <th className="text-left p-3 font-medium">Customer</th>
                      <th className="text-left p-3 font-medium">Plan</th>
                      <th className="text-left p-3 font-medium">Amount</th>
                      <th className="text-left p-3 font-medium">Start Date</th>
                      <th className="text-left p-3 font-medium">Next Billing</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Payment Method</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{subscription.user}</p>
                            <p className="text-sm text-muted-foreground">{subscription.email}</p>
                          </div>
                        </td>
                        <td className="p-3">{subscription.plan}</td>
                        <td className="p-3">{subscription.amount}</td>
                        <td className="p-3">{subscription.startDate}</td>
                        <td className="p-3">{subscription.nextBilling}</td>
                        <td className="p-3">
                          <Badge className={getBadgeVariant(subscription.status)}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-3">{subscription.paymentMethod}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                            >
                              Edit
                            </Button>
                            <Button
                              variant={subscription.status === 'canceled' ? 'default' : 'outline'}
                              size="sm"
                              className={
                                subscription.status === 'canceled'
                                  ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]"
                                  : "border-red-300 text-red-500 hover:bg-red-50"
                              }
                            >
                              {subscription.status === 'canceled' ? 'Reactivate' : 'Cancel'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredSubscriptions.length}</span> of{" "}
                <span className="font-medium">{stats.total}</span> subscriptions
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  className="border-[#8b5cf6]/20"
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-3 bg-[#8b5cf6]/10 border-[#8b5cf6]/30"
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
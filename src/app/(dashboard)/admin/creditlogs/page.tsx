'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { creditLogs, creditData } from "@/lib/constants/mockData";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter, Download, Calendar, ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CreditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("7-days");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter logs based on search term
  const filteredLogs = creditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate sums
  const totalCreditsUsed = creditLogs
    .filter(log => log.type === 'used')
    .reduce((sum, log) => sum + log.amount, 0);
    
  const totalCreditsPurchased = creditLogs
    .filter(log => log.type === 'purchased' || log.type === 'allocated')
    .reduce((sum, log) => sum + log.amount, 0);
    
  const creditBalance = totalCreditsPurchased - totalCreditsUsed;

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "used":
        return { 
          icon: <ArrowUpRight className="h-4 w-4 text-red-500" />, 
          badge: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Used</Badge> 
        };
      case "purchased":
        return { 
          icon: <ArrowDownRight className="h-4 w-4 text-green-500" />, 
          badge: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Purchased</Badge> 
        };
      case "allocated":
        return { 
          icon: <ArrowDownRight className="h-4 w-4 text-green-500" />, 
          badge: <Badge className="bg-[#2B6CB0]/10 text-[#2B6CB0] hover:bg-[#2B6CB0]/20">Allocated</Badge> 
        };
      default:
        return { 
          icon: null, 
          badge: <Badge>{type}</Badge> 
        };
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            Credit Usage Logs
          </h1>
          <p className="text-muted-foreground">
            Track and analyze credit allocations and usage across all users
          </p>
        </div>

        {/* Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Credits used today: 13 | Credits allocated today: 0 | Credits purchased today: 0
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Credits Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-red-500">{totalCreditsUsed}</span>
                <span className="text-sm text-muted-foreground">across all users</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Credits Earned/Purchased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-green-500">{totalCreditsPurchased}</span>
                <span className="text-sm text-muted-foreground">total added credits</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
                  {creditBalance}
                </span>
                <span className="text-sm text-muted-foreground">across all accounts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Card */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Credit Usage Trend</CardTitle>
                <CardDescription>Credits earned vs. credits used</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={dateRange === "7-days" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDateRange("7-days")}
                  className={dateRange === "7-days" ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                >
                  7D
                </Button>
                <Button 
                  variant={dateRange === "30-days" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setDateRange("30-days")}
                  className={dateRange === "30-days" ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                >
                  30D
                </Button>
                <Button 
                  variant={dateRange === "90-days" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setDateRange("90-days")}
                  className={dateRange === "90-days" ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                >
                  90D
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={creditData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="earned" stackId="1" stroke="#38A169" fill="#38A169" fillOpacity={0.3} name="Credits Earned" />
                  <Area type="monotone" dataKey="used" stackId="2" stroke="#E53E3E" fill="#E53E3E" fillOpacity={0.3} name="Credits Used" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Log */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Detailed log of all credit transactions</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {showFilters && (
              <div className="mb-6 p-4 border border-[#8b5cf6]/20 rounded-lg bg-background/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Transaction Type</label>
                    <select
                      className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="used">Credits Used</option>
                      <option value="purchased">Credits Purchased</option>
                      <option value="allocated">Credits Allocated</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Agent</label>
                    <select
                      className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Agents</option>
                      <option value="marketing">Marketing Bot</option>
                      <option value="whatsapp">WhatsApp Bot</option>
                      <option value="strategy">Strategy Bot</option>
                      <option value="organization">Organization Bot</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date From</label>
                    <Input
                      type="date"
                      className="mt-1 border-[#8b5cf6]/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date To</label>
                    <Input
                      type="date"
                      className="mt-1 border-[#8b5cf6]/20"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40"
                  >
                    Clear Filters
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by user, email or transaction details..."
                  className="pl-10 w-full border-[#8b5cf6]/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#8b5cf6]/10">
                    <th className="text-left p-3 font-medium">Date & Time</th>
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                    <th className="text-left p-3 font-medium">Details</th>
                    <th className="text-left p-3 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                      <td className="p-3">{log.date}</td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{log.user}</p>
                          <p className="text-sm text-muted-foreground">{log.email}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          {getTypeDisplay(log.type).icon}
                          {getTypeDisplay(log.type).badge}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={log.type === "used" ? "text-red-500" : "text-green-500"}>
                          {log.type === "used" ? "-" : "+"}{log.amount} credits
                        </span>
                      </td>
                      <td className="p-3">{log.details}</td>
                      <td className="p-3 font-medium">{log.balance} credits</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredLogs.length}</span> of{" "}
                <span className="font-medium">{creditLogs.length}</span> transactions
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
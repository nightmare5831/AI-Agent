'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Background } from "@/components/ui/background";
import { Download,RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { userActivityData, revenueData, agentUsageData, availableReports, systemStats } from "@/lib/constants/mockData";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30-days");

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Generate reports and view analytics about your platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {systemStats.map((stat, index) => (
            <Card key={index} className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
                  <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts - User Activity and Revenue */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users and new signups</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={timeRange === "7-days" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimeRange("7-days")}
                    className={timeRange === "7-days" ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                  >
                    7D
                  </Button>
                  <Button 
                    variant={timeRange === "30-days" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimeRange("30-days")}
                    className={timeRange === "30-days" ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                  >
                    30D
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userActivityData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name="Active Users" fill="#2B6CB0" />
                    <Bar dataKey="new" name="New Signups" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue analysis</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$${value}`, 'Revenue']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#38A169"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Agent Usage Chart */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <CardTitle>AI Agent Usage Distribution</CardTitle>
            <CardDescription>Credits used by agent type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={agentUsageData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="usage" name="Credits Used" fill="#2B6CB0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download system reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-[#8b5cf6]/20 rounded-lg p-4 hover:bg-[#8b5cf6]/5 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-[#2B6CB0]/10 p-2 rounded-md">
                      {report.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          Available formats: {report.format}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-[#8b5cf6]/10 p-4">
            <div className="text-sm text-muted-foreground">
              Last updated: May 18, 2025 at 10:23 AM
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </CardFooter>
        </Card>

        {/* Schedule Reports */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <CardTitle>Schedule Reports</CardTitle>
            <CardDescription>Set up automated report delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <select
                    className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="">Select a report...</option>
                    <option value="financial">Monthly Financial Summary</option>
                    <option value="user">User Activity Report</option>
                    <option value="agent">Agent Usage Analytics</option>
                    <option value="subscription">Subscription Trends</option>
                    <option value="credit">Credit Consumption Report</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <select
                    className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Format</label>
                  <select
                    className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="xlsx">XLSX</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email Recipients</label>
                <Input
                  type="text"
                  placeholder="Enter email addresses, separated by commas"
                  className="mt-1 border-[#8b5cf6]/20"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]">
                  Schedule Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
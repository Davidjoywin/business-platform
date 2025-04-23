"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  AlertCircle,
  Car,
  CheckCircle2,
  Clock,
  Fuel,
  MapPin,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { getUsersFromStorage } from "@/lib/utils"
import { boolean } from "zod"

export default function DashboardPage() {
  const [userData, setUserData] = useState<{ businessName: string } | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  function getAuthUser(users: any, isLoggedIn: boolean) {
    const id = users.findIndex((user: any) => user.isLoggedIn == true)
    return users[id]
  }

  useEffect(() => {
    setIsMounted(true)
    const storedUsers = getUsersFromStorage("fleetUser")
    const auth_user = getAuthUser(storedUsers, true)
    if (auth_user) {
      setUserData(auth_user)
    }
  }, [])

  // Don't render anything on the server to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  // Sample data for charts
  const fuelConsumptionData = [
    { month: "Jan", consumption: 450, cost: 1350 },
    { month: "Feb", consumption: 420, cost: 1260 },
    { month: "Mar", consumption: 480, cost: 1440 },
    { month: "Apr", consumption: 520, cost: 1560 },
    { month: "May", consumption: 490, cost: 1470 },
    { month: "Jun", consumption: 550, cost: 1650 },
    { month: "Jul", consumption: 600, cost: 1800 },
    { month: "Aug", consumption: 580, cost: 1740 },
    { month: "Sep", consumption: 510, cost: 1530 },
    { month: "Oct", consumption: 490, cost: 1470 },
    { month: "Nov", consumption: 460, cost: 1380 },
    { month: "Dec", consumption: 510, cost: 1530 },
  ]

  const vehicleUsageData = [
    { name: "Truck A", usage: 85 },
    { name: "Truck B", usage: 92 },
    { name: "Van C", usage: 78 },
    { name: "Van D", usage: 65 },
    { name: "Car E", usage: 45 },
    { name: "Truck F", usage: 88 },
  ]

  const maintenanceData = [
    { month: "Jan", scheduled: 5, emergency: 2 },
    { month: "Feb", scheduled: 7, emergency: 1 },
    { month: "Mar", scheduled: 4, emergency: 3 },
    { month: "Apr", scheduled: 6, emergency: 2 },
    { month: "May", scheduled: 8, emergency: 1 },
    { month: "Jun", scheduled: 5, emergency: 0 },
  ]

  const driverPerformanceData = [
    { name: "John D.", score: 92, incidents: 0, fuelEfficiency: 95 },
    { name: "Sarah M.", score: 88, incidents: 1, fuelEfficiency: 90 },
    { name: "Robert K.", score: 85, incidents: 1, fuelEfficiency: 87 },
    { name: "Lisa T.", score: 95, incidents: 0, fuelEfficiency: 92 },
    { name: "Michael P.", score: 79, incidents: 2, fuelEfficiency: 82 },
  ]

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {userData?.businessName || "User"}</h1>
        <p className="text-gray-600">Here's what's happening with your fleet today.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2 this month</span>
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Car className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Drivers</p>
                <h3 className="text-2xl font-bold mt-1">18</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+3 this month</span>
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Fuel Expenses</p>
                <h3 className="text-2xl font-bold mt-1">$4,280</h3>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>-5% vs last month</span>
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Fuel className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Maintenance Due</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Next 7 days</span>
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
        <div className="space-y-3">
          <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Maintenance Required</AlertTitle>
            <AlertDescription>Vehicle TRK-103 is due for scheduled maintenance in 2 days.</AlertDescription>
          </Alert>
          <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Service Completed</AlertTitle>
            <AlertDescription>Oil change and tire rotation for VAN-205 has been completed.</AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Tabs for different charts */}
      <Tabs defaultValue="fuel" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <TabsList>
            <TabsTrigger value="fuel">Fuel</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="fuel" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Consumption & Cost</CardTitle>
              <CardDescription>Monthly fuel consumption and associated costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  consumption: {
                    label: "Consumption (gal)",
                    color: "hsl(var(--chart-1))",
                  },
                  cost: {
                    label: "Cost ($)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fuelConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="consumption"
                      stroke="var(--color-consumption)"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="var(--color-cost)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Usage</CardTitle>
              <CardDescription>Utilization rate of fleet vehicles (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  usage: {
                    label: "Usage (%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vehicleUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="usage" fill="var(--color-usage)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Events</CardTitle>
              <CardDescription>Scheduled vs. emergency maintenance events</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  scheduled: {
                    label: "Scheduled",
                    color: "hsl(var(--chart-4))",
                  },
                  emergency: {
                    label: "Emergency",
                    color: "hsl(var(--chart-5))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="scheduled"
                      stackId="1"
                      stroke="var(--color-scheduled)"
                      fill="var(--color-scheduled)"
                    />
                    <Area
                      type="monotone"
                      dataKey="emergency"
                      stackId="1"
                      stroke="var(--color-emergency)"
                      fill="var(--color-emergency)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Driver Performance */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Driver Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Drivers</CardTitle>
              <CardDescription>Performance metrics for your drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {driverPerformanceData.map((driver) => (
                  <div key={driver.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="font-medium text-primary">{driver.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-2">Incidents: {driver.incidents}</span>
                            <span>Fuel Efficiency: {driver.fuelEfficiency}%</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{driver.score}%</span>
                    </div>
                    <Progress value={driver.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Vehicles</CardTitle>
              <CardDescription>Current status of your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Truck A (TRK-101)</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Downtown Delivery Route</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Van C (VAN-205)</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Airport Shuttle Service</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Truck F (TRK-103)</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Interstate Freight Route</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                    Maintenance Due
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Car E (CAR-304)</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Executive Transport</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full">In Service</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

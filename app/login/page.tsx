"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { comparePassword, createUserInStorage, findUserByEmail, getUsersFromStorage, updateUserInStorage, writeStorage } from "@/lib/utils"

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific error when user types
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: null, message: "" })

    try {
      // Validate form data
      loginSchema.parse(formData)

      // Simulate API call
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // const USER: string|null = localStorage.getItem(
      //   "fleetUser"
      // )
      // interface UserObject {
      //   email: string,
      //   password: string
      // }
      // var user: UserObject = {"email": "", "password": ""};
      const users = getUsersFromStorage("fleetUser")
      const id = findUserByEmail(users, formData.email)
      const user = users[id]

      // Handle successful login

      const isCorrectPwd = await comparePassword(formData.password, user.password)
      console.log(isCorrectPwd)
      if (formData.email === user.email && isCorrectPwd) {
        setStatus({
          type: "success",
          message: "Login successful! Redirecting to dashboard...",
        })

        // Store user info in localStorage
        //const USER: string|null = localStorage.getItem("fleetUser")
        // let user = {}
        // if (USER) user =  JSON.parse(USER)
        
        const users = getUsersFromStorage("fleetUser")
        const id = findUserByEmail(users, formData.email)
        updateUserInStorage(users, id, true)
        console.log(users)

        // localStorage.setItem(
        //   "fleetUser",
        //   JSON.stringify({
        //     ...user,
        //     isLoggedIn: true,
        //   }),
        // )

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
      } else {
        setStatus({
          type: "error",
          message: "Invalid email or password. Try demo@example.com / password",
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our format
        const fieldErrors: Partial<LoginFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            FleetMaster
          </Link>
          <h2 className="mt-2 text-gray-600">Sign in to your account</h2>
        </div>

        <Card>
          <CardHeader className="flex items-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {status.type && (
              <Alert
                className={`mb-4 ${status.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
              >
                <div className="flex items-center gap-2">
                  {status.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{status.message}</AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@lisbom.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-300" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-gray-500 hover:text-red-600">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-300" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full hover:bg-red-600" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

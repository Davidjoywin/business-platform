import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="FleetMaster Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold">FleetMaster</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Manage Your Fleet with Confidence</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Streamline operations, reduce costs, and improve efficiency with our comprehensive fleet management
              solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose FleetMaster?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Monitor your entire fleet in real-time with advanced GPS tracking technology.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Maintenance Management</h3>
                <p className="text-gray-600">
                  Schedule and track maintenance to prevent breakdowns and extend vehicle life.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Comprehensive Reports</h3>
                <p className="text-gray-600">Gain insights with detailed analytics and customizable reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 FleetMaster. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:underline">
                Terms
              </a>
              <a href="#" className="text-sm hover:underline">
                Privacy
              </a>
              <a href="#" className="text-sm hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

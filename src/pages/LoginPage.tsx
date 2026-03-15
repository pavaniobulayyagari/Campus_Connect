import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap } from 'lucide-react'
import { toast } from 'sonner'
import heroCampus from '@/assets/hero-campus.jpg'

export default function LoginPage() {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    if (!username || !password) {
      toast.error("Enter username and password")
      return
    }

    const success = login(username, password)

    if (!success) {
      toast.error("Invalid credentials")
      return
    }

    toast.success("Login successful")

    const user = JSON.parse(
      localStorage.getItem("campus_user") || "{}"
    )

    if (user.role === "STUDENT") {
      navigate("/student/clubs")
    }

    else if (user.role === "COORDINATOR") {
      navigate("/coordinator/dashboard")
    }

    else {
      navigate("/admin/clubs")
    }

  }

  return (

    <div className="flex min-h-screen">

      {/* Left Image */}

      <div className="relative hidden w-1/2 lg:block">

        <img
          src={heroCampus}
          alt="Campus"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/60" />

        <div className="relative z-10 flex h-full flex-col justify-end p-12">

          <h2 className="text-4xl font-bold text-white">
            Your Campus <br /> Your Community
          </h2>

          <p className="text-white/80 mt-3">
            Discover clubs and activities
          </p>

        </div>

      </div>


      {/* Login Form */}

      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">

        <div className="w-full max-w-md">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">

              <GraduationCap className="h-8 w-8 text-white" />

            </div>

            <h1 className="text-3xl font-bold">
              CampusHub
            </h1>

            <p className="text-muted-foreground">
              University Club Management
            </p>

          </div>

          <Card>

            <CardHeader>

              <CardTitle>
                Login
              </CardTitle>

              <CardDescription>
                Enter your credentials
              </CardDescription>

            </CardHeader>

            <CardContent>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div>

                  <Label>Username</Label>

                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />

                </div>

                <div>

                  <Label>Password</Label>

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />

                </div>

                <Button
                  className="w-full"
                  type="submit"
                >
                  Login
                </Button>

              </form>

              <p className="mt-4 text-center text-sm">

                Don't have an account?

                <Link
                  to="/register"
                  className="text-primary font-medium ml-1"
                >
                  Register
                </Link>

              </p>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>

  )
}

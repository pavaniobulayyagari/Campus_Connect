import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap } from 'lucide-react'
import { toast } from 'sonner'
import type { UserRole } from '@/types'
import studentsCollab from '@/assets/students-collab.jpg'

export default function RegistrationPage() {

  const { register } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('STUDENT')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password) {
      toast.error("All fields are required")
      return
    }

    register(username, email, password, role)

    toast.success("Account created successfully")

    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">

      {/* Left Image Section */}

      <div className="relative hidden w-1/2 lg:block">
        <img
          src={studentsCollab}
          alt="Students"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-accent/70 to-primary/60" />

        <div className="relative z-10 flex h-full flex-col justify-end p-12">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Join the <br /> Community
          </h2>

          <p className="mt-3 text-lg text-primary-foreground/80">
            Create your account and explore clubs and campus events.
          </p>
        </div>
      </div>


      {/* Registration Form */}

      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">

        <div className="w-full max-w-md">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>

            <h1 className="text-3xl font-bold">CampusHub</h1>

            <p className="text-muted-foreground">
              Create your account
            </p>

          </div>

          <Card>

            <CardHeader>

              <CardTitle>Register</CardTitle>

              <CardDescription>
                Choose your role
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
                  <Label>Email</Label>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
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

                <div>

                  <Label>Role</Label>

                  <Select
                    value={role}
                    onValueChange={(value) => setRole(value as UserRole)}
                  >

                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="STUDENT">
                        Student
                      </SelectItem>

                      <SelectItem value="COORDINATOR">
                        Coordinator
                      </SelectItem>

                      <SelectItem value="ADMIN">
                        Admin
                      </SelectItem>

                    </SelectContent>

                  </Select>

                </div>

                <Button className="w-full" type="submit">
                  Create Account
                </Button>

              </form>

              <p className="mt-4 text-center text-sm">

                Already have an account?

                <Link
                  to="/login"
                  className="text-primary font-medium ml-1"
                >
                  Login
                </Link>

              </p>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  )
}

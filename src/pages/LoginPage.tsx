import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import heroCampus from '@/assets/hero-campus.jpg';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    const success = login(username, password);
    if (success) {
      toast.success('Welcome back!');
      const user = JSON.parse(localStorage.getItem('campus_user') || '{}');
      if (user.role === 'STUDENT') navigate('/student/clubs');
      else if (user.role === 'COORDINATOR') navigate('/coordinator/dashboard');
      else navigate('/admin/clubs');
    } else {
      toast.error('Invalid credentials. Try: student1, coordinator1, or admin1');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Hero image */}
      <div className="relative hidden w-1/2 lg:block">
        <img src={heroCampus} alt="Campus life" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/60" />
        <div className="relative z-10 flex h-full flex-col justify-end p-12">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Your Campus,<br />Your Community.
          </h2>
          <p className="mt-3 max-w-md text-lg text-primary-foreground/80">
            Discover clubs, join activities, and connect with like-minded students across campus.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">CampusHub</h1>
            <p className="mt-1 text-muted-foreground">University Club Management</p>
          </div>

          <Card className="card-elevated border-0">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading text-xl">Sign in</CardTitle>
              <CardDescription>Enter your credentials to access the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. student1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Any password" />
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
              </form>

              <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                <p className="mb-1 font-semibold">Demo accounts:</p>
                <p><strong>student1</strong> — Student role</p>
                <p><strong>coordinator1</strong> — Coordinator role</p>
                <p><strong>admin1</strong> — Admin role</p>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

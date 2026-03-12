import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import patternBg from '@/assets/pattern-bg.png';

const navByRole = {
  STUDENT: [
    { to: '/student/clubs', label: 'Browse Clubs' },
    { to: '/student/activities', label: 'Activities' },
    { to: '/student/announcements', label: 'Announcements' },
  ],
  COORDINATOR: [
    { to: '/coordinator/dashboard', label: 'Dashboard' },
    { to: '/coordinator/create-club', label: 'Create Club' },
    { to: '/coordinator/add-activity', label: 'Add Activity' },
    { to: '/coordinator/post-announcement', label: 'Post Announcement' },
  ],
  ADMIN: [
    { to: '/admin/clubs', label: 'Manage Clubs' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/reports', label: 'Reports' },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <Outlet />;

  const links = navByRole[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <img src={patternBg} alt="" className="h-full w-full object-cover" />
      </div>

      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">CampusHub</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {user.role}
              </span>
              <span className="text-sm text-muted-foreground">{user.username}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-card p-4 md:hidden">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{user.role}</span>
              <span className="text-sm text-muted-foreground">{user.username}</span>
            </div>
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

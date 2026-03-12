import { mockClubs, mockMemberships, mockParticipations, mockUsers } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Calendar, UserCheck } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

export default function AdminReportsPage() {
  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'text-primary' },
    { label: 'Total Clubs', value: mockClubs.length, icon: Building2, color: 'text-accent' },
    { label: 'Active Members', value: mockMemberships.filter(m => m.membershipStatus === 'APPROVED').length, icon: UserCheck, color: 'text-success' },
    { label: 'Participations', value: mockParticipations.length, icon: Calendar, color: 'text-warning' },
  ];

  return (
    <div>
      {/* Stats hero */}
      <div className="relative -mx-4 -mt-8 mb-8 overflow-hidden rounded-b-3xl">
        <img src={heroCampus} alt="Campus" className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Platform Reports</h1>
          <p className="mt-1 text-muted-foreground">Platform-wide statistics and insights</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label} className="card-elevated border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

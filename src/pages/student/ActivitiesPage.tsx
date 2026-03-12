import { mockActivities, mockMemberships, mockParticipations } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ActivitiesPage() {
  const { user } = useAuth();

  const myClubIds = mockMemberships
    .filter(m => m.studentId === user?.id && m.membershipStatus === 'APPROVED')
    .map(m => m.clubId);

  const filtered = mockActivities.filter(a => myClubIds.includes(a.clubId));
  const activities = (filtered.length > 0 ? filtered : mockActivities)
    .sort((a, b) => new Date(a.activityDate).getTime() - new Date(b.activityDate).getTime());

  const handleRegister = (activityId: string) => {
    const exists = mockParticipations.find(p => p.studentId === user?.id && p.activityId === activityId);
    if (exists) {
      toast.info('Already registered');
      return;
    }
    toast.success('Registered for activity!');
  };

  return (
    <div>
      <PageHeader title="Activities" description="Upcoming activities from your clubs" />

      {activities.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/50 py-12 text-center">
          <p className="text-muted-foreground">No activities available. Join a club first!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map(a => {
            const registered = mockParticipations.some(p => p.studentId === user?.id && p.activityId === a.id);
            return (
              <Card key={a.id} className="card-elevated border-0">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-heading text-lg">{a.title}</CardTitle>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {a.clubName}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">{a.description}</p>
                  <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.activityDate}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.venue}</span>
                  </div>
                  {registered ? (
                    <span className="text-xs font-medium text-success">✓ Registered</span>
                  ) : (
                    <Button size="sm" onClick={() => handleRegister(a.id)}>Register</Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { mockAnnouncements, mockMemberships } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Megaphone } from 'lucide-react';

export default function AnnouncementsPage() {
  const { user } = useAuth();

  const myClubIds = mockMemberships
    .filter(m => m.studentId === user?.id && m.membershipStatus === 'APPROVED')
    .map(m => m.clubId);

  const filtered = mockAnnouncements.filter(a => myClubIds.includes(a.clubId));
  const announcements = (filtered.length > 0 ? filtered : mockAnnouncements)
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

  return (
    <div>
      <PageHeader title="Announcements" description="News from your clubs" />

      {announcements.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/50 py-12 text-center">
          <Megaphone className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No announcements yet. Join a club to stay updated!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map(a => (
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
                <p className="mb-3 text-sm text-muted-foreground">{a.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.postedDate}</span>
                  <span>by {a.postedBy}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { mockClubs, mockMemberships } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Tag } from 'lucide-react';
import { toast } from 'sonner';
import clubRobotics from '@/assets/club-robotics.jpg';
import clubPhotography from '@/assets/club-photography.jpg';
import clubDebate from '@/assets/club-debate.jpg';
import patternBg from '@/assets/pattern-bg.png';

const clubImages: Record<string, string> = {
  'Technology': clubRobotics,
  'Arts': clubPhotography,
  'Academic': clubDebate,
};

export default function ClubListPage() {
  const { user } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const approvedClubs = mockClubs.filter(c => c.status === 'APPROVED');
  const categories = [...new Set(approvedClubs.map(c => c.category))];
  const filtered = categoryFilter === 'all' ? approvedClubs : approvedClubs.filter(c => c.category === categoryFilter);

  const handleJoin = (clubId: string) => {
    const existing = mockMemberships.find(m => m.studentId === user?.id && m.clubId === clubId);
    if (existing) {
      toast.info(`Already ${existing.membershipStatus.toLowerCase()}`);
      return;
    }
    toast.success('Join request submitted!');
  };

  return (
    <div>
      {/* Hero banner */}
      <div className="relative -mx-4 -mt-8 mb-8 overflow-hidden rounded-b-3xl px-8 py-16" style={{ background: 'var(--gradient-hero)' }}>
        <img src={patternBg} alt="" className="absolute right-0 top-0 h-full w-auto opacity-10" />
        <div className="relative z-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Discover <span className="gradient-text">Campus Clubs</span>
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Browse approved clubs, explore activities, and find your community on campus.
          </p>
          <div className="mt-6">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-52 bg-card">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(club => {
          const membership = mockMemberships.find(m => m.studentId === user?.id && m.clubId === club.id);
          const image = clubImages[club.category];
          return (
            <Card key={club.id} className="card-elevated overflow-hidden border-0">
              {image && (
                <div className="relative h-40 overflow-hidden">
                  <img src={image} alt={club.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                      <Tag className="mr-1 inline h-3 w-3" />{club.category}
                    </span>
                  </div>
                </div>
              )}
              {!image && (
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <Tag className="h-10 w-10 text-primary/30" />
                </div>
              )}
              <CardContent className="p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold">{club.name}</h3>
                  <StatusBadge status={club.status} />
                </div>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{club.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> {club.coordinatorName}
                  </span>
                  {membership ? (
                    <StatusBadge status={membership.membershipStatus} />
                  ) : (
                    <Button size="sm" onClick={() => handleJoin(club.id)}>Join Club</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

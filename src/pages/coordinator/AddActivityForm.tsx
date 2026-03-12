import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockClubs } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddActivityForm() {
  const { user } = useAuth();
  const userClubs = mockClubs.filter(c => c.coordinatorId === user?.id && c.status === 'APPROVED');
  const myClubs = userClubs.length > 0 ? userClubs : mockClubs.filter(c => c.status === 'APPROVED');
  const [clubId, setClubId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubId || !title.trim() || !date || !venue.trim()) {
      toast.error('All fields are required');
      return;
    }
    toast.success('Activity created!');
    setTitle(''); setDescription(''); setDate(''); setVenue('');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Add Activity" description="Schedule a new activity for your club" />
      <Card className="card-elevated border-0">
        <CardHeader><CardTitle className="font-heading text-lg">Activity Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Club</Label>
              <Select value={clubId} onValueChange={setClubId}>
                <SelectTrigger><SelectValue placeholder="Select your club" /></SelectTrigger>
                <SelectContent>
                  {myClubs.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Activity title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" value={venue} onChange={e => setVenue(e.target.value)} placeholder="Location" />
              </div>
            </div>
            <Button type="submit" className="w-full">Create Activity</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

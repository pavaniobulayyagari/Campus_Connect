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

export default function PostAnnouncementForm() {
  const { user } = useAuth();
  const userClubs = mockClubs.filter(c => c.coordinatorId === user?.id && c.status === 'APPROVED');
  const myClubs = userClubs.length > 0 ? userClubs : mockClubs.filter(c => c.status === 'APPROVED');
  const [clubId, setClubId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubId || !title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }
    toast.success('Announcement posted!');
    setTitle(''); setContent('');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Post Announcement" description="Share news with your club members" />
      <Card className="card-elevated border-0">
        <CardHeader><CardTitle className="font-heading text-lg">Announcement</CardTitle></CardHeader>
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
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Announcement title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="Write your announcement..." />
            </div>
            <Button type="submit" className="w-full">Publish Announcement</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

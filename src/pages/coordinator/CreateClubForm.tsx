import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const categories = ['Technology', 'Arts', 'Academic', 'Sports', 'Games', 'Social', 'Music'];

export default function CreateClubForm() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !category) {
      toast.error('All fields are required');
      return;
    }
    toast.success(`Club "${name}" submitted for admin approval!`);
    setName('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Create Club" description="Submit a new club for admin approval" />
      <Card className="card-elevated border-0">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Club Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Club Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. AI Research Club" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this club about?" rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Submit for Approval</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

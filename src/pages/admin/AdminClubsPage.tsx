import { mockClubs } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminClubsPage() {
  return (
    <div>
      <PageHeader title="Manage Clubs" description="Review, approve, or reject club submissions" />

      <Card className="card-elevated border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Coordinator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClubs.map(club => (
                <TableRow key={club.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{club.name}</span>
                      <p className="text-xs text-muted-foreground">{club.description.slice(0, 60)}...</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Tag className="h-3 w-3" /> {club.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{club.coordinatorName}</TableCell>
                  <TableCell><StatusBadge status={club.status} /></TableCell>
                  <TableCell className="text-right">
                    {club.status === 'PENDING' && (
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => toast.success(`Approved ${club.name}`)}>
                          <CheckCircle className="h-4 w-4 text-success" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toast.success(`Rejected ${club.name}`)}>
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

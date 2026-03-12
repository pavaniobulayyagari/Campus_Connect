import { mockClubs, mockMemberships, mockActivities } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function CoordinatorDashboard() {
  const { user } = useAuth();
  const userClubs = mockClubs.filter(c => c.coordinatorId === user?.id);
  const myClubs = userClubs.length > 0 ? userClubs : mockClubs.filter(c => c.status === 'APPROVED');

  return (
    <div>
      <PageHeader title="Dashboard" description="Manage your clubs, members, and activities" />

      {myClubs.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/50 py-12 text-center">
          <p className="text-muted-foreground">No clubs yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {myClubs.map(club => {
            const members = mockMemberships.filter(m => m.clubId === club.id);
            const activities = mockActivities.filter(a => a.clubId === club.id);

            return (
              <Card key={club.id} className="card-elevated border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-xl">{club.name}</CardTitle>
                    <StatusBadge status={club.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-4">
                    <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{members.filter(m => m.membershipStatus === 'APPROVED').length}</span>
                      <span className="text-muted-foreground">members</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{activities.length}</span>
                      <span className="text-muted-foreground">activities</span>
                    </div>
                  </div>

                  <Tabs defaultValue="members">
                    <TabsList>
                      <TabsTrigger value="members">Members</TabsTrigger>
                      <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>

                    <TabsContent value="members">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {members.map(m => (
                            <TableRow key={m.id}>
                              <TableCell className="font-medium">{m.studentName}</TableCell>
                              <TableCell className="text-muted-foreground">{m.requestDate}</TableCell>
                              <TableCell><StatusBadge status={m.membershipStatus} /></TableCell>
                              <TableCell className="text-right">
                                {m.membershipStatus === 'PENDING' && (
                                  <div className="flex justify-end gap-1">
                                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Approved ${m.studentName}`)}>
                                      <CheckCircle className="h-4 w-4 text-success" />
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Rejected ${m.studentName}`)}>
                                      <XCircle className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="activities">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Venue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activities.map(a => (
                            <TableRow key={a.id}>
                              <TableCell className="font-medium">{a.title}</TableCell>
                              <TableCell className="text-muted-foreground">{a.activityDate}</TableCell>
                              <TableCell className="text-muted-foreground">{a.venue}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

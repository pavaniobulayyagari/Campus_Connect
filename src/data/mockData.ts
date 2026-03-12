import { Club, Membership, Activity, Participation, Announcement, User } from '@/types';

export const mockUsers: User[] = [
  { id: '1', username: 'student1', email: 'student@uni.edu', role: 'STUDENT' },
  { id: '2', username: 'coordinator1', email: 'coord@uni.edu', role: 'COORDINATOR' },
  { id: '3', username: 'admin1', email: 'admin@uni.edu', role: 'ADMIN' },
  { id: '4', username: 'alice', email: 'alice@uni.edu', role: 'STUDENT' },
  { id: '5', username: 'bob', email: 'bob@uni.edu', role: 'COORDINATOR' },
];

export const mockClubs: Club[] = [
  { id: 'c1', name: 'Robotics Club', description: 'Build and program robots for competitions and learning.', category: 'Technology', status: 'APPROVED', coordinatorId: '2', coordinatorName: 'coordinator1' },
  { id: 'c2', name: 'Photography Society', description: 'Explore the art of photography through workshops and exhibitions.', category: 'Arts', status: 'APPROVED', coordinatorId: '5', coordinatorName: 'bob' },
  { id: 'c3', name: 'Debate Club', description: 'Sharpen your argumentation and public speaking skills.', category: 'Academic', status: 'APPROVED', coordinatorId: '2', coordinatorName: 'coordinator1' },
  { id: 'c4', name: 'Chess Club', description: 'Competitive and casual chess for all skill levels.', category: 'Games', status: 'PENDING', coordinatorId: '5', coordinatorName: 'bob' },
  { id: 'c5', name: 'Hiking Society', description: 'Weekend hiking trips and nature exploration.', category: 'Sports', status: 'REJECTED', coordinatorId: '2', coordinatorName: 'coordinator1' },
];

export const mockMemberships: Membership[] = [
  { id: 'm1', studentId: '1', studentName: 'student1', clubId: 'c1', clubName: 'Robotics Club', requestDate: '2026-01-15', membershipStatus: 'APPROVED' },
  { id: 'm2', studentId: '1', studentName: 'student1', clubId: 'c2', clubName: 'Photography Society', requestDate: '2026-02-01', membershipStatus: 'PENDING' },
  { id: 'm3', studentId: '4', studentName: 'alice', clubId: 'c1', clubName: 'Robotics Club', requestDate: '2026-02-10', membershipStatus: 'APPROVED' },
  { id: 'm4', studentId: '4', studentName: 'alice', clubId: 'c3', clubName: 'Debate Club', requestDate: '2026-03-01', membershipStatus: 'PENDING' },
];

export const mockActivities: Activity[] = [
  { id: 'a1', title: 'Robot Building Workshop', description: 'Hands-on workshop building an autonomous robot from scratch.', activityDate: '2026-03-20', venue: 'Engineering Lab 201', clubId: 'c1', clubName: 'Robotics Club' },
  { id: 'a2', title: 'Spring Photo Walk', description: 'Campus photography walk capturing spring blooms.', activityDate: '2026-04-05', venue: 'Campus Garden', clubId: 'c2', clubName: 'Photography Society' },
  { id: 'a3', title: 'Inter-University Debate', description: 'Debate competition with partner universities.', activityDate: '2026-04-12', venue: 'Auditorium A', clubId: 'c3', clubName: 'Debate Club' },
  { id: 'a4', title: 'AI & Robotics Seminar', description: 'Guest lecture on AI in modern robotics.', activityDate: '2026-05-01', venue: 'Lecture Hall 3', clubId: 'c1', clubName: 'Robotics Club' },
];

export const mockParticipations: Participation[] = [
  { id: 'p1', studentId: '1', studentName: 'student1', activityId: 'a1', activityTitle: 'Robot Building Workshop', registrationDate: '2026-03-10', attended: false },
  { id: 'p2', studentId: '4', studentName: 'alice', activityId: 'a1', activityTitle: 'Robot Building Workshop', registrationDate: '2026-03-11', attended: false },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'an1', title: 'New Robot Parts Arrived!', content: 'The Arduino kits and sensors for the workshop have arrived. Pick up yours from the lab.', postedDate: '2026-03-08', clubId: 'c1', clubName: 'Robotics Club', postedBy: 'coordinator1' },
  { id: 'an2', title: 'Photo Exhibition Submissions Open', content: 'Submit your best shots for the spring exhibition by March 30th.', postedDate: '2026-03-05', clubId: 'c2', clubName: 'Photography Society', postedBy: 'bob' },
  { id: 'an3', title: 'Debate Topics Released', content: 'This semester\'s debate topics are now available. Check the shared document.', postedDate: '2026-03-01', clubId: 'c3', clubName: 'Debate Club', postedBy: 'coordinator1' },
];

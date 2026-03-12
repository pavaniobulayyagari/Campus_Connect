export type UserRole = 'STUDENT' | 'COORDINATOR' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export type ClubStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ClubStatus;
  coordinatorId: string;
  coordinatorName: string;
}

export type MembershipStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Membership {
  id: string;
  studentId: string;
  studentName: string;
  clubId: string;
  clubName: string;
  requestDate: string;
  membershipStatus: MembershipStatus;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  activityDate: string;
  venue: string;
  clubId: string;
  clubName: string;
}

export interface Participation {
  id: string;
  studentId: string;
  studentName: string;
  activityId: string;
  activityTitle: string;
  registrationDate: string;
  attended: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedDate: string;
  clubId: string;
  clubName: string;
  postedBy: string;
}

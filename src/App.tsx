import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ClubListPage from "@/pages/student/ClubListPage";
import ActivitiesPage from "@/pages/student/ActivitiesPage";
import AnnouncementsPage from "@/pages/student/AnnouncementsPage";
import CreateClubForm from "@/pages/coordinator/CreateClubForm";
import CoordinatorDashboard from "@/pages/coordinator/CoordinatorDashboard";
import AddActivityForm from "@/pages/coordinator/AddActivityForm";
import PostAnnouncementForm from "@/pages/coordinator/PostAnnouncementForm";
import AdminClubsPage from "@/pages/admin/AdminClubsPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminReportsPage from "@/pages/admin/AdminReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<Layout />}>
              {/* Student */}
              <Route path="/student/clubs" element={<ClubListPage />} />
              <Route path="/student/activities" element={<ActivitiesPage />} />
              <Route path="/student/announcements" element={<AnnouncementsPage />} />

              {/* Coordinator */}
              <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
              <Route path="/coordinator/create-club" element={<CreateClubForm />} />
              <Route path="/coordinator/add-activity" element={<AddActivityForm />} />
              <Route path="/coordinator/post-announcement" element={<PostAnnouncementForm />} />

              {/* Admin */}
              <Route path="/admin/clubs" element={<AdminClubsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

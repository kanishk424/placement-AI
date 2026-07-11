import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout } from './layouts/StudentLayout';
import { StudentDashboard } from './pages/student/Dashboard';
import { StudentProfile } from './pages/student/Profile';
import { CodingPractice } from './pages/student/Coding';
import { AptitudeModule } from './pages/student/Aptitude';
import { AIRoadmap } from './pages/student/Roadmap';
import { Companies } from './pages/student/Companies';
import { Attendance } from './pages/student/Attendance';
import { Homework } from './pages/student/Homework';
import { Leaderboard } from './pages/student/Leaderboard';
import { Forum } from './pages/student/Forum';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { MentorDashboard } from './pages/mentor/Dashboard';
import { OfficerDashboard } from './pages/officer/Dashboard';
import { OfficerStudents } from './pages/officer/Students';
import { OfficerMentors } from './pages/officer/Mentors';
import { OfficerStaff } from './pages/officer/Staff';
import { OfficerEvents } from './pages/officer/Events';
import { OfficerAttendance } from './pages/officer/Attendance';
import { OfficerReports } from './pages/officer/Reports';

const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-bold text-text-secondary">{title} Coming Soon</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/mentor" element={<StudentLayout />}>
          <Route path="dashboard" element={<MentorDashboard />} />
        </Route>
        
        <Route path="/officer" element={<StudentLayout />}>
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="students" element={<OfficerStudents />} />
          <Route path="mentors" element={<OfficerMentors />} />
          <Route path="staff" element={<OfficerStaff />} />
          <Route path="events" element={<OfficerEvents />} />
          <Route path="attendance" element={<OfficerAttendance />} />
          <Route path="reports" element={<OfficerReports />} />
        </Route>
        
        <Route path="/external" element={<StudentLayout />}>
          <Route path="dashboard" element={<Placeholder title="External Dashboard" />} />
        </Route>
        
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="coding" element={<CodingPractice />} />
          <Route path="aptitude" element={<AptitudeModule />} />
          <Route path="communication" element={<Placeholder title="Communication" />} />
          <Route path="roadmap" element={<AIRoadmap />} />
          <Route path="companies" element={<Companies />} />
          <Route path="interviews" element={<Placeholder title="Mock Interviews" />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="homework" element={<Homework />} />
          <Route path="notes" element={<Placeholder title="Notes" />} />
          <Route path="events" element={<Placeholder title="Events" />} />
          <Route path="forum" element={<Forum />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="experience" element={<Placeholder title="Interview Hub" />} />
        </Route>
        
        <Route path="/register" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
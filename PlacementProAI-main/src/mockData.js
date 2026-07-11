// src/mockData.js

// Users
export const students = [
  { id: 'S001', rollNo: 'CSE001', name: 'Arjun Kumar', dept: 'CSE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'arjun.kumar@college.edu', phone: '+91 98765 43210', cgpa: 8.9,
    codingScore: 92, aptitudeScore: 88, communicationScore: 80,
    attendance: 96, readiness: 91, placementStatus: 'Placed', placedCompany: 'Google',
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 9, homeworkTotal: 10, lastActive: '2026-07-10T14:30:00',
    mentorNotes: ['Excellent progress in DSA', 'Needs more mock interviews'] },
  { id: 'S002', rollNo: 'CSE002', name: 'Priya Sharma', dept: 'CSE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'priya.sharma@college.edu', phone: '+91 98765 43211', cgpa: 8.5,
    codingScore: 85, aptitudeScore: 90, communicationScore: 82,
    attendance: 94, readiness: 87, placementStatus: 'Placed', placedCompany: 'TCS',
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 10, homeworkTotal: 10, lastActive: '2026-07-10T10:15:00',
    mentorNotes: ['Strong aptitude skills', 'Good team player'] },
  { id: 'S003', rollNo: 'CSE003', name: 'Kiran M', dept: 'CSE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'kiran.m@college.edu', phone: '+91 98765 43212', cgpa: 7.2,
    codingScore: 68, aptitudeScore: 72, communicationScore: 65,
    attendance: 78, readiness: 64, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Medium', assignedMentorId: 'M002',
    homeworkCompleted: 6, homeworkTotal: 10, lastActive: '2026-07-09T18:20:00',
    mentorNotes: ['Attendance needs improvement', 'Follow up on coding practice'] },
  { id: 'S004', rollNo: 'CSE004', name: 'Ravi Prasad', dept: 'CSE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'ravi.prasad@college.edu', phone: '+91 98765 43213', cgpa: 8.1,
    codingScore: 82, aptitudeScore: 78, communicationScore: 75,
    attendance: 88, readiness: 80, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 8, homeworkTotal: 10, lastActive: '2026-07-10T09:00:00',
    mentorNotes: ['Good coding fundamentals'] },
  { id: 'S005', rollNo: 'CSE005', name: 'Deepa R', dept: 'CSE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026304d',
    email: 'deepa.r@college.edu', phone: '+91 98765 43214', cgpa: 7.8,
    codingScore: 74, aptitudeScore: 70, communicationScore: 72,
    attendance: 82, readiness: 72, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Medium', assignedMentorId: 'M002',
    homeworkCompleted: 7, homeworkTotal: 10, lastActive: '2026-07-08T16:45:00',
    mentorNotes: ['Needs more aptitude practice'] },
  { id: 'S006', rollNo: 'IT001', name: 'Sneha Patel', dept: 'IT', year: '3rd', section: 'B', avatar: 'https://i.pravatar.cc/150?u=sneha001',
    email: 'sneha.patel@college.edu', phone: '+91 98765 43215', cgpa: 8.3,
    codingScore: 80, aptitudeScore: 82, communicationScore: 78,
    attendance: 90, readiness: 81, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 8, homeworkTotal: 10, lastActive: '2026-07-10T11:30:00',
    mentorNotes: ['Consistent performer'] },
  { id: 'S007', rollNo: 'IT002', name: 'Amit Verma', dept: 'IT', year: '3rd', section: 'B', avatar: 'https://i.pravatar.cc/150?u=amit002',
    email: 'amit.verma@college.edu', phone: '+91 98765 43216', cgpa: 6.8,
    codingScore: 55, aptitudeScore: 60, communicationScore: 58,
    attendance: 62, readiness: 52, placementStatus: 'Not Placed', placedCompany: null,
    riskLevel: 'High', assignedMentorId: 'M002',
    homeworkCompleted: 3, homeworkTotal: 10, lastActive: '2026-07-05T12:00:00',
    mentorNotes: ['High risk - low attendance', 'Needs immediate intervention'] },
  { id: 'S008', rollNo: 'IT003', name: 'Neha Singh', dept: 'IT', year: '3rd', section: 'B', avatar: 'https://i.pravatar.cc/150?u=neha003',
    email: 'neha.singh@college.edu', phone: '+91 98765 43217', cgpa: 7.9,
    codingScore: 76, aptitudeScore: 74, communicationScore: 80,
    attendance: 86, readiness: 75, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 8, homeworkTotal: 10, lastActive: '2026-07-10T08:15:00',
    mentorNotes: ['Good communication skills'] },
  { id: 'S009', rollNo: 'ECE001', name: 'Rahul Reddy', dept: 'ECE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=rahul001',
    email: 'rahul.reddy@college.edu', phone: '+91 98765 43218', cgpa: 7.5,
    codingScore: 70, aptitudeScore: 72, communicationScore: 68,
    attendance: 80, readiness: 68, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Medium', assignedMentorId: 'M002',
    homeworkCompleted: 6, homeworkTotal: 10, lastActive: '2026-07-09T14:00:00',
    mentorNotes: ['Needs focus on coding'] },
  { id: 'S010', rollNo: 'ECE002', name: 'Ananya Iyer', dept: 'ECE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=ananya002',
    email: 'ananya.iyer@college.edu', phone: '+91 98765 43219', cgpa: 8.7,
    codingScore: 84, aptitudeScore: 86, communicationScore: 82,
    attendance: 92, readiness: 85, placementStatus: 'Placed', placedCompany: 'Infosys',
    riskLevel: 'Low', assignedMentorId: 'M001',
    homeworkCompleted: 10, homeworkTotal: 10, lastActive: '2026-07-10T16:00:00',
    mentorNotes: ['Top performer in ECE'] },
  { id: 'S011', rollNo: 'ECE003', name: 'Vikram Joshi', dept: 'ECE', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=vikram003',
    email: 'vikram.joshi@college.edu', phone: '+91 98765 43220', cgpa: 6.5,
    codingScore: 48, aptitudeScore: 55, communicationScore: 52,
    attendance: 58, readiness: 45, placementStatus: 'Not Placed', placedCompany: null,
    riskLevel: 'High', assignedMentorId: 'M002',
    homeworkCompleted: 2, homeworkTotal: 10, lastActive: '2026-07-02T10:00:00',
    mentorNotes: ['Critical - very low scores', 'Schedule counseling session'] },
  { id: 'S012', rollNo: 'MECH001', name: 'Suresh Babu', dept: 'MECH', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=suresh001',
    email: 'suresh.babu@college.edu', phone: '+91 98765 43221', cgpa: 7.0,
    codingScore: 60, aptitudeScore: 65, communicationScore: 62,
    attendance: 72, readiness: 58, placementStatus: 'Not Placed', placedCompany: null,
    riskLevel: 'High', assignedMentorId: 'M002',
    homeworkCompleted: 4, homeworkTotal: 10, lastActive: '2026-07-07T13:00:00',
    mentorNotes: ['MECH dept - needs extra aptitude sessions'] },
  { id: 'S013', rollNo: 'MECH002', name: 'Lakshmi N', dept: 'MECH', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=lakshmi002',
    email: 'lakshmi.n@college.edu', phone: '+91 98765 43222', cgpa: 7.6,
    codingScore: 66, aptitudeScore: 68, communicationScore: 70,
    attendance: 76, readiness: 63, placementStatus: 'In Progress', placedCompany: null,
    riskLevel: 'Medium', assignedMentorId: 'M002',
    homeworkCompleted: 5, homeworkTotal: 10, lastActive: '2026-07-09T11:00:00',
    mentorNotes: ['Improving slowly'] },
  { id: 'S014', rollNo: 'MECH003', name: 'Karthik M', dept: 'MECH', year: '3rd', section: 'A', avatar: 'https://i.pravatar.cc/150?u=karthik003',
    email: 'karthik.m@college.edu', phone: '+91 98765 43223', cgpa: 6.2,
    codingScore: 42, aptitudeScore: 50, communicationScore: 48,
    attendance: 55, readiness: 40, placementStatus: 'Not Placed', placedCompany: null,
    riskLevel: 'High', assignedMentorId: 'M002',
    homeworkCompleted: 1, homeworkTotal: 10, lastActive: '2026-06-28T09:00:00',
    mentorNotes: ['Very high risk - consider special coaching'] },
];

export const mentors = [
  { id: 'M001', empId: 'M-101', name: 'Dr. Priya', type: 'Coding', studentsCount: 5, avgScore: 82, tasksAssigned: 24, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    email: 'priya.dr@college.edu', phone: '+91 98000 11001', pendingReviews: 3 },
  { id: 'M002', empId: 'M-102', name: 'Mr. Rajan', type: 'Aptitude', studentsCount: 9, avgScore: 62, tasksAssigned: 18, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    email: 'rajan.mr@college.edu', phone: '+91 98000 11002', pendingReviews: 7 },
  { id: 'M003', empId: 'M-103', name: 'Ms. Divya', type: 'Communication', studentsCount: 0, avgScore: 0, tasksAssigned: 6, avatar: 'https://i.pravatar.cc/150?u=divya003',
    email: 'divya.ms@college.edu', phone: '+91 98000 11003', pendingReviews: 0 },
];

export const officers = [
  { id: 'O001', empId: 'PO-001', name: 'Ms. Kavitha', role: 'Placement Officer' }
];

export const currentUser = students[2]; // Kiran M as per prompt highlight

// Assistant Staff
export const assistantStaff = [
  { id: 'ST001', name: 'Ramesh Kumar', role: 'Coordinator', dept: 'CSE', contact: '+91 98000 22001', email: 'ramesh@college.edu' },
  { id: 'ST002', name: 'Sita Devi', role: 'Admin Assistant', dept: 'IT', contact: '+91 98000 22002', email: 'sita@college.edu' },
  { id: 'ST003', name: 'John Paul', role: 'Lab Incharge', dept: 'ECE', contact: '+91 98000 22003', email: 'john@college.edu' },
];

// Placement Events
export const placementEvents = [
  { id: 'PE001', title: 'TCS NQT Drive', date: '2026-07-15', type: 'Drive', organizer: 'TCS', participants: 120, status: 'Upcoming' },
  { id: 'PE002', title: 'Infosys InfoTalent', date: '2026-07-20', type: 'Drive', organizer: 'Infosys', participants: 95, status: 'Upcoming' },
  { id: 'PE003', title: 'CodeStorm Hackathon', date: '2026-07-12', type: 'Hackathon', organizer: 'College Tech Club', participants: 60, status: 'Ongoing' },
  { id: 'PE004', title: 'AI/ML Workshop', date: '2026-07-18', type: 'Workshop', organizer: 'Google Developer Group', participants: 80, status: 'Upcoming' },
  { id: 'PE005', title: 'Resume Building Workshop', date: '2026-07-05', type: 'Workshop', organizer: 'Placement Cell', participants: 150, status: 'Completed' },
  { id: 'PE006', title: 'Zoho Coding Contest', date: '2026-06-28', type: 'Hackathon', organizer: 'Zoho', participants: 45, status: 'Completed' },
  { id: 'PE007', title: 'Cognizant GenC Next', date: '2026-07-25', type: 'Drive', organizer: 'Cognizant', participants: 110, status: 'Upcoming' },
];

// Attendance Log
export const attendanceLog = [
  { id: 'AL001', date: '2026-07-10', dept: 'CSE', studentId: 'S001', status: 'Present' },
  { id: 'AL002', date: '2026-07-10', dept: 'CSE', studentId: 'S002', status: 'Present' },
  { id: 'AL003', date: '2026-07-10', dept: 'CSE', studentId: 'S003', status: 'Absent' },
  { id: 'AL004', date: '2026-07-10', dept: 'CSE', studentId: 'S004', status: 'Present' },
  { id: 'AL005', date: '2026-07-10', dept: 'CSE', studentId: 'S005', status: 'Present' },
  { id: 'AL006', date: '2026-07-10', dept: 'IT', studentId: 'S006', status: 'Present' },
  { id: 'AL007', date: '2026-07-10', dept: 'IT', studentId: 'S007', status: 'Absent' },
  { id: 'AL008', date: '2026-07-10', dept: 'IT', studentId: 'S008', status: 'Present' },
  { id: 'AL009', date: '2026-07-10', dept: 'ECE', studentId: 'S009', status: 'Present' },
  { id: 'AL010', date: '2026-07-10', dept: 'ECE', studentId: 'S010', status: 'Present' },
  { id: 'AL011', date: '2026-07-10', dept: 'ECE', studentId: 'S011', status: 'Absent' },
  { id: 'AL012', date: '2026-07-10', dept: 'MECH', studentId: 'S012', status: 'Absent' },
  { id: 'AL013', date: '2026-07-10', dept: 'MECH', studentId: 'S013', status: 'Present' },
  { id: 'AL014', date: '2026-07-10', dept: 'MECH', studentId: 'S014', status: 'Absent' },
  { id: 'AL015', date: '2026-07-09', dept: 'CSE', studentId: 'S001', status: 'Present' },
  { id: 'AL016', date: '2026-07-09', dept: 'CSE', studentId: 'S003', status: 'Present' },
  { id: 'AL017', date: '2026-07-09', dept: 'IT', studentId: 'S007', status: 'Absent' },
  { id: 'AL018', date: '2026-07-09', dept: 'MECH', studentId: 'S014', status: 'Absent' },
];

// Mentor Communication Log
export const mentorCommunicationLog = [
  { id: 'CL001', mentorId: 'M002', message: 'Please follow up with Kiran M on attendance — dropped below 80% this week.', sentBy: 'Ms. Kavitha', timestamp: '2026-07-10T09:30:00' },
  { id: 'CL002', mentorId: 'M002', message: 'Amit Verma (IT002) needs immediate counseling. Very low engagement.', sentBy: 'Ms. Kavitha', timestamp: '2026-07-09T14:15:00' },
  { id: 'CL003', mentorId: 'M001', message: 'Great work with Arjun — he got shortlisted for Google. Please prepare him for the interview round.', sentBy: 'Ms. Kavitha', timestamp: '2026-07-08T11:00:00' },
];

// Monthly Placement Trend (for charts)
export const monthlyPlacementTrend = [
  { month: 'Jan', placed: 12 },
  { month: 'Feb', placed: 18 },
  { month: 'Mar', placed: 25 },
  { month: 'Apr', placed: 32 },
  { month: 'May', placed: 48 },
  { month: 'Jun', placed: 65 },
  { month: 'Jul', placed: 38 },
];

// Placement Status Distribution (for pie chart)
export const placementStatusDistribution = [
  { name: 'Placed', value: 3, color: '#10B981' },
  { name: 'In Progress', value: 6, color: '#6366F1' },
  { name: 'Not Placed', value: 5, color: '#EF4444' },
];

// Academics
export const codingProblems = [
  { id: 'P001', number: '001', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', status: 'Solved' },
  { id: 'P002', number: '002', title: 'Reverse Linked List', difficulty: 'Medium', topic: 'LinkedList', status: 'Solved' },
  { id: 'P003', number: '003', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Trees', status: 'Pending' },
  { id: 'P004', number: '004', title: 'Longest Substring Without Repeating Characters', difficulty: 'Hard', topic: 'Strings', status: 'Unsolved' },
  { id: 'P005', number: '005', title: 'Coin Change', difficulty: 'Hard', topic: 'DP', status: 'Unsolved' },
  { id: 'P006', number: '006', title: 'Merge Intervals', difficulty: 'Medium', topic: 'Arrays', status: 'Solved' },
  { id: 'P007', number: '007', title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks', status: 'Solved' },
  { id: 'P008', number: '008', title: 'Course Schedule', difficulty: 'Medium', topic: 'Graphs', status: 'Pending' },
];

export const aptitudeQuestions = [
  { id: 'Q001', text: 'A train 120 meters long is running with a speed of 60 km/hr. In what time will it pass a boy who is running at 6 km/hr in the direction opposite to that in which the train is going?', options: ['6.54 sec', '44.32 sec', '55 sec', '30.2 sec'], correct: '6.54 sec', topic: 'Time & Distance' },
  { id: 'Q002', text: 'Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.', options: ['4', '7', '9', '13'], correct: '4', topic: 'HCF & LCM' },
];

export const companies = [
  { id: 'C001', name: 'TCS', process: 'Written Test → Technical Interview → HR Interview', package: '3.36 LPA', difficulty: 'Moderate', hiringMode: 'Mass Recruitment (NQT)', logo: 'https://logo.clearbit.com/tcs.com' },
  { id: 'C002', name: 'Infosys', process: 'Online Test → Technical Interview → HR Interview', package: '3.6 LPA', difficulty: 'Moderate', hiringMode: 'Mass Recruitment', logo: 'https://logo.clearbit.com/infosys.com' },
  { id: 'C003', name: 'Zoho', process: 'Aptitude → Programming → Advanced Programming → Technical HR → General HR', package: '6.5 LPA', difficulty: 'Hard', hiringMode: 'Product Based', logo: 'https://logo.clearbit.com/zoho.com' },
  { id: 'C004', name: 'Cognizant', process: 'Aptitude → Technical → HR', package: '4.0 LPA', difficulty: 'Moderate', hiringMode: 'Mass Recruitment', logo: 'https://logo.clearbit.com/cognizant.com' },
  { id: 'C005', name: 'Google', process: 'Phone Screen → 4x Technical → Googlyness', package: '32 LPA', difficulty: 'Very Hard', hiringMode: 'Product Based', logo: 'https://logo.clearbit.com/google.com' },
];

export const events = [
  { id: 'E001', title: 'TCS NQT Drive', date: 'Jun 25, 2026', type: 'Placement' },
  { id: 'E002', title: 'Zoho Coding Contest', date: 'Jun 28, 2026', type: 'Contest' },
  { id: 'E003', title: 'Resume Workshop', date: 'Jul 2, 2026', type: 'Workshop' },
  { id: 'E004', title: 'Infosys Mock Test', date: 'Jul 5, 2026', type: 'Test' },
];

export const homeworks = [
  { id: 'HW001', title: 'Arrays & Strings Problem Set', assignedBy: 'Dr. Priya', type: 'Coding', due: 'Tomorrow', status: 'Pending', points: 10 },
  { id: 'HW002', title: 'Logical Reasoning Mock Test', assignedBy: 'Mr. Rajan', type: 'Aptitude', due: 'Submitted', status: 'Submitted', score: '8/10', feedback: 'Good work on syllogisms!' },
  { id: 'HW003', title: 'HR Interview Prep', assignedBy: 'Ms. Kavitha', type: 'Communication', due: 'Jun 22, 2026', status: 'Pending', points: 5 },
];

export const leaderboard = [
  { rank: 1, name: 'Arjun Kumar', score: 94, coding: 95, aptitude: 91, attendance: 98, isSelf: false },
  { rank: 2, name: 'Priya Sharma', score: 91, coding: 88, aptitude: 94, attendance: 96, isSelf: false },
  { rank: 3, name: 'Ravi Prasad', score: 89, coding: 90, aptitude: 86, attendance: 94, isSelf: false },
  { rank: 12, name: 'Kiran M', score: 74, coding: 72, aptitude: 78, attendance: 91, isSelf: true },
];

export const forumPosts = [
  { id: 'F001', title: 'How to approach DP on Trees?', author: 'Arjun Kumar', replies: 12, time: '3h ago', status: 'SOLVED', tag: 'Coding Doubts' },
  { id: 'F002', title: 'TCS NQT Exam Pattern 2026 - Tips?', author: 'Priya S', replies: 5, time: '1d ago', status: 'OPEN', tag: 'General' },
];

// Generate 365 days of mock activity for heatmap
const generateHeatmap = () => {
  const data = [];
  const today = new Date('2026-06-18');
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (365 - i));
    const count = Math.random() > 0.4 ? Math.floor(Math.random() * 5) : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }
  return data;
};

export const codingHeatmap = generateHeatmap();

export const placementStats = {
  readiness: {
    CSE: 84,
    IT: 76,
    ECE: 68,
    MECH: 52,
  },
  drives: [
    { company: 'TCS NQT', date: 'Jun 15', applied: 234, shortlisted: 89, selected: 45 },
    { company: 'Infosys', date: 'Jun 10', applied: 180, shortlisted: 67, selected: 28 },
    { company: 'Zoho', date: 'Jun 5', applied: 45, shortlisted: 22, selected: 18 },
  ]
};
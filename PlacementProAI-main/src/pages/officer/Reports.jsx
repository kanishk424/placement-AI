import { Download, Printer } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { students, placementStats, monthlyPlacementTrend, placementStatusDistribution } from "../../mockData";
import { Button } from "../../components/Button";

export function OfficerReports() {
  // Dept-wise readiness for bar chart
  const deptReadinessData = Object.entries(placementStats.readiness).map(([dept, score]) => ({
    dept,
    readiness: score,
  }));

  const handleExportCSV = () => {
    const headers = ['Roll No', 'Name', 'Department', 'Year', 'Section', 'CGPA', 'Coding', 'Aptitude', 'Communication', 'Attendance', 'Readiness', 'Status', 'Company', 'Risk', 'Mentor'];
    const rows = students.map(s => [
      s.rollNo, s.name, s.dept, s.year, s.section, s.cgpa,
      s.codingScore, s.aptitudeScore, s.communicationScore,
      s.attendance, s.readiness, s.placementStatus,
      s.placedCompany || '', s.riskLevel, s.assignedMentorId,
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Reports & Analytics</h2>
            <p className="text-text-secondary text-sm mt-1">Placement trends, department performance, and data exports.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCSV}><Download size={16} className="mr-2" /> Export CSV</Button>
            <Button variant="outline" onClick={handlePrint}><Printer size={16} className="mr-2" /> Print Report</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Dept-wise Readiness */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4">Department-wise Readiness</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptReadinessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px' }} />
              <Bar dataKey="readiness" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Placement Distribution */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4">Placement Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={placementStatusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {placementStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart: Monthly Trend */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-4">Monthly Placement Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyPlacementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="placed" stroke="#6366F1" strokeWidth={3} dot={{ fill: '#6366F1', r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-4">Quick Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-alt rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{students.length}</div>
            <div className="text-xs text-text-muted mt-1">Total Students</div>
          </div>
          <div className="bg-surface-alt rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{students.filter(s => s.placementStatus === 'Placed').length}</div>
            <div className="text-xs text-text-muted mt-1">Placed</div>
          </div>
          <div className="bg-surface-alt rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning">{students.filter(s => s.riskLevel === 'High').length}</div>
            <div className="text-xs text-text-muted mt-1">High Risk</div>
          </div>
          <div className="bg-surface-alt rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-text-primary">{Math.round(students.reduce((s, x) => s + x.attendance, 0) / students.length)}%</div>
            <div className="text-xs text-text-muted mt-1">Avg Attendance</div>
          </div>
        </div>
      </div>
    </div>
  );
}
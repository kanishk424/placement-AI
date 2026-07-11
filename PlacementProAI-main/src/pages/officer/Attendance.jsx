import { useState, useEffect } from "react";
import { QrCode, X, Clock } from "lucide-react";
import { students, attendanceLog as initialLog, placementStats } from "../../mockData";
import { Button } from "../../components/Button";
import { BadgePill } from "../../components/BadgePill";

export function OfficerAttendance() {
  const [log, setLog] = useState(initialLog);
  const [selectedDept, setSelectedDept] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrTimer, setQrTimer] = useState(300); // 5 minutes

  const depts = ['All', ...Object.keys(placementStats.readiness)];

  // QR countdown
  useEffect(() => {
    if (!showQR) return;
    if (qrTimer <= 0) {
      setShowQR(false);
      setQrTimer(300);
      return;
    }
    const interval = setInterval(() => setQrTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [showQR, qrTimer]);

  // Department-wise attendance from students data (single source of truth)
  const deptAttendance = depts.filter(d => d !== 'All').map(dept => {
    const deptStudents = students.filter(s => s.dept === dept);
    const avg = deptStudents.length > 0 ? Math.round(deptStudents.reduce((sum, s) => sum + s.attendance, 0) / deptStudents.length) : 0;
    return { dept, avg, count: deptStudents.length };
  });

  // Filtered log
  const filteredLog = log.filter(entry => {
    const matchDept = selectedDept === 'All' || entry.dept === selectedDept;
    const matchDate = !filterDate || entry.date === filterDate;
    return matchDept && matchDate;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const toggleAttendance = (entryId) => {
    setLog(prev => prev.map(e => e.id === entryId ? { ...e, status: e.status === 'Present' ? 'Absent' : 'Present' } : e));
  };

  const getStudentName = (studentId) => {
    const s = students.find(x => x.id === studentId);
    return s ? s.name : studentId;
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Attendance Overview</h2>
            <p className="text-text-secondary text-sm mt-1">Department-wise attendance tracking and QR session management.</p>
          </div>
          <Button onClick={() => { setShowQR(true); setQrTimer(300); }}><QrCode size={16} className="mr-2" /> Generate QR Session</Button>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-4">Department-wise Attendance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deptAttendance.map(({ dept, avg, count }) => (
            <div key={dept} className="bg-surface-alt rounded-lg p-4 border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-text-primary">{dept}</span>
                <span className="text-xs text-text-muted">{count} students</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full ${avg >= 80 ? 'bg-success' : avg >= 65 ? 'bg-primary' : 'bg-danger'}`}
                    style={{ width: `${avg}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-text-primary">{avg}%</span>
              </div>
              <button
                onClick={() => setSelectedDept(dept)}
                className="text-xs text-primary hover:underline mt-2"
              >
                View students →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Student Attendance (drill-down) */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h3 className="font-semibold text-text-primary">
            Individual Attendance {selectedDept !== 'All' && `— ${selectedDept}`}
          </h3>
          <div className="flex gap-3">
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm">
              {depts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
            </select>
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" />
            {filterDate && <Button size="sm" variant="ghost" onClick={() => setFilterDate('')}>Clear</Button>}
          </div>
        </div>

        {selectedDept !== 'All' || filterDate ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-text-secondary">
                  <th className="py-3 px-4 font-medium">Student</th>
                  <th className="py-3 px-4 font-medium">Dept</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLog.map(entry => (
                  <tr key={entry.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-text-primary">{getStudentName(entry.studentId)}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{entry.dept}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{entry.date}</td>
                    <td className="py-3 px-4">
                      <BadgePill variant={entry.status === 'Present' ? 'success' : 'danger'}>{entry.status}</BadgePill>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => toggleAttendance(entry.id)} className="text-xs text-primary hover:underline">
                        Mark {entry.status === 'Present' ? 'Absent' : 'Present'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLog.length === 0 && (
                  <tr><td colSpan="5" className="py-8 text-center text-text-muted">No attendance records for this filter.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-text-secondary">
                  <th className="py-3 px-4 font-medium">Student</th>
                  <th className="py-3 px-4 font-medium">Roll No</th>
                  <th className="py-3 px-4 font-medium">Dept</th>
                  <th className="py-3 px-4 font-medium">Overall Attendance</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.filter(s => selectedDept === 'All' || s.dept === selectedDept).map(s => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-text-primary">{s.name}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{s.rollNo}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{s.dept}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-surface-alt rounded-full overflow-hidden">
                          <div className={`h-full ${s.attendance >= 80 ? 'bg-success' : s.attendance >= 65 ? 'bg-primary' : 'bg-danger'}`} style={{ width: `${s.attendance}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-text-primary">{s.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <BadgePill variant={s.attendance >= 80 ? 'success' : s.attendance >= 65 ? 'warning' : 'danger'}>
                        {s.attendance >= 80 ? 'Good' : s.attendance >= 65 ? 'Fair' : 'Critical'}
                      </BadgePill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QR Session Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">QR Attendance Session</h3>
              <button onClick={() => setShowQR(false)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
            </div>
            <div className="bg-white border-2 border-dashed border-border rounded-xl p-8 mb-4 flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated QR pattern */}
                <div className="grid grid-cols-8 gap-0.5 w-40 h-40">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-text-primary' : 'bg-white'}`}></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center border-2 border-primary">
                    <span className="text-xs font-bold text-primary">P</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={16} className={qrTimer < 60 ? 'text-danger animate-pulse' : 'text-text-secondary'} />
              <span className={`text-2xl font-bold font-mono ${qrTimer < 60 ? 'text-danger' : 'text-text-primary'}`}>
                {formatTimer(qrTimer)}
              </span>
            </div>
            <p className="text-xs text-text-muted">Session expires when timer reaches 0:00</p>
          </div>
        </div>
      )}
    </div>
  );
}
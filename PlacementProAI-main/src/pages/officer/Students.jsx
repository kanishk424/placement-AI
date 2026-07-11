import { useState, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, X, Eye, AlertTriangle, Mail, Phone, BookOpen } from "lucide-react";
import { students as initialStudents, mentors } from "../../mockData";
import { Button } from "../../components/Button";
import { BadgePill } from "../../components/BadgePill";

export function OfficerStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterRisk, setFilterRisk] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMentor, setFilterMentor] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const depts = ["All", ...new Set(students.map(s => s.dept))];
  const years = ["All", ...new Set(students.map(s => s.year))];
  const risks = ["All", "Low", "Medium", "High"];
  const statuses = ["All", "Placed", "In Progress", "Not Placed"];
  const mentorList = ["All", ...mentors.map(m => m.name)];

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(search.toLowerCase());
      const matchDept = filterDept === "All" || s.dept === filterDept;
      const matchYear = filterYear === "All" || s.year === filterYear;
      const matchRisk = filterRisk === "All" || s.riskLevel === filterRisk;
      const matchStatus = filterStatus === "All" || s.placementStatus === filterStatus;
      const mentor = mentors.find(m => m.id === s.assignedMentorId);
      const matchMentor = filterMentor === "All" || (mentor && mentor.name === filterMentor);
      return matchSearch && matchDept && matchYear && matchRisk && matchStatus && matchMentor;
    });
  }, [students, search, filterDept, filterYear, filterRisk, filterStatus, filterMentor]);

  const getMentorName = (mentorId) => {
    const m = mentors.find(x => x.id === mentorId);
    return m ? m.name : "Unassigned";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAdd = (newStudent) => {
    const id = `S${String(students.length + 1).padStart(3, '0')}`;
    setStudents(prev => [...prev, { ...newStudent, id }]);
    setShowAddModal(false);
  };

  const handleEdit = (updated) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    setEditStudent(null);
  };

  const riskVariant = (level) => {
    if (level === "High") return "danger";
    if (level === "Medium") return "warning";
    return "success";
  };

  const statusVariant = (status) => {
    if (status === "Placed") return "success";
    if (status === "In Progress") return "primary";
    return "neutral";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Students Management</h2>
            <p className="text-text-secondary text-sm mt-1">Full visibility into every student's placement readiness.</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}><Plus size={16} className="mr-2" /> Add Student</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-alt border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:bg-surface transition-all"
            />
          </div>
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm text-text-primary">
            {depts.map(d => <option key={d} value={d}>{d === "All" ? "All Depts" : d}</option>)}
          </select>
          <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm text-text-primary">
            {years.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
          </select>
          <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm text-text-primary">
            {risks.map(r => <option key={r} value={r}>{r === "All" ? "All Risks" : r}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm text-text-primary">
            {statuses.map(s => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
          </select>
          <select value={filterMentor} onChange={(e) => setFilterMentor(e.target.value)} className="bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm text-text-primary">
            {mentorList.map(m => <option key={m} value={m}>{m === "All" ? "All Mentors" : m}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-alt text-sm text-text-secondary">
                <th className="py-3 px-4 font-medium">Student</th>
                <th className="py-3 px-4 font-medium">Dept</th>
                <th className="py-3 px-4 font-medium">Readiness</th>
                <th className="py-3 px-4 font-medium">Attendance</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Risk</th>
                <th className="py-3 px-4 font-medium">Mentor</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-text-primary text-sm">{s.name}</div>
                        <div className="text-xs text-text-muted">{s.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{s.dept} - {s.year}/{s.section}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-surface-alt rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${s.readiness}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-text-primary">{s.readiness}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${s.attendance < 75 ? 'text-danger' : 'text-text-primary'}`}>{s.attendance}%</span>
                  </td>
                  <td className="py-3 px-4"><BadgePill variant={statusVariant(s.placementStatus)}>{s.placementStatus}</BadgePill></td>
                  <td className="py-3 px-4"><BadgePill variant={riskVariant(s.riskLevel)}>{s.riskLevel}</BadgePill></td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{getMentorName(s.assignedMentorId)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedStudent(s)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary hover:text-primary transition-colors" title="View"><Eye size={15} /></button>
                      <button onClick={() => setEditStudent(s)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary hover:text-primary transition-colors" title="Edit"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary hover:text-danger transition-colors" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" className="py-8 text-center text-text-muted">No students match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedStudent && <StudentDetailDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} getMentorName={getMentorName} />}

      {/* Add/Edit Modal */}
      {(showAddModal || editStudent) && (
        <StudentFormModal
          student={editStudent}
          onClose={() => { setShowAddModal(false); setEditStudent(null); }}
          onSave={editStudent ? handleEdit : handleAdd}
          mentors={mentors}
        />
      )}
    </div>
  );
}

function StudentDetailDrawer({ student, onClose, getMentorName }) {
  const mentor = mentors.find(m => m.id === student.assignedMentorId);
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-lg bg-surface border-l border-border h-full overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between z-10">
          <h3 className="font-bold text-text-primary text-lg">Student Profile</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
            <div>
              <h4 className="text-xl font-bold text-text-primary">{student.name}</h4>
              <p className="text-sm text-text-secondary">{student.rollNo} • {student.dept} {student.year}/{student.section}</p>
              <div className="flex gap-2 mt-2">
                <BadgePill variant={student.placementStatus === 'Placed' ? 'success' : student.placementStatus === 'In Progress' ? 'primary' : 'neutral'}>{student.placementStatus}</BadgePill>
                <BadgePill variant={student.riskLevel === 'High' ? 'danger' : student.riskLevel === 'Medium' ? 'warning' : 'success'}>{student.riskLevel} Risk</BadgePill>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-surface-alt rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-text-muted" /><span className="text-text-secondary">{student.email}</span></div>
            <div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-text-muted" /><span className="text-text-secondary">{student.phone}</span></div>
          </div>

          {/* Academic Performance */}
          <div>
            <h5 className="font-semibold text-text-primary mb-3">Academic Performance</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-alt rounded-lg p-3">
                <div className="text-xs text-text-muted">CGPA</div>
                <div className="text-lg font-bold text-text-primary">{student.cgpa}</div>
              </div>
              <div className="bg-surface-alt rounded-lg p-3">
                <div className="text-xs text-text-muted">Readiness</div>
                <div className="text-lg font-bold text-primary">{student.readiness}%</div>
              </div>
              <div className="bg-surface-alt rounded-lg p-3">
                <div className="text-xs text-text-muted">Attendance</div>
                <div className={`text-lg font-bold ${student.attendance < 75 ? 'text-danger' : 'text-success'}`}>{student.attendance}%</div>
              </div>
              <div className="bg-surface-alt rounded-lg p-3">
                <div className="text-xs text-text-muted">Homework</div>
                <div className="text-lg font-bold text-text-primary">{student.homeworkCompleted}/{student.homeworkTotal}</div>
              </div>
            </div>
          </div>

          {/* Scores */}
          <div>
            <h5 className="font-semibold text-text-primary mb-3">Skill Scores</h5>
            <div className="space-y-3">
              <ScoreBar label="Coding" value={student.codingScore} />
              <ScoreBar label="Aptitude" value={student.aptitudeScore} />
              <ScoreBar label="Communication" value={student.communicationScore} />
            </div>
          </div>

          {/* Assigned Mentor */}
          {mentor && (
            <div>
              <h5 className="font-semibold text-text-primary mb-3">Assigned Mentor</h5>
              <div className="bg-surface-alt rounded-lg p-4 flex items-center gap-3">
                <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-text-primary">{mentor.name}</div>
                  <div className="text-xs text-text-muted">{mentor.type} Mentor • {mentor.empId}</div>
                  <div className="text-xs text-text-secondary mt-1">{mentor.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Mentor Notes */}
          {student.mentorNotes && student.mentorNotes.length > 0 && (
            <div>
              <h5 className="font-semibold text-text-primary mb-3 flex items-center gap-2"><BookOpen size={16} /> Mentor Notes</h5>
              <div className="space-y-2">
                {student.mentorNotes.map((note, i) => (
                  <div key={i} className="bg-surface-alt rounded-lg p-3 text-sm text-text-secondary border-l-2 border-primary/40">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Active */}
          <div className="text-xs text-text-muted">
            Last active: {new Date(student.lastActive).toLocaleString()}
          </div>

          {student.placedCompany && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="text-xs text-success font-medium">Placed At</div>
              <div className="text-lg font-bold text-success">{student.placedCompany}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  const color = value >= 80 ? 'bg-success' : value >= 60 ? 'bg-primary' : value >= 40 ? 'bg-warning' : 'bg-danger';
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">{value}/100</span>
      </div>
      <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function StudentFormModal({ student, onClose, onSave, mentors }) {
  const [form, setForm] = useState(student || {
    rollNo: '', name: '', dept: 'CSE', year: '3rd', section: 'A',
    email: '', phone: '', cgpa: 7.0, codingScore: 50, aptitudeScore: 50,
    communicationScore: 50, attendance: 80, readiness: 60,
    placementStatus: 'Not Placed', placedCompany: '', riskLevel: 'Medium',
    assignedMentorId: mentors[0]?.id || '', homeworkCompleted: 0, homeworkTotal: 10,
    avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
    mentorNotes: [], lastActive: new Date().toISOString(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-bold text-text-primary text-lg">{student ? 'Edit Student' : 'Add New Student'}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"><input required value={form.name} onChange={(e) => update('name', e.target.value)} className="form-input" /></Field>
            <Field label="Roll No"><input required value={form.rollNo} onChange={(e) => update('rollNo', e.target.value)} className="form-input" /></Field>
            <Field label="Department">
              <select value={form.dept} onChange={(e) => update('dept', e.target.value)} className="form-input">
                {['CSE','IT','ECE','MECH'].map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Year">
              <select value={form.year} onChange={(e) => update('year', e.target.value)} className="form-input">
                {['1st','2nd','3rd','4th'].map(y => <option key={y}>{y}</option>)}
              </select>
            </Field>
            <Field label="Section"><input value={form.section} onChange={(e) => update('section', e.target.value)} className="form-input" /></Field>
            <Field label="Email"><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="form-input" /></Field>
            <Field label="Phone"><input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input" /></Field>
            <Field label="CGPA"><input type="number" step="0.1" min="0" max="10" value={form.cgpa} onChange={(e) => update('cgpa', parseFloat(e.target.value))} className="form-input" /></Field>
            <Field label="Coding Score"><input type="number" min="0" max="100" value={form.codingScore} onChange={(e) => update('codingScore', parseInt(e.target.value))} className="form-input" /></Field>
            <Field label="Aptitude Score"><input type="number" min="0" max="100" value={form.aptitudeScore} onChange={(e) => update('aptitudeScore', parseInt(e.target.value))} className="form-input" /></Field>
            <Field label="Communication Score"><input type="number" min="0" max="100" value={form.communicationScore} onChange={(e) => update('communicationScore', parseInt(e.target.value))} className="form-input" /></Field>
            <Field label="Attendance %"><input type="number" min="0" max="100" value={form.attendance} onChange={(e) => update('attendance', parseInt(e.target.value))} className="form-input" /></Field>
            <Field label="Readiness %"><input type="number" min="0" max="100" value={form.readiness} onChange={(e) => update('readiness', parseInt(e.target.value))} className="form-input" /></Field>
            <Field label="Placement Status">
              <select value={form.placementStatus} onChange={(e) => update('placementStatus', e.target.value)} className="form-input">
                {['Placed','In Progress','Not Placed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Placed Company"><input value={form.placedCompany || ''} onChange={(e) => update('placedCompany', e.target.value)} className="form-input" /></Field>
            <Field label="Risk Level">
              <select value={form.riskLevel} onChange={(e) => update('riskLevel', e.target.value)} className="form-input">
                {['Low','Medium','High'].map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Assigned Mentor">
              <select value={form.assignedMentorId} onChange={(e) => update('assignedMentorId', e.target.value)} className="form-input">
                {mentors.map(m => <option key={m.id} value={m.id}>{m.name} ({m.type})</option>)}
              </select>
            </Field>
            <Field label="Homework Done"><input type="number" min="0" value={form.homeworkCompleted} onChange={(e) => update('homeworkCompleted', parseInt(e.target.value))} className="form-input" /></Field>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{student ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </div>
      <style>{`.form-input { width: 100%; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #0F172A; outline: none; transition: all 0.2s; } .form-input:focus { ring: 2px solid #6366F1; border-color: #6366F1; background: white; }`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
      {children}
    </div>
  );
}
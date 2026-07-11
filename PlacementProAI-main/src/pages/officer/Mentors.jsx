import { useState } from "react";
import { Plus, X, MessageSquare, Users, Edit2, Trash2, Eye } from "lucide-react";
import { mentors as initialMentors, students as initialStudents, mentorCommunicationLog as initialLog } from "../../mockData";
import { Button } from "../../components/Button";
import { BadgePill } from "../../components/BadgePill";

export function OfficerMentors() {
  const [mentors, setMentors] = useState(initialMentors);
  const [students, setStudents] = useState(initialStudents);
  const [commLog, setCommLog] = useState(initialLog);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(null);

  const getStudentsForMentor = (mentorId) => students.filter(s => s.assignedMentorId === mentorId);
  const getLogForMentor = (mentorId) => commLog.filter(l => l.mentorId === mentorId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const handleAddMentor = (newMentor) => {
    const id = `M${String(mentors.length + 1).padStart(3, '0')}`;
    setMentors(prev => [...prev, { ...newMentor, id, studentsCount: 0, avgScore: 0, pendingReviews: 0 }]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this mentor? Students will become unassigned.")) {
      setMentors(prev => prev.filter(m => m.id !== id));
      setStudents(prev => prev.map(s => s.assignedMentorId === id ? { ...s, assignedMentorId: '' } : s));
    }
  };

  const handleAssignStudents = (mentorId, studentIds) => {
    // Remove these students from other mentors first
    setStudents(prev => prev.map(s => {
      if (studentIds.includes(s.id)) return { ...s, assignedMentorId: mentorId };
      if (s.assignedMentorId === mentorId && !studentIds.includes(s.id)) return { ...s, assignedMentorId: '' };
      return s;
    }));
    // Update mentor's student count and avg score
    const updatedStudents = students.map(s => {
      if (studentIds.includes(s.id)) return { ...s, assignedMentorId: mentorId };
      if (s.assignedMentorId === mentorId && !studentIds.includes(s.id)) return { ...s, assignedMentorId: '' };
      return s;
    });
    const mentorStudents = updatedStudents.filter(s => s.assignedMentorId === mentorId);
    const avg = mentorStudents.length > 0 ? Math.round(mentorStudents.reduce((sum, s) => sum + s.readiness, 0) / mentorStudents.length) : 0;
    setMentors(prev => prev.map(m => m.id === mentorId ? { ...m, studentsCount: mentorStudents.length, avgScore: avg } : m));
    setShowAssignModal(null);
  };

  const handleSendMessage = (mentorId, message) => {
    const newEntry = {
      id: `CL${String(commLog.length + 1).padStart(3, '0')}`,
      mentorId,
      message,
      sentBy: 'Ms. Kavitha',
      timestamp: new Date().toISOString(),
    };
    setCommLog(prev => [newEntry, ...prev]);
    setShowMessageModal(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Mentors Management</h2>
            <p className="text-text-secondary text-sm mt-1">Manage mentors, assign students, and send instructions.</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}><Plus size={16} className="mr-2" /> Add Mentor</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => {
          const mentorStudents = getStudentsForMentor(mentor.id);
          const logs = getLogForMentor(mentor.id);
          return (
            <div key={mentor.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <h4 className="font-bold text-text-primary">{mentor.name}</h4>
                    <p className="text-xs text-text-muted">{mentor.empId} • {mentor.email}</p>
                  </div>
                </div>
                <BadgePill variant="primary">{mentor.type}</BadgePill>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-surface-alt rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-primary">{mentorStudents.length}</div>
                  <div className="text-xs text-text-muted">Students</div>
                </div>
                <div className="bg-surface-alt rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-text-primary">{mentor.avgScore}%</div>
                  <div className="text-xs text-text-muted">Avg Score</div>
                </div>
                <div className="bg-surface-alt rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-text-primary">{mentor.tasksAssigned}</div>
                  <div className="text-xs text-text-muted">Tasks</div>
                </div>
                <div className="bg-surface-alt rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-warning">{mentor.pendingReviews}</div>
                  <div className="text-xs text-text-muted">Pending</div>
                </div>
              </div>

              {logs.length > 0 && (
                <div className="mb-4 p-2 bg-primary-light/40 rounded-lg border border-primary/10">
                  <div className="text-xs font-medium text-primary mb-1">Latest Note</div>
                  <div className="text-xs text-text-secondary line-clamp-2">{logs[0].message}</div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedMentor(mentor)}><Eye size={14} className="mr-1" /> View</Button>
                <Button size="sm" variant="outline" onClick={() => setShowAssignModal(mentor)}><Users size={14} className="mr-1" /> Assign</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowMessageModal(mentor)}><MessageSquare size={14} className="mr-1" /> Message</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(mentor.id)} className="text-danger hover:text-danger"><Trash2 size={14} /></Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMentor(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-bold text-text-primary text-lg">{selectedMentor.name} — Assigned Students</h3>
              <button onClick={() => setSelectedMentor(null)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
            </div>
            <div className="p-6">
              {getStudentsForMentor(selectedMentor.id).length === 0 ? (
                <p className="text-center text-text-muted py-8">No students assigned yet.</p>
              ) : (
                <div className="space-y-2">
                  {getStudentsForMentor(selectedMentor.id).map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-surface-alt rounded-lg border border-border/50">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-text-primary text-sm">{s.name}</div>
                          <div className="text-xs text-text-muted">{s.rollNo} • {s.dept}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-text-muted">Readiness</div>
                          <div className="text-sm font-bold text-primary">{s.readiness}%</div>
                        </div>
                        <BadgePill variant={s.riskLevel === 'High' ? 'danger' : s.riskLevel === 'Medium' ? 'warning' : 'success'}>{s.riskLevel}</BadgePill>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Mentor Modal */}
      {showAddModal && <MentorFormModal onClose={() => setShowAddModal(false)} onSave={handleAddMentor} />}

      {/* Assign Students Modal */}
      {showAssignModal && (
        <AssignStudentsModal
          mentor={showAssignModal}
          students={students}
          onClose={() => setShowAssignModal(null)}
          onSave={(ids) => handleAssignStudents(showAssignModal.id, ids)}
        />
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <MessageMentorModal
          mentor={showMessageModal}
          log={getLogForMentor(showMessageModal.id)}
          onClose={() => setShowMessageModal(null)}
          onSend={(msg) => handleSendMessage(showMessageModal.id, msg)}
        />
      )}
    </div>
  );
}

function MentorFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', empId: '', type: 'Coding', email: '', phone: '', avatar: `https://i.pravatar.cc/150?u=${Date.now()}`, tasksAssigned: 0 });
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary">Add Mentor</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Name</label><input required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Employee ID</label><input required value={form.empId} onChange={(e) => update('empId', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Type</label>
            <select value={form.type} onChange={(e) => update('type', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm">
              {['Coding','Aptitude','Communication'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Email</label><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Phone</label><input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Mentor</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AssignStudentsModal({ mentor, students, onClose, onSave }) {
  const currentIds = students.filter(s => s.assignedMentorId === mentor.id).map(s => s.id);
  const [selected, setSelected] = useState(currentIds);
  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-bold text-text-primary">Assign Students to {mentor.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <div className="p-4 space-y-2">
          {students.map(s => (
            <label key={s.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selected.includes(s.id) ? 'bg-primary-light border-primary/30' : 'bg-surface-alt border-border/50 hover:border-primary/20'}`}>
              <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} className="w-4 h-4 accent-primary" />
              <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">{s.name}</div>
                <div className="text-xs text-text-muted">{s.rollNo} • {s.dept}</div>
              </div>
              <BadgePill variant={s.riskLevel === 'High' ? 'danger' : s.riskLevel === 'Medium' ? 'warning' : 'success'}>{s.riskLevel}</BadgePill>
            </label>
          ))}
        </div>
        <div className="sticky bottom-0 bg-surface border-t border-border p-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(selected)}>Save ({selected.length} selected)</Button>
        </div>
      </div>
    </div>
  );
}

function MessageMentorModal({ mentor, log, onClose, onSend }) {
  const [message, setMessage] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-bold text-text-primary">Message {mentor.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Send a note / instruction</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="e.g. Please follow up with Kiran M on attendance..."
              className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" disabled={!message.trim()} onClick={() => { onSend(message); setMessage(''); }}>Send Note</Button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Communication History</h4>
            {log.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-4">No messages sent yet.</p>
            ) : (
              <div className="space-y-2">
                {log.map(entry => (
                  <div key={entry.id} className="bg-surface-alt rounded-lg p-3 border-l-2 border-primary/40">
                    <div className="text-xs text-text-muted mb-1">{new Date(entry.timestamp).toLocaleString()} • by {entry.sentBy}</div>
                    <div className="text-sm text-text-secondary">{entry.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
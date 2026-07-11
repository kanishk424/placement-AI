import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { assistantStaff as initialStaff } from "../../mockData";
import { Button } from "../../components/Button";

export function OfficerStaff() {
  const [staff, setStaff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSave = (data) => {
    if (editItem) {
      setStaff(prev => prev.map(s => s.id === editItem.id ? { ...editItem, ...data } : s));
    } else {
      const id = `ST${String(staff.length + 1).padStart(3, '0')}`;
      setStaff(prev => [...prev, { id, ...data }]);
    }
    setShowModal(false);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this staff member?")) {
      setStaff(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Assistant Staff</h2>
            <p className="text-text-secondary text-sm mt-1">Manage coordinators, admins, and support staff.</p>
          </div>
          <Button onClick={() => { setEditItem(null); setShowModal(true); }}><Plus size={16} className="mr-2" /> Add Staff</Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-alt text-sm text-text-secondary">
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Role</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Contact</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-text-primary">{s.name}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{s.role}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{s.dept}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{s.contact}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{s.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditItem(s); setShowModal(true); }} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary hover:text-primary transition-colors"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary hover:text-danger transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr><td colSpan="6" className="py-8 text-center text-text-muted">No staff members added yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <StaffFormModal
          staff={editItem}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function StaffFormModal({ staff, onClose, onSave }) {
  const [form, setForm] = useState(staff || { name: '', role: 'Coordinator', dept: 'CSE', contact: '', email: '' });
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary">{staff ? 'Edit Staff' : 'Add Staff'}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Name</label><input required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Role</label>
            <select value={form.role} onChange={(e) => update('role', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm">
              {['Coordinator','Admin Assistant','Lab Incharge','Data Entry','Support Staff'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Department</label>
            <select value={form.dept} onChange={(e) => update('dept', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm">
              {['CSE','IT','ECE','MECH','General'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Contact</label><input value={form.contact} onChange={(e) => update('contact', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Email</label><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{staff ? 'Save Changes' : 'Add Staff'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
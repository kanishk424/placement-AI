import { useState } from "react";
import { Plus, Edit2, Trash2, X, Calendar, Code, BookOpen } from "lucide-react";
import { placementEvents as initialEvents } from "../../mockData";
import { Button } from "../../components/Button";
import { BadgePill } from "../../components/BadgePill";

const TABS = [
  { key: 'Drive', label: 'Placement Drives', icon: Calendar },
  { key: 'Hackathon', label: 'Hackathons', icon: Code },
  { key: 'Workshop', label: 'Workshops', icon: BookOpen },
];

export function OfficerEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [activeTab, setActiveTab] = useState('Drive');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = events.filter(e => e.type === activeTab);

  const handleSave = (data) => {
    if (editItem) {
      setEvents(prev => prev.map(e => e.id === editItem.id ? { ...editItem, ...data } : e));
    } else {
      const id = `PE${String(events.length + 1).padStart(3, '0')}`;
      setEvents(prev => [...prev, { id, type: activeTab, ...data }]);
    }
    setShowModal(false);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const statusVariant = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Ongoing') return 'warning';
    return 'primary';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Placement Events</h2>
            <p className="text-text-secondary text-sm mt-1">Manage drives, hackathons, and workshops.</p>
          </div>
          <Button onClick={() => { setEditItem(null); setShowModal(true); }}><Plus size={16} className="mr-2" /> Add Event</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface border border-border rounded-xl p-2 shadow-sm flex gap-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-surface-alt'}`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(event => (
          <div key={event.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-text-primary">{event.title}</h4>
                <p className="text-xs text-text-muted mt-1">{event.organizer}</p>
              </div>
              <BadgePill variant={statusVariant(event.status)}>{event.status}</BadgePill>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar size={14} className="text-text-muted" />
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="text-text-muted">👥</span>
                {event.participants} participants
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setEditItem(event); setShowModal(true); }}><Edit2 size={14} className="mr-1" /> Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(event.id)} className="text-danger hover:text-danger"><Trash2 size={14} /></Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-text-muted">No {activeTab.toLowerCase()}s yet. Add one to get started.</div>
        )}
      </div>

      {showModal && (
        <EventFormModal
          event={editItem}
          defaultType={activeTab}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function EventFormModal({ event, defaultType, onClose, onSave }) {
  const [form, setForm] = useState(event || {
    title: '', date: '', organizer: '', participants: 0, status: 'Upcoming', type: defaultType,
  });
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary">{event ? 'Edit Event' : `Add ${defaultType}`}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-alt text-text-secondary"><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Title</label><input required value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Date</label><input type="date" required value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Organizer / Company</label><input value={form.organizer} onChange={(e) => update('organizer', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Participants</label><input type="number" min="0" value={form.participants} onChange={(e) => update('participants', parseInt(e.target.value) || 0)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-medium text-text-secondary mb-1">Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2 text-sm">
              {['Upcoming','Ongoing','Completed'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{event ? 'Save Changes' : 'Add Event'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
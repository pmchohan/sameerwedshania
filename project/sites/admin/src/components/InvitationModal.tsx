import { useState, useEffect } from 'react';
import { Invitation, CreateInvitationInput } from '../types';
import { fetchUrduAssist } from '../api';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateInvitationInput, id?: number) => Promise<void>;
  editingInvitation?: Invitation | null;
}

const RANDOM_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

function generateRandomCode(): string {
  let res = '';
  for (let i = 0; i < 6; i++) {
    res += RANDOM_CHARS.charAt(Math.floor(Math.random() * RANDOM_CHARS.length));
  }
  return res;
}

export function InvitationModal({ isOpen, onClose, onSave, editingInvitation }: InvitationModalProps) {
  const [name, setName] = useState('');
  const [nameUr, setNameUr] = useState('');
  const [code, setCode] = useState('');
  const [events, setEvents] = useState<string[]>(['mehndi', 'barat', 'walima']);
  const [note, setNote] = useState('');
  const [noteUr, setNoteUr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [translatingField, setTranslatingField] = useState<string | null>(null);
  const [toastWarning, setToastWarning] = useState<string | null>(null);

  useEffect(() => {
    if (editingInvitation) {
      setName(editingInvitation.name || '');
      setNameUr(editingInvitation.nameUr || '');
      setCode(editingInvitation.code || '');
      setEvents(editingInvitation.events || ['mehndi', 'barat', 'walima']);
      setNote(editingInvitation.note || '');
      setNoteUr(editingInvitation.noteUr || '');
    } else {
      setName('');
      setNameUr('');
      setCode(generateRandomCode());
      setEvents(['mehndi', 'barat', 'walima']);
      setNote('');
      setNoteUr('');
    }
    setError('');
    setToastWarning(null);
  }, [editingInvitation, isOpen]);

  const handleAiFill = async (target: 'name' | 'note') => {
    setTranslatingField(target);
    setError('');
    try {
      const res = await fetchUrduAssist(
        target === 'name' ? name : note,
        target === 'name' ? nameUr : noteUr,
        target === 'name' ? 'guest_name' : 'guest_note',
      );
      if (target === 'name') setNameUr(res.text);
      if (target === 'note') setNoteUr(res.text);
      if (res.downgraded && res.warning) {
        setToastWarning(res.warning);
      }
    } catch (err: any) {
      setError(err.message || 'Groq AI translation failed');
    } finally {
      setTranslatingField(null);
    }
  };

  if (!isOpen) return null;

  const toggleEvent = (ev: string) => {
    if (events.includes(ev)) {
      if (events.length === 1) {
        setError('At least one event must be selected');
        return;
      }
      setEvents(events.filter((e) => e !== ev));
    } else {
      setEvents([...events, ev]);
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Guest Name is required');
      return;
    }
    if (events.length === 0) {
      setError('Please select at least one event');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onSave(
        {
          name: name.trim(),
          nameUr: nameUr.trim() || undefined,
          code: code.trim().toLowerCase() || undefined,
          events,
          note: note.trim() || undefined,
          noteUr: noteUr.trim() || undefined,
        },
        editingInvitation?.id,
      );
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingInvitation ? 'Edit Invitation' : 'Create New Invitation'}</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          {toastWarning && (
            <div className="alert-warning-banner">
              <span>⚠️ {toastWarning}</span>
              <button type="button" className="close-warning-btn" onClick={() => setToastWarning(null)}>✕</button>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="guest-name">Guest Name (English) *</label>
            <input
              id="guest-name"
              type="text"
              required
              placeholder="e.g. Ali Khan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="label-with-action">
              <label htmlFor="guest-name-ur">Guest Name (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingField === 'name'}
                onClick={() => handleAiFill('name')}
                title="Autofill with Groq (translates English or converts Roman Urdu)"
              >
                {translatingField === 'name' ? '⏳ Converting...' : '✨ Groq Autofill'}
              </button>
            </div>
            <input
              id="guest-name-ur"
              type="text"
              dir="rtl"
              placeholder="مثال: علی خان (or type Roman Urdu & click ✨)"
              value={nameUr}
              onChange={(e) => setNameUr(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="label-with-action">
              <label htmlFor="guest-code">Unique 6-Char Code</label>
              <button
                type="button"
                className="text-action-btn"
                onClick={() => setCode(generateRandomCode())}
              >
                ↻ Auto-Generate
              </button>
            </div>
            <input
              id="guest-code"
              type="text"
              placeholder="e.g. xzzium"
              value={code}
              onChange={(e) => setCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              maxLength={16}
            />
            <span className="form-hint">Links to: <code>.../sameerwedshania/{code || '<code>'}</code></span>
          </div>

          <div className="form-group">
            <label>Invited Events *</label>
            <div className="checkbox-row">
              {['mehndi', 'barat', 'walima'].map((ev) => (
                <label key={ev} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={events.includes(ev)}
                    onChange={() => toggleEvent(ev)}
                  />
                  <span>{ev.charAt(0).toUpperCase() + ev.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guest-note">Personalized Note (English)</label>
            <textarea
              id="guest-note"
              rows={2}
              placeholder="Optional personal message on their invitation..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="label-with-action">
              <label htmlFor="guest-note-ur">Personalized Note (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingField === 'note'}
                onClick={() => handleAiFill('note')}
                title="Autofill with Groq (translates English or converts Roman Urdu)"
              >
                {translatingField === 'note' ? '⏳ Converting...' : '✨ Groq Autofill'}
              </button>
            </div>
            <textarea
              id="guest-note-ur"
              rows={2}
              dir="rtl"
              placeholder="دعوت نامے پر ذاتی پیغام... (or type Roman Urdu & click ✨)"
              value={noteUr}
              onChange={(e) => setNoteUr(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingInvitation ? 'Update Invitation' : 'Create Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

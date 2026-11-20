import { useState } from 'react';
import { Invitation } from '../types';
import { getCardBaseUrl } from '../api';

interface InvitationCardProps {
  invitation: Invitation;
  onEdit: (invitation: Invitation) => void;
  onDelete: (id: number) => void;
}

export function InvitationCard({ invitation, onEdit, onDelete }: InvitationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = `${getCardBaseUrl()}/${invitation.code}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback prompt if clipboard API is restricted
      window.prompt('Copy invitation link:', fullUrl);
    }
  };

  const eventBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
    mehndi: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
    barat: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    walima: { bg: '#e0e7ff', text: '#3730a3', border: '#a5b4fc' },
  };

  return (
    <div className={`invitation-card ${expanded ? 'is-expanded' : ''}`}>
      {/* Top Row: Name, Code badge, Copy button, Expand trigger */}
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="card-primary-info">
          <h3 className="guest-title">
            {invitation.name}
            {invitation.nameUr && <span className="guest-title-ur">({invitation.nameUr})</span>}
          </h3>

          <div className="code-row">
            <span className="code-pill">
              <code>{invitation.code}</code>
            </span>

            <button
              type="button"
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copy Full Invitation URL"
              aria-label="Copy invitation link"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="card-meta">
          <div className="event-badges">
            {invitation.events.map((ev) => {
              const theme = eventBadgeColors[ev.toLowerCase()] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
              return (
                <span
                  key={ev}
                  className="badge"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.text,
                    borderColor: theme.border,
                  }}
                >
                  {ev.charAt(0).toUpperCase() + ev.slice(1)}
                </span>
              );
            })}
          </div>

          <button
            type="button"
            className="expand-btn"
            aria-expanded={expanded}
            aria-label="Toggle details"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {expanded && (
        <div className="card-details">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Invitation Link:</span>
              <a href={fullUrl} target="_blank" rel="noreferrer" className="preview-link">
                {fullUrl}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {invitation.note && (
              <div className="detail-item">
                <span className="detail-label">Personal Note:</span>
                <p className="detail-text">{invitation.note}</p>
              </div>
            )}

            {invitation.noteUr && (
              <div className="detail-item">
                <span className="detail-label">Note (Urdu):</span>
                <p className="detail-text urdu-text" dir="rtl">{invitation.noteUr}</p>
              </div>
            )}
          </div>

          <div className="card-actions">
            <button type="button" className="action-btn edit" onClick={() => onEdit(invitation)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              className="action-btn delete"
              onClick={() => {
                if (window.confirm(`Delete invitation for "${invitation.name}"?`)) {
                  onDelete(invitation.id);
                }
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

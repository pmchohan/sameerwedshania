import { useState } from 'react';
import { Invitation } from '../types';
import { getCardBaseUrl, getShareBaseUrl, getApiBase } from '../api';

interface InvitationCardProps {
  invitation: Invitation;
  onEdit: (invitation: Invitation) => void;
  onDelete: (id: number) => void;
}

export function InvitationCard({ invitation, onEdit, onDelete }: InvitationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const fullUrl = `${getCardBaseUrl()}/${invitation.code}`;
  const waShareEn = getShareBaseUrl(invitation.code, 'en');
  const waShareUr = getShareBaseUrl(invitation.code, 'ur');
  const ogPreviewUrl = `${getApiBase()}/og/${invitation.code}`;

  const copyToClipboard = async (text: string, type: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      window.prompt('Copy invitation link:', text);
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
              className={`copy-btn ${copiedType === 'header-share' ? 'copied' : ''}`}
              onClick={(e) => copyToClipboard(waShareEn, 'header-share', e)}
              title="Copy WhatsApp Share Link with Dynamic Kashi Preview"
              aria-label="Copy WhatsApp invitation link"
            >
              {copiedType === 'header-share' ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy WhatsApp Link</span>
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
            {/* Share Links Box */}
            <div className="share-links-box">
              <div className="share-link-row">
                <span className="share-link-tag">WhatsApp (EN):</span>
                <span className="share-link-text">{waShareEn}</span>
                <button
                  type="button"
                  className="mini-copy-btn"
                  onClick={() => copyToClipboard(waShareEn, 'wa-en')}
                >
                  {copiedType === 'wa-en' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="share-link-row">
                <span className="share-link-tag">WhatsApp (اردو):</span>
                <span className="share-link-text">{waShareUr}</span>
                <button
                  type="button"
                  className="mini-copy-btn"
                  onClick={() => copyToClipboard(waShareUr, 'wa-ur')}
                >
                  {copiedType === 'wa-ur' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="share-link-row">
                <span className="share-link-tag">Direct Card:</span>
                <a href={fullUrl} target="_blank" rel="noreferrer" className="preview-link">
                  {fullUrl}
                </a>
                <button
                  type="button"
                  className="mini-copy-btn"
                  onClick={() => copyToClipboard(fullUrl, 'direct')}
                >
                  {copiedType === 'direct' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="share-link-row">
                <span className="share-link-tag">OG Banner:</span>
                <a href={ogPreviewUrl} target="_blank" rel="noreferrer" className="preview-link">
                  🖼️ View 1200x630 WhatsApp Banner
                </a>
              </div>
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

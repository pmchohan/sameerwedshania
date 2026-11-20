import { useState, useEffect, useMemo } from 'react';
import { Invitation, CreateInvitationInput } from './types';
import { fetchInvitations, createInvitation, updateInvitation, deleteInvitation } from './api';
import { InvitationCard } from './components/InvitationCard';
import { InvitationModal } from './components/InvitationModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Invitation | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchInvitations(search, eventFilter === 'all' ? undefined : eventFilter);
      setInvitations(data);
    } catch (err: any) {
      setError(err.message || 'Could not connect to Wedding Backend API. Check your Cloudflare Tunnel URL in Settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSave = async (data: CreateInvitationInput, id?: number) => {
    if (id) {
      await updateInvitation(id, data);
    } else {
      await createInvitation(data);
    }
    await loadData();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInvitation(id);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete invitation');
    }
  };

  const stats = useMemo(() => {
    return {
      total: invitations.length,
      mehndi: invitations.filter((i) => i.events?.includes('mehndi')).length,
      barat: invitations.filter((i) => i.events?.includes('barat')).length,
      walima: invitations.filter((i) => i.events?.includes('walima')).length,
    };
  }, [invitations]);

  return (
    <div className="admin-app">
      {/* Top Header */}
      <header className="admin-header">
        <div className="header-container">
          <div className="brand">
            <span className="brand-badge">Wedding Admin</span>
            <h1>Sameer & Hania</h1>
            <p className="brand-sub">Invitations & Guest Access Management</p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="btn-icon-setting"
              onClick={() => setSettingsOpen(true)}
              title="API & URL Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>API Settings</span>
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setEditingItem(null);
                setModalOpen(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Invitation
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="admin-main">
        {/* Controls Bar: Search & Filter Tabs */}
        <section className="controls-bar">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by guest name or 6-char code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="clear-btn" onClick={() => setSearch('')}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-tabs">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'mehndi', label: 'Mehndi', count: stats.mehndi },
              { id: 'barat', label: 'Barat', count: stats.barat },
              { id: 'walima', label: 'Walima', count: stats.walima },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-tab ${eventFilter === tab.id ? 'active' : ''}`}
                onClick={() => setEventFilter(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="count-badge">{tab.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Status / Error Banner */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-content">
              <strong>Connection Error:</strong> {error}
            </div>
            <div className="alert-actions">
              <button type="button" className="btn-retry" onClick={loadData}>
                Retry
              </button>
              <button type="button" className="btn-setting-link" onClick={() => setSettingsOpen(true)}>
                Change API URL
              </button>
            </div>
          </div>
        )}

        {/* Invitations Grid */}
        <section className="invitations-grid">
          {loading && invitations.length === 0 ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading invitations from database...</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✉️</div>
              <h3>No invitations found</h3>
              <p>{search ? 'Try adjusting your search criteria.' : 'Click "Create Invitation" to add your first guest.'}</p>
              {!search && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setModalOpen(true);
                  }}
                >
                  Create First Invitation
                </button>
              )}
            </div>
          ) : (
            invitations.map((inv) => (
              <InvitationCard
                key={inv.id}
                invitation={inv}
                onEdit={(item) => {
                  setEditingItem(item);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>
      </main>

      {/* Add / Edit Modal */}
      <InvitationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingInvitation={editingItem}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onRefresh={loadData}
      />
    </div>
  );
}

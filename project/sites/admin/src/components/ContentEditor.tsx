import { useState, useEffect } from 'react';
import { WeddingSettings, WeddingEventDetails, ScheduleItem } from '../types';
import { fetchSettings, updateSettings, fetchUrduAssist } from '../api';

export function ContentEditor() {
  const [settings, setSettings] = useState<WeddingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [activeEventTab, setActiveEventTab] = useState<'mehndi' | 'barat' | 'walima'>('mehndi');
  const [translatingKey, setTranslatingKey] = useState<string | null>(null);
  const [toastWarning, setToastWarning] = useState<string | null>(null);

  const triggerUrduAssist = async (
    key: string,
    english: string,
    currentUrdu: string,
    onGenerated: (text: string) => void,
    context = 'general',
  ) => {
    setTranslatingKey(key);
    try {
      const res = await fetchUrduAssist(english, currentUrdu, context);
      onGenerated(res.text);
      if (res.downgraded && res.warning) {
        setToastWarning(res.warning);
      }
    } catch (err: any) {
      alert(err.message || 'Groq AI translation failed');
    } finally {
      setTranslatingKey(null);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await fetchSettings();
      setSettings(data);
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to load settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      setMessage({ text: 'All wedding details saved successfully to database!', type: 'success' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading wedding content from database...</p>
      </div>
    );
  }

  if (!settings) return null;

  const currentEvent = settings.events?.[activeEventTab] || {
    title: { en: '', ur: '' },
    date: '',
    time: '',
    venue: { name: '', address: '', mapUrl: '' },
    dressCode: '',
    schedule: [],
  };

  const updateCurrentEvent = (patch: Partial<WeddingEventDetails>) => {
    setSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        events: {
          ...prev.events,
          [activeEventTab]: {
            ...currentEvent,
            ...patch,
          },
        },
      };
    });
  };

  const addScheduleItem = () => {
    const nextList: ScheduleItem[] = [...(currentEvent.schedule || []), { time: '18:00', title: { en: '', ur: '' } }];
    updateCurrentEvent({ schedule: nextList });
  };

  const removeScheduleItem = (index: number) => {
    const nextList = (currentEvent.schedule || []).filter((_, i) => i !== index);
    updateCurrentEvent({ schedule: nextList });
  };

  const updateScheduleItem = (index: number, patch: Partial<ScheduleItem>) => {
    const nextList = (currentEvent.schedule || []).map((item, i) => {
      if (i !== index) return item;
      return { ...item, ...patch };
    });
    updateCurrentEvent({ schedule: nextList });
  };

  return (
    <form className="content-editor" onSubmit={handleSave}>
      <div className="editor-top-bar">
        <div>
          <h2>Wedding Content & Details</h2>
          <p className="section-desc">Manage couple names, events, dates, venues, schedules, and contact info.</p>
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving to Database...' : '💾 Save All Changes'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      {toastWarning && (
        <div className="alert-warning-banner">
          <span>⚠️ {toastWarning}</span>
          <button type="button" className="close-warning-btn" onClick={() => setToastWarning(null)}>✕</button>
        </div>
      )}

      {/* 1. COUPLE & FAMILY */}
      <section className="editor-section">
        <h3 className="section-title">
          <span className="section-num">1</span> Couple & Parents Details
        </h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Groom Name (English)</label>
            <input
              type="text"
              value={settings.couple?.groom?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  couple: {
                    ...settings.couple,
                    groom: { ...settings.couple?.groom, en: e.target.value, ur: settings.couple?.groom?.ur || '' },
                    bride: settings.couple?.bride || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>
          <div className="form-group">
            <div className="label-with-action">
              <label>Groom Name (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingKey === 'groom'}
                onClick={() =>
                  triggerUrduAssist(
                    'groom',
                    settings.couple?.groom?.en || '',
                    settings.couple?.groom?.ur || '',
                    (val) =>
                      setSettings((prev) =>
                        prev
                          ? {
                              ...prev,
                              couple: {
                                ...prev.couple,
                                groom: { ...prev.couple?.groom, ur: val, en: prev.couple?.groom?.en || '' },
                                bride: prev.couple?.bride || { en: '', ur: '' },
                              },
                            }
                          : prev,
                      ),
                    'groom_name',
                  )
                }
              >
                {translatingKey === 'groom' ? '⏳...' : '✨ Groq Autofill'}
              </button>
            </div>
            <input
              type="text"
              dir="rtl"
              value={settings.couple?.groom?.ur || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  couple: {
                    ...settings.couple,
                    groom: { ...settings.couple?.groom, ur: e.target.value, en: settings.couple?.groom?.en || '' },
                    bride: settings.couple?.bride || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Bride Name (English)</label>
            <input
              type="text"
              value={settings.couple?.bride?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  couple: {
                    ...settings.couple,
                    bride: { ...settings.couple?.bride, en: e.target.value, ur: settings.couple?.bride?.ur || '' },
                    groom: settings.couple?.groom || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>
          <div className="form-group">
            <div className="label-with-action">
              <label>Bride Name (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingKey === 'bride'}
                onClick={() =>
                  triggerUrduAssist(
                    'bride',
                    settings.couple?.bride?.en || '',
                    settings.couple?.bride?.ur || '',
                    (val) =>
                      setSettings((prev) =>
                        prev
                          ? {
                              ...prev,
                              couple: {
                                ...prev.couple,
                                bride: { ...prev.couple?.bride, ur: val, en: prev.couple?.bride?.en || '' },
                                groom: prev.couple?.groom || { en: '', ur: '' },
                              },
                            }
                          : prev,
                      ),
                    'bride_name',
                  )
                }
              >
                {translatingKey === 'bride' ? '⏳...' : '✨ Groq Autofill'}
              </button>
            </div>
            <input
              type="text"
              dir="rtl"
              value={settings.couple?.bride?.ur || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  couple: {
                    ...settings.couple,
                    bride: { ...settings.couple?.bride, ur: e.target.value, en: settings.couple?.bride?.en || '' },
                    groom: settings.couple?.groom || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Groom Parents (English)</label>
            <input
              type="text"
              value={settings.families?.groomParents?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  families: {
                    ...settings.families,
                    groomParents: {
                      ...settings.families?.groomParents,
                      en: e.target.value,
                      ur: settings.families?.groomParents?.ur || '',
                    },
                    brideParents: settings.families?.brideParents || { en: '', ur: '' },
                    line: settings.families?.line || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>
          <div className="form-group">
            <div className="label-with-action">
              <label>Groom Parents (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingKey === 'groomParents'}
                onClick={() =>
                  triggerUrduAssist(
                    'groomParents',
                    settings.families?.groomParents?.en || '',
                    settings.families?.groomParents?.ur || '',
                    (val) =>
                      setSettings((prev) =>
                        prev
                          ? {
                              ...prev,
                              families: {
                                ...prev.families,
                                groomParents: {
                                  ...prev.families?.groomParents,
                                  ur: val,
                                  en: prev.families?.groomParents?.en || '',
                                },
                                brideParents: prev.families?.brideParents || { en: '', ur: '' },
                                line: prev.families?.line || { en: '', ur: '' },
                              },
                            }
                          : prev,
                      ),
                    'parents',
                  )
                }
              >
                {translatingKey === 'groomParents' ? '⏳...' : '✨ Groq Autofill'}
              </button>
            </div>
            <input
              type="text"
              dir="rtl"
              value={settings.families?.groomParents?.ur || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  families: {
                    ...settings.families,
                    groomParents: {
                      ...settings.families?.groomParents,
                      ur: e.target.value,
                      en: settings.families?.groomParents?.en || '',
                    },
                    brideParents: settings.families?.brideParents || { en: '', ur: '' },
                    line: settings.families?.line || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Bride Parents (English)</label>
            <input
              type="text"
              value={settings.families?.brideParents?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  families: {
                    ...settings.families,
                    brideParents: {
                      ...settings.families?.brideParents,
                      en: e.target.value,
                      ur: settings.families?.brideParents?.ur || '',
                    },
                    groomParents: settings.families?.groomParents || { en: '', ur: '' },
                    line: settings.families?.line || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>
          <div className="form-group">
            <div className="label-with-action">
              <label>Bride Parents (Urdu)</label>
              <button
                type="button"
                className="ai-assist-btn"
                disabled={translatingKey === 'brideParents'}
                onClick={() =>
                  triggerUrduAssist(
                    'brideParents',
                    settings.families?.brideParents?.en || '',
                    settings.families?.brideParents?.ur || '',
                    (val) =>
                      setSettings((prev) =>
                        prev
                          ? {
                              ...prev,
                              families: {
                                ...prev.families,
                                brideParents: {
                                  ...prev.families?.brideParents,
                                  ur: val,
                                  en: prev.families?.brideParents?.en || '',
                                },
                                groomParents: prev.families?.groomParents || { en: '', ur: '' },
                                line: prev.families?.line || { en: '', ur: '' },
                              },
                            }
                          : prev,
                      ),
                    'parents',
                  )
                }
              >
                {translatingKey === 'brideParents' ? '⏳...' : '✨ Groq Autofill'}
              </button>
            </div>
            <input
              type="text"
              dir="rtl"
              value={settings.families?.brideParents?.ur || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  families: {
                    ...settings.families,
                    brideParents: {
                      ...settings.families?.brideParents,
                      ur: e.target.value,
                      en: settings.families?.brideParents?.en || '',
                    },
                    groomParents: settings.families?.groomParents || { en: '', ur: '' },
                    line: settings.families?.line || { en: '', ur: '' },
                  },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* 2. WEDDING EVENTS */}
      <section className="editor-section">
        <h3 className="section-title">
          <span className="section-num">2</span> Events (Mehndi, Barat, Walima)
        </h3>

        <div className="event-nav-tabs">
          {(['mehndi', 'barat', 'walima'] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={`event-nav-tab ${activeEventTab === key ? 'active' : ''}`}
              onClick={() => setActiveEventTab(key)}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="event-card-editor">
          <div className="form-grid">
            <div className="form-group">
              <label>Event Date (YYYY-MM-DD)</label>
              <input
                type="date"
                value={currentEvent.date || ''}
                onChange={(e) => updateCurrentEvent({ date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Event Time (HH:mm)</label>
              <input
                type="time"
                value={currentEvent.time || ''}
                onChange={(e) => updateCurrentEvent({ time: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Venue Name</label>
              <input
                type="text"
                value={currentEvent.venue?.name || ''}
                onChange={(e) =>
                  updateCurrentEvent({
                    venue: { ...currentEvent.venue, name: e.target.value },
                  })
                }
                placeholder="e.g. Mughal-e-Azam Banquet Complex"
              />
            </div>

            <div className="form-group">
              <label>Dress Code</label>
              <input
                type="text"
                value={currentEvent.dressCode || ''}
                onChange={(e) => updateCurrentEvent({ dressCode: e.target.value })}
                placeholder="e.g. Traditional Festive / Formal"
              />
            </div>

            <div className="form-group full-width">
              <label>Venue Address</label>
              <input
                type="text"
                value={currentEvent.venue?.address || ''}
                onChange={(e) =>
                  updateCurrentEvent({
                    venue: { ...currentEvent.venue, address: e.target.value },
                  })
                }
                placeholder="Full venue address"
              />
            </div>

            <div className="form-group full-width">
              <label>Google Maps Location Pin URL</label>
              <input
                type="url"
                value={currentEvent.venue?.mapUrl || ''}
                onChange={(e) =>
                  updateCurrentEvent({
                    venue: { ...currentEvent.venue, mapUrl: e.target.value },
                  })
                }
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>
          </div>

          {/* Program Schedule / Timeline */}
          <div className="schedule-editor-box">
            <div className="schedule-header-row">
              <h4>Program Timeline / Milestones</h4>
              <button type="button" className="btn-add-item" onClick={addScheduleItem}>
                + Add Milestone
              </button>
            </div>

            {(!currentEvent.schedule || currentEvent.schedule.length === 0) ? (
              <p className="no-items-text">No program milestones added yet. Click "+ Add Milestone" to add items.</p>
            ) : (
              <div className="schedule-items-list">
                {currentEvent.schedule.map((item, idx) => (
                  <div key={idx} className="schedule-item-row">
                    <input
                      type="time"
                      className="time-field"
                      value={item.time || ''}
                      onChange={(e) => updateScheduleItem(idx, { time: e.target.value })}
                    />
                    <input
                      type="text"
                      className="title-field"
                      placeholder="Title (English)"
                      value={item.title?.en || ''}
                      onChange={(e) =>
                        updateScheduleItem(idx, {
                          title: { en: e.target.value, ur: item.title?.ur || '' },
                        })
                      }
                    />
                    <div className="input-with-inline-action title-field">
                      <input
                        type="text"
                        dir="rtl"
                        className="urdu-field"
                        placeholder="عنوان (اردو) - or type Roman Urdu"
                        value={item.title?.ur || ''}
                        onChange={(e) =>
                          updateScheduleItem(idx, {
                            title: { ur: e.target.value, en: item.title?.en || '' },
                          })
                        }
                      />
                      <button
                        type="button"
                        className="inline-ai-btn"
                        disabled={translatingKey === `milestone-${idx}`}
                        onClick={() =>
                          triggerUrduAssist(
                            `milestone-${idx}`,
                            item.title?.en || '',
                            item.title?.ur || '',
                            (val) => updateScheduleItem(idx, { title: { ur: val, en: item.title?.en || '' } }),
                            'milestone',
                          )
                        }
                        title="Autofill with Groq"
                      >
                        {translatingKey === `milestone-${idx}` ? '⏳' : '✨'}
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn-remove-row"
                      onClick={() => removeScheduleItem(idx)}
                      title="Remove milestone"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CONTACT HOSTS */}
      <section className="editor-section">
        <div className="schedule-header-row">
          <h3 className="section-title">
            <span className="section-num">3</span> Contact Hosts & RSVP
          </h3>
          <button
            type="button"
            className="btn-add-item"
            onClick={() =>
              setSettings({
                ...settings,
                hosts: [
                  ...(settings.hosts || []),
                  {
                    name: { en: '', ur: '' },
                    role: { en: '', ur: '' },
                    phone: '',
                    whatsapp: '',
                  },
                ],
              })
            }
          >
            + Add Host
          </button>
        </div>

        <div className="hosts-editor-grid">
          {settings.hosts?.map((host, idx) => (
            <div key={idx} className="host-card-editor">
              <div className="host-card-top">
                <strong>Host #{idx + 1}</strong>
                <button
                  type="button"
                  className="btn-remove-row"
                  onClick={() =>
                    setSettings({
                      ...settings,
                      hosts: settings.hosts?.filter((_, i) => i !== idx),
                    })
                  }
                  title="Remove host"
                >
                  ✕
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Name (English)</label>
                  <input
                    type="text"
                    value={host.name?.en || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, name: { ...host.name, en: e.target.value } };
                      setSettings({ ...settings, hosts: next });
                    }}
                  />
                </div>
                <div className="form-group">
                  <div className="label-with-action">
                    <label>Name (Urdu)</label>
                    <button
                      type="button"
                      className="ai-assist-btn"
                      disabled={translatingKey === `host-name-${idx}`}
                      onClick={() =>
                        triggerUrduAssist(
                          `host-name-${idx}`,
                          host.name?.en || '',
                          host.name?.ur || '',
                          (val) => {
                            const next = [...(settings.hosts || [])];
                            next[idx] = { ...host, name: { ...host.name, ur: val } };
                            setSettings({ ...settings, hosts: next });
                          },
                          'host_name',
                        )
                      }
                      title="Autofill with Groq"
                    >
                      {translatingKey === `host-name-${idx}` ? '⏳...' : '✨ Groq'}
                    </button>
                  </div>
                  <input
                    type="text"
                    dir="rtl"
                    value={host.name?.ur || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, name: { ...host.name, ur: e.target.value } };
                      setSettings({ ...settings, hosts: next });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Role / Relation (English)</label>
                  <input
                    type="text"
                    value={host.role?.en || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, role: { ...host.role, en: e.target.value } };
                      setSettings({ ...settings, hosts: next });
                    }}
                    placeholder="e.g. Groom's Father"
                  />
                </div>
                <div className="form-group">
                  <div className="label-with-action">
                    <label>Role / Relation (Urdu)</label>
                    <button
                      type="button"
                      className="ai-assist-btn"
                      disabled={translatingKey === `host-role-${idx}`}
                      onClick={() =>
                        triggerUrduAssist(
                          `host-role-${idx}`,
                          host.role?.en || '',
                          host.role?.ur || '',
                          (val) => {
                            const next = [...(settings.hosts || [])];
                            next[idx] = { ...host, role: { ...host.role, ur: val } };
                            setSettings({ ...settings, hosts: next });
                          },
                          'host_role',
                        )
                      }
                      title="Autofill with Groq"
                    >
                      {translatingKey === `host-role-${idx}` ? '⏳...' : '✨ Groq'}
                    </button>
                  </div>
                  <input
                    type="text"
                    dir="rtl"
                    value={host.role?.ur || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, role: { ...host.role, ur: e.target.value } };
                      setSettings({ ...settings, hosts: next });
                    }}
                    placeholder="e.g. دولہے کے والد"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={host.phone || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, phone: e.target.value };
                      setSettings({ ...settings, hosts: next });
                    }}
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp Number (digits only, e.g. 923001234567)</label>
                  <input
                    type="text"
                    value={host.whatsapp || ''}
                    onChange={(e) => {
                      const next = [...(settings.hosts || [])];
                      next[idx] = { ...host, whatsapp: e.target.value.replace(/[^0-9]/g, '') };
                      setSettings({ ...settings, hosts: next });
                    }}
                    placeholder="923001234567"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="editor-bottom-bar">
        <button type="submit" className="btn-primary btn-large" disabled={saving}>
          {saving ? 'Saving to Database...' : '💾 Save All Changes'}
        </button>
      </div>
    </form>
  );
}

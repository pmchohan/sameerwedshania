import React, { useState } from 'react';
import { loginAdmin, getApiBase, setApiBase, resetApiBase, getDefaultApiBase } from '../api';

interface LoginModalProps {
  onSuccess: () => void;
}

export function LoginModal({ onSuccess }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showApiSettings, setShowApiSettings] = useState(false);
  const [customApiUrl, setCustomApiUrl] = useState(getApiBase());
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await loginAdmin(password.trim());
      onSuccess();
    } catch (err: any) {
      const msg = err.message || 'Incorrect password or connection failed.';
      if (msg.includes('NetworkError') || msg.includes('Failed to fetch') || msg.includes('CORS')) {
        setError(`Connection failed: Cannot reach backend API at ${getApiBase()}. If the Cloudflare tunnel restarted, update the API URL below.`);
        setShowApiSettings(true);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApi = () => {
    if (!customApiUrl.trim()) return;
    setApiBase(customApiUrl.trim());
    setApiNotice('✓ API URL updated successfully!');
    setTimeout(() => setApiNotice(null), 3000);
  };

  const handleResetApi = () => {
    resetApiBase();
    const def = getDefaultApiBase();
    setCustomApiUrl(def);
    setApiNotice(`✓ Reset to build default: ${def}`);
    setTimeout(() => setApiNotice(null), 3000);
  };

  return (
    <div className="login-backdrop">
      <div className="login-card">
        <div className="login-emblem">
          <span className="login-seal">💌</span>
        </div>

        <h1 className="login-title">Sameer & Hania</h1>
        <p className="login-subtitle">Wedding Invitations Admin Portal</p>

        {error && <div className="login-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="admin-pass">Master Passcode</label>
            <div className="password-input-wrap">
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                required
                autoFocus
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-visibility-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
            <p className="input-hint">Restricted access for wedding organizers only.</p>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading || !password.trim()}>
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </button>
        </form>

        <div className="login-api-section" style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setShowApiSettings(!showApiSettings)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.82rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {showApiSettings ? '▲ Hide API Connection Settings' : '⚙️ API Server Connection / Change Tunnel'}
          </button>

          {showApiSettings && (
            <div style={{ marginTop: '0.75rem', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                Backend API URL:
              </label>
              <input
                type="text"
                value={customApiUrl}
                onChange={(e) => setCustomApiUrl(e.target.value)}
                placeholder="https://...trycloudflare.com/api"
                style={{
                  width: '100%',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.8rem',
                  background: '#040d1a',
                  color: '#fff',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  boxSizing: 'border-box',
                }}
              />
              {apiNotice && (
                <div style={{ color: '#4ade80', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{apiNotice}</div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleSaveApi}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.75rem',
                    background: '#1ba6a6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Save API URL
                </button>
                <button
                  type="button"
                  onClick={handleResetApi}
                  style={{
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.75rem',
                    background: '#334155',
                    color: '#e2e8f0',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Reset Default
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

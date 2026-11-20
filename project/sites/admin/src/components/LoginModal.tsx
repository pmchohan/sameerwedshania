import React, { useState } from 'react';
import { loginAdmin } from '../api';

interface LoginModalProps {
  onSuccess: () => void;
}

export function LoginModal({ onSuccess }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await loginAdmin(password.trim());
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Incorrect password. Access denied.');
    } finally {
      setLoading(false);
    }
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
      </div>
    </div>
  );
}

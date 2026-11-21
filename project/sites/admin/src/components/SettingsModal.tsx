import { useState } from 'react';
import { getApiBase, setApiBase, getCardBaseUrl, setCardBaseUrl, getGroqApiKey, setGroqApiKey } from '../api';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function SettingsModal({ isOpen, onClose, onRefresh }: SettingsModalProps) {
  const [apiUrl, setApiUrlState] = useState(getApiBase());
  const [cardBaseUrl, setCardBaseUrlState] = useState(getCardBaseUrl());
  const [groqKey, setGroqKeyState] = useState(getGroqApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setApiBase(apiUrl);
    setCardBaseUrl(cardBaseUrl);
    setGroqApiKey(groqKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
      onRefresh();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Admin Settings & Connections</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-form">
          <div className="form-group">
            <label htmlFor="api-url">Backend API Endpoint (Cloudflare Tunnel URL)</label>
            <input
              id="api-url"
              type="text"
              required
              placeholder="e.g. https://xxxx-xxxx.trycloudflare.com/api"
              value={apiUrl}
              onChange={(e) => setApiUrlState(e.target.value)}
            />
            <span className="form-hint">
              Found on server in <code>/home/ubuntu/wedding-api/tunnel-url.txt</code>
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="card-base-url">Invitation Card Site URL (for Copy Link button)</label>
            <input
              id="card-base-url"
              type="text"
              required
              placeholder="https://pmchohan.github.io/sameerwedshania"
              value={cardBaseUrl}
              onChange={(e) => setCardBaseUrlState(e.target.value)}
            />
            <span className="form-hint">
              Copies as <code>{cardBaseUrl}/&lt;code&gt;</code>
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="groq-key">Groq API Key (for Urdu Autofill ✨)</label>
            <input
              id="groq-key"
              type="password"
              placeholder="gsk_..."
              value={groqKey}
              onChange={(e) => setGroqKeyState(e.target.value)}
            />
            <span className="form-hint">
              Powers automatic Urdu translation &amp; Roman Urdu phonetic conversion via Llama 3.3 70B (with Llama 3.1 8B fallback).
            </span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

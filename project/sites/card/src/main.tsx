import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/fonts.css';
import './theme/tokens.css';
import './theme/themes.css';
import './theme/global.css';
import { applyTheme } from './theme/theme';
import App from './App';

applyTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

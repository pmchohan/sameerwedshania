import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

export function useLang() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLang must be used inside LanguageProvider');
  return value;
}

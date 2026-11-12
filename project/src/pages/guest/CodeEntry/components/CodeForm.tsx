import { useId, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { guests } from '@/config/invitation.config';
import { findGuest } from '@/config/lookup';
import { useLang } from '@/i18n/useLang';
import s from './CodeForm.module.css';

/** Asks for the invitation code and sends the guest to their own page. */
export function CodeForm({ missed }: { missed: boolean }) {
  const { s: text } = useLang();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [miss, setMiss] = useState(missed);
  const inputId = useId();
  const errorId = useId();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const guest = findGuest(value, guests);
    if (guest) navigate(`/${guest.code}`);
    else setMiss(true);
  };

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <label className={s.label} htmlFor={inputId}>
        {text('codePrompt')}
      </label>
      <input
        id={inputId}
        className={s.input}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setMiss(false);
        }}
        lang="en"
        dir="ltr"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="go"
        aria-invalid={miss}
        aria-describedby={miss ? errorId : undefined}
      />
      <p id={errorId} className={s.error} role="alert" hidden={!miss}>
        {text('codeError')}
      </p>
      <Button type="submit">{text('codeSubmit')}</Button>
    </form>
  );
}

import { useLocation } from 'react-router-dom';
import { TileStrip } from '@/components/ornaments/TileStrip';
import { couple } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import { SiteLayout } from '@/layouts/SiteLayout/SiteLayout';
import { CodeForm } from './components/CodeForm';
import s from './CodeEntry.module.css';

/** `/`: asks for the invitation code. */
export default function CodeEntry() {
  const { t, s: text } = useLang();
  const missed = Boolean((useLocation().state as { miss?: boolean } | null)?.miss);

  return (
    <SiteLayout>
      <div className={s.page} data-light="night">
        <TileStrip />
        <div className={s.body}>
          <h1 className={s.names}>
            <span>{t(couple.groom)}</span>
            <span className={s.and}>{text('and')}</span>
            <span>{t(couple.bride)}</span>
          </h1>
          <CodeForm missed={missed} />
        </div>
        <TileStrip />
      </div>
    </SiteLayout>
  );
}

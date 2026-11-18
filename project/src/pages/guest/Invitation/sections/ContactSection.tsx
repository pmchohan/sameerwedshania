import { Reveal } from '@/components/motion/Reveal';
import { hosts } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import s from './ContactSection.module.css';

export function ContactSection() {
  const { t, s: text } = useLang();

  if (!hosts || hosts.length === 0) return null;

  return (
    <section className={s.contactSection} aria-label={text('getInTouch')}>
      <Reveal>
        <p className={s.eyebrow}>{text('getInTouch')}</p>
        <h2 className={s.heading}>{text('questionsTitle') || text('getInTouch')}</h2>
        <p className={s.subheading}>{text('getInTouchSub')}</p>

        <div className={s.contactsGrid}>
          {hosts.map((host, idx) => {
            const hostName = t(host.name);
            const waNumber = host.whatsapp || host.phone.replace(/\D/g, '');
            const initial = hostName.charAt(0);

            return (
              <div key={idx} className={s.contact}>
                <div className={s.avatar} aria-hidden="true">
                  {initial}
                </div>
                <h3 className={s.name}>{hostName}</h3>
                <p className={s.role}>{t(host.role)}</p>
                <p className={s.phone}>{host.phone}</p>

                <div className={s.actions}>
                  <a
                    href={`tel:${host.phone.replace(/\s+/g, '')}`}
                    className={`${s.actionBtn} ${s.callBtn}`}
                    aria-label={`${text('call')} ${hostName}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                  </a>

                  <a
                    href={`https://wa.me/${waNumber}`}
                    className={`${s.actionBtn} ${s.whatsappBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${text('whatsApp')} ${hostName}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

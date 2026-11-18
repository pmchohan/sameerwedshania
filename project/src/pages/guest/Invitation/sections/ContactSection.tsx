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
        <h2 className={s.heading}>{text('getInTouch')}</h2>
        <p className={s.subheading}>{text('getInTouchSub')}</p>

        <div className={s.cardsGrid}>
          {hosts.map((host, idx) => {
            const hostName = t(host.name);
            const waNumber = host.whatsapp || host.phone.replace(/\D/g, '');
            const initial = hostName.charAt(0);

            return (
              <div key={idx} className={s.card}>
                <div className={s.avatar} aria-hidden="true">
                  {initial}
                </div>
                <h3 className={s.name}>{hostName}</h3>
                <p className={s.role}>{t(host.role)}</p>
                <p className={s.phone}>{host.phone}</p>

                <div className={s.buttonRow}>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    className={`${s.contactBtn} ${s.whatsappBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${text('whatsApp')} ${hostName}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-1.107-.074-.27-.086-.62-.22-1.06-.412-1.865-.815-3.078-2.715-3.17-2.839-.094-.124-.76-1.013-.76-1.932 0-.92.48-1.37.652-1.558.172-.187.375-.234.5-.234.125 0 .25.002.359.007.115.006.269-.044.42.321.157.378.536 1.309.584 1.404.048.095.08.207.016.332-.064.125-.096.202-.191.314-.095.112-.2.25-.286.335-.096.096-.196.2-.084.392.112.193.498.823 1.069 1.332.735.655 1.354.858 1.547.953.192.096.305.08.418-.048.113-.128.483-.562.612-.754.128-.193.257-.16.434-.096.177.064 1.123.53 1.316.626.193.096.321.144.369.225.048.08.048.465-.096.87z" />
                    </svg>
                    <span>{text('whatsApp')}</span>
                  </a>

                  <a
                    href={`tel:${host.phone.replace(/\s+/g, '')}`}
                    className={s.contactBtn}
                    aria-label={`${text('call')} ${hostName}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{text('call')}</span>
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

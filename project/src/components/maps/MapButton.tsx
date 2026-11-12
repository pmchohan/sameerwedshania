import { Button } from '@/components/atoms/Button';
import { PinIcon } from '@/components/icons/PinIcon';
import { useLang } from '@/i18n/useLang';

/** One venue's map link: a gold button with the shared pin icon. */
export function MapButton({ href }: { href: string }) {
  const { s: text } = useLang();
  return (
    <Button href={href} icon={<PinIcon />}>
      {text('viewOnMap')}
    </Button>
  );
}

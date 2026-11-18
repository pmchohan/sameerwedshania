import type { Guest } from '@/config/types';
import { useTheme } from '@/theme/theme';
import type { Phase } from '../phase';
import { DarwazaHero } from './DarwazaHero';
import HeroSection from './HeroSection';
import { SehraHero } from './SehraHero';
import { StandardHero } from './StandardHero';

interface OpeningHeroProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
  onSkip?: () => void;
}

export default function OpeningHero(props: OpeningHeroProps) {
  const theme = useTheme();
  if (theme === 'darwaza') return <DarwazaHero {...props} />;
  if (theme === 'sehra') return <SehraHero {...props} />;
  if (theme === 'standard') return <StandardHero {...props} />;
  return <HeroSection {...props} />;
}

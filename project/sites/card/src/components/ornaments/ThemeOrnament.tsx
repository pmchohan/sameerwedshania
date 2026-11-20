import { useTheme } from '@/theme/theme';
import { CardRule } from './CardRule';
import { DarwazaOrnament } from './DarwazaOrnament';
import { JasmineVine } from './JasmineVine';
import { TileStrip } from './TileStrip';

export function ThemeOrnament() {
  const theme = useTheme();
  if (theme === 'sehra') return <JasmineVine />;
  if (theme === 'standard') return <CardRule />;
  if (theme === 'darwaza') return <DarwazaOrnament />;
  return <TileStrip />;
}

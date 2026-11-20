import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { WeddingContentProvider } from '@/config/WeddingContentContext';
import CodeEntry from '@/pages/guest/CodeEntry/CodeEntry';
import Invitation from '@/pages/guest/Invitation/Invitation';
import { routes } from '@/routes';

function DynamicInvitation() {
  const { code } = useParams<{ code: string }>();
  if (!code) return <CodeEntry missed />;
  return <Invitation code={code} />;
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <WeddingContentProvider>
          <Routes>
            <Route path="/" element={<CodeEntry />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.page === 'codeEntry' ? <CodeEntry /> : <Invitation code={route.code} />}
              />
            ))}
            <Route path="/:code" element={<DynamicInvitation />} />
            <Route path="*" element={<CodeEntry missed />} />
          </Routes>
        </WeddingContentProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

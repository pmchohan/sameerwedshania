import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import CodeEntry from '@/pages/guest/CodeEntry/CodeEntry';
import Invitation from '@/pages/guest/Invitation/Invitation';
import { routes } from '@/routes';

/** The only place route data becomes router objects. */
export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page === 'codeEntry' ? <CodeEntry /> : <Invitation code={route.code} />} />
          ))}
          <Route path="*" element={<CodeEntry missed />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

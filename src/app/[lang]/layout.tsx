'use client';
import LangContext from '@/components/LangContext';
import TopBarLayoutWrapper from '@/components/topbar/TopBarLayoutWrapper';
import theme from '@/components/topbar/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
            <LangContext.Provider value={lang}>
              <TopBarLayoutWrapper />
              <div>{children}</div>
            </LangContext.Provider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ThemeRegistry from '@/components/ThemeRegistry';
import TopBarLayoutWrapper from '@/components/topbar/TopBarLayoutWrapper';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Correct (no await)
  const messages = await getMessages();

  if (!messages) notFound();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeRegistry>
            <main>
              <TopBarLayoutWrapper />
              <div>{children}</div>
            </main>
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

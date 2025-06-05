import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ThemeRegistry from '@/components/ThemeRegistry';
import TopBarLayoutWrapper from '@/components/topbar/TopBarLayoutWrapper';
import { localesCodes } from '@/i18n/routing';

export async function generateStaticParams() {
  return localesCodes;
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string } >
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const messages = await getMessages();
  const { locale } = await params;

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

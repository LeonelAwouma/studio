import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});


export const metadata: Metadata = {
  title: 'Leonel AWOUMA - IT Systems Portfolio',
  description: 'I design, secure, and optimize IT systems with a focus on performance, reliability, and user empowerment.',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <html lang={lang} className={`${inter.variable} ${poppins.variable} dark`}>
      <body className={cn('font-body antialiased')}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

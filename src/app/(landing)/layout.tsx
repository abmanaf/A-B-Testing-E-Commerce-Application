import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '@/components/shared/navigation/NavBar';
import Footer from '@/components/shared/footer/Footer';
import { CartProvider } from '@/components/context/CartContext';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'ab testing with ecommerce',
//   description:
//     'This is an app for ab testing with ecommerce. Buy products and see how it works.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html
    //   lang="en"
    //   className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    // >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <CartProvider>
            <NavBar />
            {children}
            <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    // </html>
  );
}

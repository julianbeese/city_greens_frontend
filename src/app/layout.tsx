
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'Tomato Vision - Plant Health Analysis', // Updated Title
  description: 'Upload an image of your plant to check its health.', // Updated Description
=======
  title: 'Plant Vision - Plant Health Analysis',
  description: 'Upload an image of your plant to check its health.',
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}

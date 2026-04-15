'use client';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#e2e8f0',
            border: '1px solid #1e2d40',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#00d4ff', secondary: '#030712' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#030712' } },
        }}
      />
    </SessionProvider>
  );
}

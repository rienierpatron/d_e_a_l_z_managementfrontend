import Link from 'next/link';

export default function LoggedOutLayout({ children }) {
  return (
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
  );
}
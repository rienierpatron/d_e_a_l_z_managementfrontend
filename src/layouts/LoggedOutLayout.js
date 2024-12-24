import Link from 'next/link';

export default function LoggedOutLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}